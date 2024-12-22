import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import components from './components'

import './assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// Bind components/ to global Vue components;
app.use(components)

app.mount('#app')
