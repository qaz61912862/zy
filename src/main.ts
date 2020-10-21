import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import router from './router'
axios.defaults.baseURL = '/h/api'
axios.interceptors.request.use(config => {
  return config
})
createApp(App).use(router).use(store).mount('#app')
