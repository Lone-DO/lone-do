import { createRouter, createWebHashHistory, createWebHistory, type Router } from 'vue-router'
import routes from './routes.ts'
import ZZZ, { type iSelf } from 'ZZZ'

export interface iRouter {
  instance: Router | null
  load: () => [] | null
  plugin: () => void
  build: () => void
}

const component = () =>
  Promise.resolve({ name: 'mock-template', displayName: 'Mock Template', render: () => '' })

function getPluginRoutes() {
  const plugins = [ZZZ]
  return plugins.reduce((routes, plugin: iSelf) => {
    try {
      if (plugin.router?.options?.routes?.length) {
        const filtered = plugin.router.options.routes.reduce((collection: [], route) => {
          if (route?.meta?.internalOnly) return collection
          return collection.concat({ ...route, component })
        }, [])
        return routes.concat(filtered)
      }
      if (plugin.router.load) return routes.concat(plugin.router.load())
    } catch (error) {
      console.error(error)
      return routes
    }
  }, [])
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...getPluginRoutes()]
})

export default router
