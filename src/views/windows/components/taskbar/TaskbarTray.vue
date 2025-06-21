<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import TaskbarStatusItem from './TaskbarTrayItem.vue'
/** Stores */
import { useWindowStore } from '@/stores/windows'
const windowStore = useWindowStore()
/** TODO: Use Windows Setting - Date Format */
const now = ref(new Date())
const prettyDate = computed(() => (now.value ? now.value?.toLocaleTimeString() : null))
/** Timer */
let timeout: NodeJS.Timeout | number = 0
const syncTime = () => (now.value = new Date())
onMounted(() => (timeout = setInterval(syncTime, 1000)))
onUnmounted(() => clearInterval(timeout))
</script>

<template>
  <div id="windows-tray">
    <TaskbarStatusItem v-for="(app, index) in windowStore.minified" :key="app.title + index + 'status'" :app />
    <span id="windows-status-bar_clock">{{ prettyDate }}</span>
  </div>
</template>

<style lang="scss" scoped>
#windows-tray {
  @include FlexBox;
  @include WindowTrayBoxShadow;
  padding: 8px 16px;
  font-size: 0.75rem;
  justify-self: flex-end;
  min-width: 100px;
}
</style>
