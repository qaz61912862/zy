import { GlobalDataProps } from './store'

const getters = {
  biggerColumnsLen (state: GlobalDataProps) {
    return state.columns.filter(c => c.id > 2).length
  },
  getColumnById: (state: GlobalDataProps) => (id: number) => {
    return state.columns.find(c => +c.id === id)
  },
  getPostsByCid: (state: GlobalDataProps) => {
    return (cid: number) => {
      return state.posts.filter(post => +post.columnId === cid)
    }
  }
}

export default getters
