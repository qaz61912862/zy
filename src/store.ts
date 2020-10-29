import { createStore, Commit } from 'vuex'
import { testData, ColumnProps, PostProps } from './testData'
import getters from './getters'
import axios from 'axios'
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}
export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  return commit(mutationName, data)
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: testData,
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    login (state, rawData) {
      state.token = rawData.data.token
      localStorage.setItem('token', rawData.data.token)
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.data.token}`
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, val: GlobalErrorProps) {
      state.error = val
    },
    logout (state) {
      state.token = ''
      localStorage.remove('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchCurrentUser (state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      return getAndCommit('/columns?currentPage=1&pageSize=999', 'fetchColumns', commit)
      // const { data } = await axios.get('/columns?currentPage=1&pageSize=5')
      // commit('fetchColumns', data)
    },
    fetchColumn ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      // axios.get(`/columns/${cid}`).then(res => {
      //   commit('fetchColumn', res.data)
      // })
    },
    fetchPosts ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
      // axios.get(`/columns/${cid}/posts`).then(res => {
      //   commit('fetchPosts', res.data)
      // })
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    createPost ({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload)
    },
  },
  getters
})

export default store
