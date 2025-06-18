<script lang='ts' setup>
import { TresCanvas } from '@tresjs/core'
import OrbitalControls from './OrbitalControls.vue';
import CustomMesh from './CustomMesh.vue'
</script>

<template>
  <TresCanvas id='three-d'>
    <!-- Setup -->
    <TresPerspectiveCamera :args='[75, 1, 0.1, 1000]' :position='[3, 3, 3]' :look-at='[0, 0, 0]' />
    <TresDirectionalLight :args='[0x006769, 100]' :position='[1, 1, 1]' />
    <OrbitalControls />
    <!-- Objects -->
    <CustomMesh />
  </TresCanvas>
</template>
