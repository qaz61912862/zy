<template>
  <div class="container">
    <!-- {{biggerColumnsLen}} -->
    <uploader :beforeUpload="beforeUpload" />
    <column-list :list="list"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'
import Uploader from '../components/Uploader.vue'
import { GlobalDataProps } from '../store'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    Uploader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    const biggerColumnsLen = store.getters.biggerColumnsLen
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片格式只能是JPEG', 'error')
      }
      return isJPG
    }
    return {
      list,
      biggerColumnsLen,
      beforeUpload
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
