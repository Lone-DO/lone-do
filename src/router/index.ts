import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import ZZZ from 'ZZZ'

function getPluginRoutes() {
  const plugins = [ZZZ];
  return plugins.reduce((routes, plugin) => {
    try {
      const { router } = plugin;
      if (router?.options?.routes?.length) return routes.concat(router.options.routes);
    } catch (error) {
      console.error(error)
      return routes;
    }
  }, [])
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...getPluginRoutes()]
})

export default router
