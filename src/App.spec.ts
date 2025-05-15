import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Component from './App.vue'

describe('App (Root)', () => {
  it('renders properly', () => {
    const wrapper = mount(Component)
    expect(wrapper.html()).toBeTruthy()
  })
})
