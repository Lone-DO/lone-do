<script setup lang="ts">
import { useWindowStore, type iApplication } from '@/stores/windows'
import DesktopItem from './DesktopItem.vue'

const windowStore = useWindowStore()

const apps = <iApplication[]>[
  {
    logo: '',
    title: 'My Computer',
    component: () => import('../apps/AppComputer.vue'),
  },
  {
    logo: '',
    title: 'Network Neighborhood',
    component: () => import('../apps/AppNetworkNeighborhood.vue'),
  },
  {
    logo: '',
    title: 'Inbox',
    component: () => import('../apps/AppInbox.vue'),
  },
  {
    logo: '',
    title: 'Recycle Bin',
    component: () => import('../apps/AppRecycle.vue'),
  },
  {
    logo: '',
    title: 'The Microsoft Network',
    component: () => import('../apps/AppNetwork.vue'),
  },
  {
    logo: '',
    title: 'My Briefcase',
    component: () => import('../apps/AppBriefcase.vue'),
  },
]
</script>

<template>
  <DesktopItem
    v-for="(app, index) in apps"
    :key="app.title + index"
    v-bind="app"
    @dblclick.stop="windowStore.updateApplication(app)"
    @keydown.enter.stop="windowStore.updateApplication(app)"
  />
</template>
