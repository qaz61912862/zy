<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img  :src="column.avatar.url" :alt="column.title" class="rounded-circle border border-light w-25 my-3" >
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
interface ImageProps {
  id?: string;
  url: string;
  createdAt?: string;
}
export interface ColumnProps{
  _id: number;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      const list = props.list.map(item => {
        if (!item.avatar) {
          item.avatar = {
            url: require('@/assets/column.jpg')
          }
        }
        return item
      })
      return list
    })
    return {
      columnList
    }
  }
})
</script>
