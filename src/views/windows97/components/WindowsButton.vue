<script lang='ts' setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  styles: { type: Object, default: null }
})

const injectedStyles = computed(() => ({
  '--button-font-size': props.styles?.size || '1rem',
  '--button-cursor': props.styles?.cursor || 'pointer',
  '--button-min-width': props.styles?.minWidth || '100px',
  '--button-padding': props.styles?.padding || '4px 8px',
}))
</script>
<template>
  <button class='windows-button' :style='injectedStyles'>
    <span>
      <slot>Click</slot>
    </span>
  </button>
</template>

<style lang='scss' scoped>
.windows-button {
  @include FlexBox;
  @include WindowButtonBoxShadow;
  min-width: var(--button-min-width);
  font-size: var(--button-font-size);
  padding: var(--button-padding);

  transition: transform 100ms ease-in-out;

  &:not([disabled]) {
    cursor: var(--button-cursor);
    background-color: $windowsClassicBG;

    &:hover {
      transform: scale(1.05);
      outline: none;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: $windowsClassicBGSecondary;
  }

  span {
    margin: auto;
    line-height: 100%;
  }
}
</style>