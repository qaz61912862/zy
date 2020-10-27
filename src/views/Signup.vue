<template>
  <div class="signup-page mx-auto p-3 w-330">
    <validate-form style="text-align: left" @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <validate-input type="text" placeholder="请输入" v-model="params.email" :rules="emailRules"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <validate-input type="text" placeholder="请输入" v-model="params.nickName" :rules="nameRules"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <validate-input type="password" placeholder="请输入" v-model="params.password" :rules="passwordRules"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Repeat password</label>
        <validate-input type="password" placeholder="请输入" v-model="params.repeatPassword" :rules="repeatPasswordRules"/>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary">注册</button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Signup',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const params = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        const data = {
          email: params.email,
          nickName: params.nickName,
          password: params.password
        }
        try {
          await axios.post('/users', data)
          createMessage('注册成功, 正在跳转到登录页面', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } catch (err) {
          console.log(err)
        }
      }
    }
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
    const nameRules: RulesProp = [
      {
        type: 'required',
        message: '昵称不能为空'
      }
    ]
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]
    const repeatPasswordRules: RulesProp = [
      {
        type: 'required',
        message: '重复密码不能为空'
      },
      {
        type: 'custom',
        validator: () => {
          return params.password === params.repeatPassword
        },
        message: '两次输入密码需要一致'
      }
    ]
    return {
      onFormSubmit,
      params,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules
    }
  }
})
</script>
