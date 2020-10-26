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
}, function (e) {
  // 对请求错误做些什么
  const { error } = e.response.data
  store.commit('setLoading', false)
  store.commit('setError', { status: true, message: error })
  return Promise.reject(error)
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, function (e) {
  // 对响应错误做点什么
  const { error } = e.response.data
  store.commit('setLoading', false)
  store.commit('setError', { status: true, message: error })
  return Promise.reject(error)
})
export const app = createApp(App)
app.config.globalProperties.foo = 'bar'
app.use(router).use(store).use(hansonggoruia).mount('#app')
