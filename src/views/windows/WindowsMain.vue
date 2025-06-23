<script lang="ts" setup>
import WindowsLogin from '@/views/windows/components/apps/AppLogin.vue'
import WindowsDesktop from '@/views/windows/components/desktop/DesktopMain.vue'
import { useWindowStore } from '@/stores/windows'
import { computed } from 'vue'

const windowStore = useWindowStore()
const style = computed(() => ({
  ...windowStore.styles,
  '--windows-background-color': '#008080',
}))
</script>

<template>
  <Suspense>
    <project-windows :style id="windows">
      <WindowsLogin v-if="!windowStore.isLoggedIn" />
      <WindowsDesktop v-else />
    </project-windows>
  </Suspense>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: 'Web IBM Bios';
  src: url('/fonts/Web437_IBM_BIOS.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
#windows {
  min-height: inherit;
  background-color: $windowsClassicBGPrimary;

  font-family: 'Web IBM Bios';
}
</style>
