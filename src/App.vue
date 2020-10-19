<template>
  <div class="container">
    <global-header :user="user"/>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return {
      user: currentUser
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
