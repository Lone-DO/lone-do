<script lang='ts' setup>
import WindowsLogin from './WindowsLogin.vue';
import WindowsDesktop from './WindowsDesktop.vue';
import { useWindowStore } from '@/stores/windows';

const windowStore = useWindowStore()
const style = { '--windows-background-color': '#008080' }
</script>

<template>
  <Suspense>
    <project-windows :style id='windows'>
      <WindowsLogin v-if="!windowStore.isLoggedIn" />
      <WindowsDesktop v-else />
    </project-windows>
  </Suspense>
</template>

<style lang='scss' scoped>
#windows {
  min-height: inherit;
  background-color: $windowsClassicBGPrimary;

  @font-face {
    font-family: 'Web IBM Bios';
    src: url('/fonts/Web437_IBM_BIOS.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'Web IBM Bios';

}
</style>