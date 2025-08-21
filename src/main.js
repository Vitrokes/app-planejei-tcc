import './assets/main.css'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('multi-select', Multiselect)

app.use(createPinia())
app.use(router)

app.mount('#app')