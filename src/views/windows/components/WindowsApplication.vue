<script lang="ts" setup>
import { computed, defineProps, ref, watch, useTemplateRef, onMounted } from 'vue'
/** Stores */
import { useWindowStore, type iApplication } from '@/stores/windows'
const windowStore = useWindowStore()
/** Components */
import WindowsAction from '@/views/windows/components/WindowsActionButton.vue'

const props = defineProps({
  title: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  callback: { type: Function, default: null },
  app: { type: Object, default: null },
})

const isClosed = ref(false)
const isDisabled = computed(() => props.disabled || props.required)
const component = computed(() => props.app?.elementName || props.app?.component)

function closeWindow() {
  if (!isDisabled.value) {
    if (props.callback) props.callback()
    else windowStore.updateApplication(props.app as iApplication, true)
    window.location.href = '#/'
    isClosed.value = true
  }
}

const isMinified = ref(false)
const setMini = () => (bool: boolean) => (isMinified.value = bool || false)
const isFullscreen = ref(false)
const setFullscreen = (bool: boolean) => (isFullscreen.value = bool || false)

/** Dynamic Max Height */
const paddingOffset = 6
const maxHeight = ref('')
const prevHeight = ref('')
const header = useTemplateRef('header')
// const selfElement = useTemplateRef('self')
const headerHeight = ref(header?.value?.clientHeight || 0)
const style = computed(() => ({ '--max-height--window': maxHeight.value }))
const childProps = computed(() => ({ styles: { maxHeight: style.value['--max-height--window'] } }))
const setHeight = () => {
  headerHeight.value = header?.value?.clientHeight || 0
  maxHeight.value = windowStore.getAvailableWindowHeight(headerHeight.value + paddingOffset)
}
onMounted(setHeight)
watch(() => windowStore.height, setHeight)
watch(
  () => isFullscreen.value,
  (bool) => {
    if (bool) {
      prevHeight.value = maxHeight.value
      setHeight()
    } else {
      /** TODO: Use User Manual Sizing as priority during restore */
      maxHeight.value = prevHeight.value
    }
  },
)

/** TODO: Lock in Height when window is NOT in fullscreen, currently is fully responsive */
</script>

<template>
  <section
    ref="self"
    v-if="!isClosed"
    :style
    draggable
    class="windows-application"
    tabindex="-1"
    :disabled="disabled || null"
    :data-fullscreen="isFullscreen || null"
  >
    <header class="windows-application_header" ref="header">
      <h6 class="windows-application_title">
        <slot name="title">{{ title }}</slot>
      </h6>
      <aside>
        <slot name="actions"></slot>
        <WindowsAction :disabled="isDisabled" @click="setMini">M</WindowsAction>
        <WindowsAction v-if="isFullscreen" :disabled="isDisabled" @click="setFullscreen(false)">R</WindowsAction>
        <WindowsAction v-else :disabled="isDisabled" @click="setFullscreen(true)">F</WindowsAction>
        <WindowsAction :disabled="isDisabled" @click="closeWindow">X</WindowsAction>
      </aside>
    </header>
    <main class="windows-application_container">
      <aside v-if="$slots.prefix" class="windows-application_prefix">
        <slot name="prefix" />
      </aside>
      <slot>
        <component v-if="component" v-bind="childProps" :is="typeof component === 'string' ? component : { ...component }" />
      </slot>
      <aside v-if="$slots.affix" class="windows-application_affix">
        <slot name="affix" />
      </aside>
    </main>
  </section>
</template>

<style lang="scss" scoped>
.windows-application {
  @include WindowBoxShadow;
  @include WindowAbsoluteCentered;
  overflow: hidden;
  max-width: 100%;
  max-height: var(--max-height--desktop);
  background-color: $windowsClassicBG;
  box-shadow: 0px 0px 2px 2px $windowsClassicBG;

  @include Tablet {
    min-width: 300px;
  }

  &[data-fullscreen] {
    min-height: var(--max-height--desktop);
    min-width: 100%;
  }
  &:not([data-fullscreen]) {
    min-height: fit-content;
  }

  &:not(:focus) {
    // TODO: Improve Focus toggle via vue directives and mouse events beyond element
    header {
      background-color: $windowsClassicBGSecondary;
    }
  }

  header {
    color: #fff;
    background-color: darkblue;
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
    max-height: var(--max-height--window);
  }
}
</style>
