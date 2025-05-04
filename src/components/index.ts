/* eslint-disable @typescript-eslint/no-explicit-any */
// import component from './:dir/:component.vue'
export * as MockTemplate from './MockTemplate.vue'

const components = {
  install(Vue: any) {
    Vue.component('Component', {})
  }
}

export { components as default }
