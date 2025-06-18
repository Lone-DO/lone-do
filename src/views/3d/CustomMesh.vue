<script lang="ts">
import { extend, useTresContext } from '@tresjs/core';
import { FlakesTexture } from 'three/examples/jsm/Addons.js';
extend({ FlakesTexture })
</script>

<template>
  <TresMesh>
    <TresTorusGeometry :args='[1, .5, 16, 32]' />
    <TresMeshLambertMaterial color='#468585' emissive='#460505' />
    <FlakesTexture />
  </TresMesh>
</template>
