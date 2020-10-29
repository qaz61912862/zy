<template>
  <div class="post-list">
    <article v-for="post in list" :key="post.column" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100">
          </div>
          <template v-if="post.image">
            <p :class="{'col-8': post.image.url}" class="text-muted">{{post.excerpt}}</p>
          </template>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../testData'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
