<template>
  <div class="container">
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
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    const radio = ref('1')
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      user: currentUser,
      isLoading,
      radio
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
