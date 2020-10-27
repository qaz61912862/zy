<template>
  <div class="container">
    <validate-form style="text-align: left" @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <validate-input ref="inputRef" type="text" placeholder="请输入" v-model="params.email" :rules="emailRules"/>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <validate-input type="password" placeholder="请输入" v-model="params.password" :rules="passwordRules"/>
      </div>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'
// import { login } from '../api'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import createMessage from '../components/createMessage'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref<Ref>()
    const store = useStore()
    const router = useRouter()
    const params = reactive({
      email: '',
      password: ''
    })
    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '电子邮箱地址不能为空'
      },
      {
        type: 'validate',
        message: '请输入正确的电子邮箱格式',
        validate: /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
      }
    ]
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        try {
          await store.dispatch('loginAndFetch', params)
          createMessage('登录成功 2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        } catch (err) {
          console.log(err)
        }
      }
    }
    return {
      emailRules,
      passwordRules,
      onFormSubmit,
      inputRef,
      params
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
