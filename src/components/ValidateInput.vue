<template>
  <div class="validate-input-container pb-3">
    <input
      @input="emitInput"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
interface RuleProp {
  type: 'required' | 'email';
  message: string;
}
export type RulesProp = RuleProp[]
const emailReg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup (props, { emit, attrs }) {
    console.log(attrs)
    const inputRef = reactive({
      val: props.modelValue || '', // 赋默认值
      error: false,
      message: ''
    })
    const emitInput = (e: KeyboardEvent) => {
      inputRef.val = (e.target as HTMLInputElement).value
      emit('update:modelValue', inputRef.val)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = (emailReg.test(inputRef.val))
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
      }
    }
    return {
      inputRef,
      validateInput,
      emitInput
    }
  }
})
</script>
