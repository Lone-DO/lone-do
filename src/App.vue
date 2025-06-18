<script setup lang="ts">
import Windows97 from './views/windows97/WindowsMain.vue';
</script>

<template>
  <!-- IF 2D OR INSUFFICIENT DEVICE, RENDER WINDOWS CLASSIC IN FULL VIEW -->
  <Windows97 />
  <!-- IF 3D, RENDER THREE.JS ENVIRONMENT -->
</template>
