<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      class="file-upload-container d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传...</h2>
        </div>
      </template>
      <template #uploaded="{ uploadedData }">
        <img :src="uploadedData.data.url" alt="" width="500" />
      </template>
    </uploader>
    <!-- <input @change="handleFileChange" type="file" name="file" /> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules" v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
import Uploader from '../components/Uploader.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import { PostProps } from '../testData'
import axios from 'axios'
import { beforeUploadCheck } from '../utils'
import createMessage from '../components/createMessage'
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup () {
    const titleVal = ref('')
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    let imageId = ''
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            // _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column: String(column),
            // createdAt: new Date().toLocaleString(),
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          store.dispatch('createPost', newPost).then(res => {
            createMessage('发版成功, 2秒后跳转至文章', 'success', 2000)
            setTimeout(() => {
              router.push(`/column/${column}`)
            })
          })
          
        }
      }
    }
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const { files } = target
      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        console.log(uploadedFile)
        formData.append(uploadedFile.name, uploadedFile)
        axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res)
        })
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {
        format: ['image/jpg', 'image/jpeg'],
        size: 1
      })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传格式只能是jpg或jpeg', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1MB', 'error')
      }
      return passed
    }
    return {
      titleRules,
      contentVal,
      contentRules,
      titleVal,
      onFormSubmit,
      handleFileChange,
      uploadCheck,
      handleFileUploaded
    }
  }
})
</script>
<style>
  .create-post-page .file-upload-container{
    height: 200px;
    cursor: pointer;
  }
  .create-post-page .file-upload-container img{
    height: 100%;
    width: 100%;
    cursor: pointer;
    object-fit: cover;
  }
</style>
