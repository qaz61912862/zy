<template>
  <div class="dropdown">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{title}}
    </a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <dropdown-item disabled>个人中心</dropdown-item>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import DropdownItem from './DropdownItem.vue'
export default defineComponent({
  name: 'Dropdown',
  components: {
    DropdownItem
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>
