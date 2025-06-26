<script setup lang="ts">
import { useWindowStore, type iApplication } from '@/stores/windows'
import DesktopItem from './DesktopItem.vue'

const windowStore = useWindowStore()

const apps = <iApplication[]>[
  {
    logo: '/images/windows/computer_explorer.svg',
    title: 'My Computer',
    component: () => import('../apps/AppComputer.vue'),
  },
  {
    logo: '/images/windows/network_neighborhood.svg',
    title: 'Network Neighborhood',
    component: () => import('../apps/AppNetworkNeighborhood.vue'),
  },
  {
    logo: '/images/windows/mailbox_world.svg',
    title: 'Inbox',
    component: () => import('../apps/AppInbox.vue'),
  },
  {
    logo: '/images/windows/recycle_bin_empty.svg',
    title: 'Recycle Bin',
    component: () => import('../apps/AppRecycle.vue'),
  },
  {
    logo: '/images/windows/msn_cool.svg',
    title: 'Microsoft Network',
    component: () => import('../apps/AppNetwork.vue'),
  },
  {
    logo: '/images/windows/briefcase.svg',
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
