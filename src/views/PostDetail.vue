<template>
  <div>
    <modal title="删除文章"
    :visible="modalIsVisible"
    @modal-on-close="modalIsVisible = false"
    @modal-on-confirm="modalIsVisible = false"
    >
      <p>确定要删除文章吗?</p>
    </modal>
    <img class="head-img" :src="post.image && post.image.url" />
    <h4>{{post.title}}</h4>
    <div class="author-box">
      <div class="author" v-if="post.author">
        <img :src="post.author.avatar && post.author.avatar.url" />
        <span>{{post.author.nickName}}</span>
      </div>
      <span class="creata-at">发表于: {{post.createdAt}}</span>
    </div>
    <div class="content" v-html="post.content"></div>
    <div v-if="showEditArea" class="btn-group mt-5">
      <router-link :to="`/create?id=${post._id}`" class="btn btn-success" type="button">编辑</router-link>
      <button class="btn btn-danger" type="button" @click.prevent="modalIsVisible = true">删除</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, UserProps } from '../store'
import Modal from '../components/Modal.vue'
import { useRoute } from 'vue-router'
import { PostProps } from '../testData'
export default defineComponent({
  name: 'PostDetail',
  components: {
    Modal
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const modalIsVisible = ref(false)
    const pid = route.params.id
    onMounted(() => {
      store.dispatch('fetchPost', pid)
    })
    const post = computed(() => store.state.post as PostProps)
    console.log(post.value)
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user as UserProps
      if (post.value && post.value.author && isLogin) {
        const postVal = post.value.author as UserProps
        return (postVal._id) === _id
      } else {
        return false
      }
    })
    return {
      post,
      showEditArea,
      modalIsVisible
    }
  }
})
</script>
<style>
  .head-img{
    width: 100%;
    margin-bottom: 10px;
  }
  .author-box{
    padding: 10px 0;
    border: 2px solid #ccc;
    border-left: none;
    border-right: none;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .author img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .author span{
    margin-left: 4px;
  }
  .creata-at{
    margin-left: auto;
  }
  .content{
    width: 100%;
    margin-top: 20px;
  }
</style>
