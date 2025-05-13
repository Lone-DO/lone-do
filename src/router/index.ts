import { createRouter, createWebHistory } from 'vue-router'
import defaultRoutes from './routes.ts'
import { r as zRouteFactory } from '@zzz/routes.js'
import { c as zConfig } from '@zzz/config.js'

function getPluginRoutes() {
  const plugins = [[zConfig, zRouteFactory]]
  const data = plugins.reduce((routes: never[], plugin: unknown[]) => {
    const [config, factory] = plugin

    try {
      const pluginRoutes = typeof factory === 'function' ? factory(true) : []
      if (pluginRoutes?.length) {
        /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
        const filtered = pluginRoutes.reduce((collection, route) => {
          if (route?.meta?.internalOnly) return collection
          /** @ts-expect-error - TODO: Find proper type for Routes with optional properties */
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
  routes: [...defaultRoutes, ...getPluginRoutes()],
})

export default router
