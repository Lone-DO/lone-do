<script lang='ts' setup>
import { defineProps, computed } from 'vue';
import WindowsButton from './WindowsButton.vue';
import { getParsedCommandLineOfConfigFile } from 'typescript';

const props = defineProps({
  tooltip: { type: String, default: null },
  styles: { type: Object, default: null }
})

const styles = computed(() => ({ ...props.styles, size: '.75rem', minWidth: 'unset', padding: '4px' }))
</script>

<template>
  <WindowsButton :title='tooltip' :styles>
    <slot />
  </WindowsButton>
</template>
