<script setup lang="ts">
import { useWindowStore, type iApplication } from '@/stores/windows/index'
import DesktopItem from './DesktopItem.vue'
import { onErrorCaptured, onMounted, ref, watch } from 'vue'
import { useProjectStore, type iProject } from '@/stores/projects'
const windowStore = useWindowStore()
const projectStore = useProjectStore()
await projectStore.init()
const projects = ref(<iApplication[]>[])

onErrorCaptured((err, vm) => {
  console.error(err, vm)
})

watch(
  () => projectStore.projects.value,
  (data) => {
    projects.value = data.reduce(
      (set, project) => {
        return set.concat({
          logo: project.config.logo,
          title: project.config.name,
          component: project.component,
          elementName: project.config.elementName,
        })
      },
      <iApplication[]>[],
    )
  },
  { immediate: true },
)
</script>

<template>
  <Suspense>
    <DesktopItem
      v-for="(app, index) in projects"
      :key="app.title + index"
      v-bind="app"
      @dblclick.stop="windowStore.updateApplication(app)"
      @keydown.enter.stop="windowStore.updateApplication(app)"
    />
  </Suspense>
</template>
