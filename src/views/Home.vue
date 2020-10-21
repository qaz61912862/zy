<template>
  <div class="container">
    {{biggerColumnsLen}}
    <column-list :list="list"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'
import { GlobalDataProps } from '../store'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    const biggerColumnsLen = store.getters.biggerColumnsLen
    return {
      list,
      biggerColumnsLen
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
