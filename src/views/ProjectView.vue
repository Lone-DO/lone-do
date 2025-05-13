<script lang='ts' setup>

import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { p as zConfig } from '@zzz/config.js'

const route = useRoute()
const router = useRouter()
function setProject(name: string) {
  if (name) router.push({ name: 'project', params: { projectId: name } })
  else router.push({ name: 'projects' })
}

const projects = ref([
  { name: 'zzz', url: zConfig.baseUrl, component: null }
])
const projectId = computed(() => Array.isArray(route?.params?.projectId) ? route.params.projectId[0] : String(route?.params?.projectId))
const project = computed(() => projects.value.find((item) => item.name === projectId.value))

</script>

<template>
  <Suspense>
    <section id='projects'>
      <template v-if="project">
        <project-zzz v-if="projectId" />
        <component v-else-if="project?.component" :is="project.component" :path="route.path" />
      </template>
      <ul v-else>
        <article>
          <button @click="setProject('zzz')">Demo ZZZ</button>
        </article>
      </ul>
    </section>
  </Suspense>
</template>
