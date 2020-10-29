<template>
  <div class="container">
    <!-- {{biggerColumnsLen}} -->
    <uploader :beforeUpload="beforeUpload" @file-uploaded="fileUploaded">
      <!-- <button class="btn primary-btn">上传图片</button> -->
      <!-- <template #loading>
        <div class="spinner-border">
          <span class="sr-only"></span>
        </div>
      </template> -->
      <template #uploaded="{ uploadedData }">
        <img :src="uploadedData.data.url" alt="" width="500" />
      </template>
    </uploader>
    <column-list :list="list"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'
import Uploader from '../components/Uploader.vue'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
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
      // const isJPG = file.type === 'image/jpeg'
      // if (!isJPG) {
      //   createMessage('上传图片格式只能是JPEG', 'error')
      // }
      // return isJPG
      return true
    }
    const fileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID${rawData.data._id}`, 'success')
    }
    return {
      list,
      biggerColumnsLen,
      beforeUpload,
      fileUploaded
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
