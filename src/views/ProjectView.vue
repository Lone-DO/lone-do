<script lang='ts' setup>

import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
function setProject(name: string) {
  if (name) router.push({ name: 'project', params: { projectId: name } })
  else router.push({ name: 'projects' })
}

import ThreeD from './ThreeView.vue'
import zzz from '@zzz/main.js'
const { config: zConfig } = zzz;

const projects = ref([
  { name: 'zzz', url: zConfig.baseUrl, component: null },
  { name: '3d', url: '/three', component: ThreeD }
])
const projectId = computed(() => Array.isArray(route?.params?.projectId) ? route.params.projectId[0] : String(route?.params?.projectId))
const project = computed(() => projects.value.find((item) => item.name === projectId.value))

</script>

<template>
  <Suspense>
    <section id='projects'>
      <template v-if="project">
        <project-zzz v-if="String(projectId).toLowerCase() === 'zzz'" />
        <component v-else-if="project?.component" :is="{ ...project.component }" :path="route.path" />
      </template>
      <ul v-else>
        <li>
          <article>
            <button @click="setProject('zzz')">Demo ZZZ</button>
          </article>
        </li>
        <li>
          <article>
            <button @click="setProject('3d')">Demo Three.js</button>
          </article>
        </li>
      </ul>
    </section>
  </Suspense>
</template>

<style lang="scss" scoped>
#projects {
  height: 100%;
  width: 100%;
}
</style>
