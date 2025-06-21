<script lang="ts" setup>
defineProps({
  logo: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <article class="desktop-item" @click.stop @dblclick.stop="$emit('click')" tabindex="0">
    <img :src="logo" :alt="title + 'logo'" />
    <span>{{ title }}</span>
  </article>
</template>

<style lang="scss" scoped>
.desktop-item {
  gap: 1rem;
  width: 100px;
  min-height: 80px;
  display: flex;
  // overflow: hidden;
  align-items: center;
  flex-direction: column;

  &:not([disabled]) {
    cursor: pointer;

    &:hover {
      outline: black 1px solid;
    }
  }

  &[disabled] {
    cursor: not-allowed;
  }

  &:focus {
    outline: 1px solid black;
  }

  & > * {
    @include DisableUserEvents;
  }

  img {
    max-height: 3rem;
    aspect-ratio: auto;
  }

  span {
    font-size: 0.5rem;
  }
}
</style>
