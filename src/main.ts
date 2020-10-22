import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import router from './router'
import hansonggoruia from 'hansonggoruia'
import 'hansonggoruia/dist/index.css'
axios.defaults.baseURL = '/h/api'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})
createApp(App).use(router).use(store).use(hansonggoruia).mount('#app')
