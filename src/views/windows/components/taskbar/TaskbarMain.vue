<script lang="ts" setup>
import { useWindowStore } from '@/stores/windows'
import StartMenu from './TaskbarStartMenu.vue'
import StatusBar from './TaskbarTray.vue'
import TaskbarItem from './TaskbarItem.vue'

const windowStore = useWindowStore()
</script>

<template>
  <nav id="windows-taskbar">
    <StartMenu />
    <ul id="windows-taskbar_container">
      <TaskbarItem v-for="(app, index) in windowStore.applications" :app :key="app.title + index" :title="app.title" />
    </ul>
    <StatusBar />
  </nav>
</template>

<style lang="scss" scoped>
#windows-taskbar {
  @include DefaultPadding;
  @include FlexBox(4px, stretch);
  @include WindowsTaskbarBoxShadow;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: $TASKBAR_HEIGHT;
  overflow: hidden;
  position: absolute;
  background-color: $windowsClassicBG;

  &_container {
    flex: 1;
    gap: 4px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
    list-style-type: none;
    justify-content: flex-start;
  }
}
</style>
