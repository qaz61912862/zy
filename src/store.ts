import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
import getters from './getters'
import axios from 'axios'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false,
      columnId: 1
    }
  },
  mutations: {
    login (state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'Hanson'
      }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      axios.get('/columns?currentPage=1&pageSize=5').then(res => {
        commit('fetchColumns', res.data)
      })
    }
  },
  getters
})

export default store
