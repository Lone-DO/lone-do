<script lang="ts" setup>
import { ref } from 'vue'
import { useWindowStore, type iApplication } from '@/stores/windows'

const windowStore = useWindowStore()
const isActive = ref(false)
const props = defineProps({
  app: { type: [Object], required: true },
})

function toggleApp() {
  isActive.value = !isActive.value
  if (props.app.type !== 'menu') {
    windowStore.updateApplication({ ...(props.app as iApplication), active: isActive.value })
  }
}
</script>

<template>
  <li class="taskbar-item" @click="toggleApp" tabindex="0" :data-active="isActive ? true : null">
    <img :src="app.logo" :alt="app.title + 'logo'" />
    <span>{{ app.title }}</span>
  </li>
</template>

<style lang="scss" scoped>
.taskbar-item {
  @include FlexBox;
  @include WindowTaskBoxShadow;

  &:active,
  &[data-active] {
    @include WindowTaskActiveBoxShadow;
    span {
      border-radius: 4px 0px;
      border: 1px black dotted;
    }
  }
  & > * {
    @include DisableUserEvents;
  }

  img {
    width: 1rem;
    max-height: 1rem;
    aspect-ratio: auto;
  }
  span {
    min-width: 1rem;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
