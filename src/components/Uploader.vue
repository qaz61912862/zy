<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot name="loading" v-if="fileStatus === 'loading'">
        <button class="btn btn-primary">正在上传...</button>
      </slot>
      <slot name="uploaded" v-else-if="fileStatus === 'success'" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">上传</button>
      </slot>
      <!-- <span v-if="fileStatus === 'ready'">上传</span> -->
    </div>
    <span v-if="fileStatus === 'success'" @click="deleteFile">删除</span>
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
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUpload = (e: Event) => {
      console.log(e)
      if (fileInput.value) {
        fileInput.value.click()// 按钮触发input组件点击
      }
    }
    const deleteFile = () => {
      if (fileInput.value) {
        fileInput.value.value = ''
        fileStatus.value = 'ready'
        uploadedData.value = {}
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
          emit('file-uploaded', res.data)
          uploadedData.value = res.data
          fileStatus.value = 'success'
        }).catch(error => {
          emit('file-uploaded-error', { error })
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
      handleFileChange,
      uploadedData,
      deleteFile
    }
  }
})
</script>
