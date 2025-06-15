<script setup lang='ts'>
import { useTemplateRef, onMounted, ref, computed, onUnmounted, watch } from 'vue'
const fov = ref(75)
const width = ref(0)
const height = ref(0)
const canvas = useTemplateRef('canvas')
const aspect = computed<number>(() => width.value / height.value)

/** Three.js */
import * as THREE from 'three'
/** Configure Scene */
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
/** Configure Camera */
const camera = new THREE.PerspectiveCamera(fov.value, 1, 0.1, 1000);
camera.position.z = 5;
watch(() => aspect.value, (value) => {
  /** Sync Camera Aspect Ration on Window Resize */
  camera.aspect = value
  camera.updateProjectionMatrix();
})
/** Configure Camera */
const renderer = new THREE.WebGLRenderer();
renderer.setAnimationLoop(animate);
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function init() {
  updateAspectRatio();
  canvas?.value?.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);
}

function updateAspectRatio() {
  width.value = canvas?.value?.clientWidth || 0
  height.value = canvas?.value?.clientHeight || 0
  renderer.setSize(width.value, height.value)
}

onMounted(() => {
  /** TODO: Set Debounce for performance */
  window.addEventListener("resize", updateAspectRatio)
  init()
})
onUnmounted(() => window.removeEventListener("resize", updateAspectRatio))
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
