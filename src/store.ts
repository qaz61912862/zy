import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
import getters from './getters'
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
    }
  },
  getters
})

export default store
