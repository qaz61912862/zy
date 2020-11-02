<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag === 'input'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, computed } from 'vue'
import { emitter } from './ValidateForm.vue'
interface RuleProp {
  type: 'required' | 'validate' | 'custom';
  message: string;
  validate?: RegExp;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
// const emailReg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: {
      type: String
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup (props, { emit }) {
    const inputRef = reactive({
      val: computed({
        get: () => {
          return props.modelValue || ''
        },
        set: value => emit('update:modelValue', value)
      }),
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'validate':
              if (rule.validate) {
                passed = rule.validate && (rule.validate.test(inputRef.val))
              }
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed // 此处allPassed是指单个组件的每一个规则都通过
      }
      return true
    }
    onMounted(() => {
      // 创建完成把校验传到父组件,但未执行,触发submit才执行
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>
