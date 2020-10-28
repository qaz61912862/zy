<template>
  <div class="container">
    <!-- {{isLogin}} -->
    <global-header :user="user"/>
    <!-- <loader v-if="isLoading"/> -->
    <!-- <h-button type="primary">按钮</h-button>
    <h-radio v-model="radio" label="2">北京烤鸭</h-radio>
    {{radio}} -->
    <loader text="拼命加载中..." v-if="isLoading"/>
    <!-- <h1 v-if="isLoading">loading...</h1> -->
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive, onMounted, watch } from 'vue'
import { GlobalDataProps } from './store'
import axios from 'axios'
import { useStore } from 'vuex'
import { app } from './main'
import 'bootstrap/dist/css/bootstrap.min.css'
import createMessage from './components/createMessage'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    console.log(app.config.globalProperties)
    const radio = ref('1')
    const radio2 = reactive({
      count: 0
    })
    const store = useStore<GlobalDataProps>()
    const error = computed(() => store.state.error)
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const isLogin = computed(() => store.state.user.isLogin)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    onMounted(() => {
      if (!store.state.user.isLogin && localStorage.getItem('token')) {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      error,
      user: currentUser,
      isLoading,
      radio,
      radio2,
      isLogin
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
