localStorage.setItem('VITE_PLUGIN', 'true')
/** Extensions */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
/** Root/Host Component **/
import App from './App.vue'
/** Register component version to Global State */
import def from '../package.json'
const { name, version } = def
/** Assets */
import './assets/styles/main.scss'
import components from './components'
/** Factories */

import $router from './router'
/** Setup */
const app = createApp({ name, ...App })
/** Vue Pinia */
app.use(createPinia())
/** Vue Router */
app.use($router)
/** Global Components Registry */
/*** Local Globals  */
app.use(components)
/** Mount Application */
app.mount('#app')

if (process.env.NODE_ENV !== 'production') {
  console.log(name, version, app)
}
