<script lang='ts' setup>
import { computed, defineProps, ref } from 'vue';
import WindowsAction from './components/WindowsAction.vue'
const props = defineProps({
  title: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
})

const isClosed = ref(false)
const isDisabled = computed(() => props.disabled || props.required)

function closeWindow() {
  if (!isDisabled.value) isClosed.value = true
}
</script>

<template>
  <section v-if='!isClosed' class='windows-application' :disabled>
    <header class='windows-application_header'>
      <h6 class='windows-application_title'>
        <slot name='title'>{{ title }}</slot>
      </h6>
      <aside>
        <slot name='actions'></slot>
        <WindowsAction :disabled='isDisabled' @click='closeWindow'>X</WindowsAction>
      </aside>
    </header>
    <main class='windows-application_container'>
      <aside v-if='$slots.prefix' class='windows-application_prefix'>
        <slot name='prefix' />
      </aside>
      <slot />
      <aside v-if='$slots.affix' class='windows-application_affix'>
        <slot name='affix' />
      </aside>
    </main>
  </section>
</template>

<style lang="scss" scoped>
.windows-application {
  @include WindowBoxShadow;
  @include WindowAbsoluteCentered;
  overflow: hidden;
  background-color: $windowsClassicBG;

  @include Tablet {
    min-width: 300px;
  }

  header {
    color: #fff;
    background-color: darkblue;
    margin-bottom: 1rem;
    padding: 2px;

    @include FlexBox {
      justify-content: space-between;
    }

    aside {
      font-size: 1rem;

      @include FlexBox(4px, flex-start);
    }
  }

  &_prefix,
  &_affix {
    display: flex;
    justify-content: center;
    min-width: 100px;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
}
</style>