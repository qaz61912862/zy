<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
      <span v-if="fileStatus === 'loading'">正在上传...</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else>上传</span>
      <!-- <span v-if="fileStatus === 'ready'">上传</span> -->
    </button>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      default: '/upload'
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  setup (props) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const triggerUpload = (e: Event) => {
      console.log(e)
      if (fileInput.value) {
        fileInput.value.click()// 按钮触发input组件点击
      }
    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const { files } = target
      if (files) {
        const uploadedFile = (Array.from(files))[0]
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadedFile)
          if (!result) return
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', uploadedFile)
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res)
          fileStatus.value = 'success'
        }).catch(() => {
          fileStatus.value = 'error'
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange
    }
  }
})
</script>
