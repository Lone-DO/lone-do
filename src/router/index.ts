import { createRouter, createWebHistory } from 'vue-router'
import defaultRoutes from './routes.ts'
import zzz from '@zzz/main.js'

function getPluginRoutes() {
  const plugins = [zzz]
  /** @ts-expect-error - TODO: Find proper types */
  const data = plugins.reduce((routes: never[], plugin: unknown[]) => {
    /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
    const { config, router } = plugin

    try {
      const pluginRoutes = Array.isArray(router?.options?.routes) ? router.options.routes : []
      if (pluginRoutes?.length) {
        /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
        const filtered = pluginRoutes.reduce((collection, route) => {
          if (route?.meta?.internalOnly) return collection
          const path = route.meta?.preParsed ? route.path : `${config.baseUrl === '/' ? '' : config.baseUrl}${route.path}`
          collection.push({
            ...route,
            path,
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
  /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
  routes: [...defaultRoutes, ...getPluginRoutes()],
})

export default router
