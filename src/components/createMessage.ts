import Message from './Message.vue'
import { createApp } from 'vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // if (timer) {
  //   clearTimeout(timer)
  // }
  // createApp方法: 参数1组件,参数2是组件继承props的对象
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div') // 创建一个节点给Message组件挂载
  document.body.appendChild(mountNode) // 在body上插入
  messageInstance.mount(mountNode) // 调用mount方法, 把Message组件挂载在刚刚创建的节点上
  const timer = setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
