<script setup lang="ts">
import { computed } from 'vue'
import { useWindowStore } from '@/stores/windows'
/** Components */
import WindowsApplication from '@/views/windows/components/WindowsApplication.vue'
import WindowsTaskBar from '@/views/windows/components/taskbar/TaskbarMain.vue'
import DesktopGeneral from './DesktopGeneral.vue'
import DesktopProjects from './DesktopProjects.vue'

const windowStore = useWindowStore()
const injectedStyles = computed(() => {
  return {
    '--desktop-background': windowStore.settings?.background || '008080',
    '--desktop-text-color': windowStore.settings?.color,
  }
})
</script>

<template>
  <main id="windows-desktop" :style="injectedStyles" :data-bg-image="windowStore.hasUrlBackground || null">
    <windows-task-bar />
    <section id="windows-desktop_container">
      <DesktopGeneral />
      <DesktopProjects />
    </section>
    <section v-if="windowStore.applications.length" id="windows-desktop_applications" ref="applications">
      <WindowsApplication v-for="(app, index) in windowStore.applications" :app :key="app.title + index" :title="app.title" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
#windows-desktop {
  @include DefaultPadding;
  overflow: hidden;
  position: relative;
  height: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-bottom: $TASKBAR_HEIGHT;

  [data-bg-image] {
    background: url(var(--desktop-background));
    background-size: cover;
  }

  &:not([data-bg-image]) {
    background-color: var(--desktop-background);
  }

  &_container {
    gap: 4px;
    display: flex;
    flex-wrap: wrap;
    color: var(--desktop-text-color);
  }
}
</style>
