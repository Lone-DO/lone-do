/** Extensions */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
/** Root/Host Component **/
import App from './App.vue'
import def from '../package.json'
/** Assets */
import './assets/styles/main.scss'
import components from './components'
/** Factories */
import $router from './router'
/** Setup */
const app = createApp({ name: 'Portfolio-App', ...App })
/** Vue Pinia */
app.use(createPinia())
/** Vue Router */
app.use($router)
/** Global Components Registry */
/*** Local Globals  */
app.use(components)
/** Mount Application */
app.mount('#app')
/** Register component version to Global State */
const { name, version } = def
console.log(name, version, app)
