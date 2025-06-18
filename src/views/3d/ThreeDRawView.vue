<script setup lang="ts">
import { useTemplateRef, onMounted, ref, computed, onUnmounted, watch } from 'vue'
const fov = ref(75)
const width = ref(0)
const height = ref(0)
const canvas = useTemplateRef('canvas')
const aspect = computed<number>(() => width.value / height.value || 0)

/** Three.js */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
/** Configure Scene */
const scene = new THREE.Scene()
scene.background = new THREE.Color('#181818')
/** Configure Objects */
const boxSize = 2
const boxGeometry = new THREE.BoxGeometry(boxSize, .25, boxSize)
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#777777', emissive: '777777' })
const cube = new THREE.Mesh(boxGeometry, boxMaterial)
cube.position.y = -2
scene.add(cube)

const dodecahedronGeometry = new THREE.DodecahedronGeometry()
const dodecahedronMaterial = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' })
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial)
scene.add(dodecahedron)
/** Configure Lighting */
// const light = new THREE.DirectionalLight(0x9CDBA6, 10)
const light = new THREE.SpotLight(0x006769, 100)
light.position.set(1, 1, 1)
scene.add(light)
/** Configure Camera */
const camera = new THREE.PerspectiveCamera(fov.value, 1, 0.1, 1000)
camera.position.z = 5
watch(
  () => aspect.value,
  (value) => {
    /** Sync Camera Aspect Ration on Window Resize */
    camera.aspect = value
    camera.updateProjectionMatrix()
  },
)
/** Configure Renderer */
const renderer = new THREE.WebGLRenderer()
renderer.setAnimationLoop(animate)

/** Configure Controls */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = .05
controls.enableZoom = true
controls.enablePan = true

function animate() {
  cube.rotation.y += 0.005
  dodecahedron.rotation.x += 0.01
  dodecahedron.rotation.y += 0.01
  /** Sync Orbital Controls */
  controls.update()
  /** Sync Rendering */
  renderer.render(scene, camera)
}

function init() {
  /** Initialize AspectRation */
  updateAspectRatio()
  /** Append Three.js Canvas to component */
  canvas?.value?.appendChild(renderer.domElement)
  /** Initialize Animations */
  renderer.setAnimationLoop(animate)
}

function updateAspectRatio() {
  width.value = canvas?.value?.clientWidth || 0
  height.value = canvas?.value?.clientHeight || 0
  renderer.setSize(width.value, height.value)
  /** Sync Responsive Device Pixel Ration for Performance */
  renderer.setPixelRatio(window.devicePixelRatio)
}

onMounted(() => {
  /** TODO: Set Debounce for performance */
  window.addEventListener('resize', updateAspectRatio)
  init()
})
onUnmounted(() => window.removeEventListener('resize', updateAspectRatio))
</script>

<template>
  <article ref="canvas" />
</template>

<style lang="scss" scoped>
article {
  width: 100%;
  height: 100%;
}
</style>
