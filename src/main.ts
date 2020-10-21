import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import router from './router'
axios.defaults.baseURL = '/h/api'
axios.interceptors.request.use(config => {
  // config.headers['sub-site'] = 123
  // console.log(config)
  return config
})
axios.get('/columns/5f3e86d62c56ee13bb83096c').then(res => {
  console.log(res.data)
})
createApp(App).use(router).use(store).mount('#app')
