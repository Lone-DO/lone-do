<script setup lang="ts">
import { ref } from 'vue'
/** Stores */
import { useWindowStore } from '@/stores/windows'
const windowStore = useWindowStore()
/** Components */
import TaskbarItem from './TaskbarItem.vue'

const isActive = ref(false)
const toggleMenu = () => (isActive.value = !isActive.value)
</script>

<template>
  <TaskbarItem id="windows-start-menu" @click.stop="toggleMenu" :app="{ title: 'Start', logo: windowStore.settings.logo, type: 'menu' }" />
</template>

<style lang="scss" scoped>
#windows-start-menu {
  @include FlexBox(4px);
  font-size: 0.75rem;
  width: 100px;
}
</style>
