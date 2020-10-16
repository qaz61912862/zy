<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
// 实例化 mitt
export const emitter = mitt()
// 定义子组件validateInput函数类型
type funcType = () => boolean
export default defineComponent({
  emits: ['form-submit'],
  setup (props, { emit }) {
    let funcArr: funcType[] = [] // 创建一个用来放置子组件validateInput方法的数组
    const submitForm = () => {
      // 执行数组里的每一项,若结果都是true通过校验
      const result = funcArr.map(func => func()).every(result => result)
      emit('form-submit', result)
    }
    const callback = (func: funcType) => {
      // 此处把子组件的validateInput方法push到funcArr
      funcArr.push(func)
    }
    // 事件监听, 组件一创建完毕子组件触发emit, 把validateInput push到funcArr
    emitter.on('form-item-created', e => callback(e))
    onUnmounted(() => {
      emitter.off('form-item-created', e => callback(e))
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
