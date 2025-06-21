const routes = [
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/MockTemplate.vue'),
  },
]

export default routes
