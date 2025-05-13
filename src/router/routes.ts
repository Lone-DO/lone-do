const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ProjectView.vue'),
    children: [
      {
        name: 'project',
        path: ':projectId(.*)*',
        component: () => import('../views/ProjectView.vue'),
        children: [
          {
            name: 'project-404',
            path: ':error(.*)*',
            meta: { internalOnly: true },
            component: () => import('../views/ProjectView.vue'),
          },
        ],
      },
    ],
  },
]

export default routes
