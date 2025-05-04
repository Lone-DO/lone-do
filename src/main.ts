import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import components from './components'

/** Plugins */
import ZZZ from 'ZZZ'
ZZZ.create()
/** Assets */
import './assets/styles/main.scss'
/** Setup */
const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(ZZZ, { router })
// Bind components/ to global Vue components;
app.use(components)

app.mount('#app')
