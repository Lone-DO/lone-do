import { createRouter, createWebHistory } from 'vue-router'
import defaultRoutes from './routes.ts'
import ZZZ from '../../ZZZ/src/main.ts'

function getPluginRoutes() {
  const plugins = [ZZZ]
  const data = plugins.reduce((routes: never[], plugin: unknown) => {
    try {
      /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
      if (plugin?.router?.options?.routes?.length) {
        /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
        const { routes: pluginRoutes } = plugin.router.options
        /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
        const filtered = pluginRoutes.reduce((collection, route) => {
          if (route?.meta?.internalOnly) return collection
          collection.push({
            ...route,
            /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
            path: `${plugin.baseUrl}${route.path}`,
            component: () => import('@/components/MockTemplate.vue'),
          })
          return collection
        }, [])
        return routes.concat(filtered)
      }
      return routes
    } catch (error) {
      console.error(error)
      return routes
    }
  }, [])

  return data
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...defaultRoutes, ...getPluginRoutes()],
})

export default router
