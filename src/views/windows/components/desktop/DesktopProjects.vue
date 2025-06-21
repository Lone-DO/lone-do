<script setup lang="ts">
import { useWindowStore, type iApplication } from '@/stores/windows'
import DesktopItem from './DesktopItem.vue'
const windowStore = useWindowStore()

const projects = <iApplication[]>[]

await Promise.resolve(import('@zzz/main.js'))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .then(({ default: zzz }: any) => {
    projects.push({
      logo: zzz.config.logo,
      title: zzz.config.name,
      component: zzz.component,
      elementName: zzz.elementName,
    })
    return zzz
  })
  .catch((err) => console.error(err))
</script>

<template>
  <DesktopItem
    v-for="(app, index) in projects"
    :key="app.title + index"
    v-bind="app"
    @dblclick.stop="windowStore.updateApplication(app)"
    @keydown.enter.stop="windowStore.updateApplication(app)"
  />
</template>
