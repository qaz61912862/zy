import { GlobalDataProps } from './store'

const getters = {
  // biggerColumnsLen (state: GlobalDataProps) {
  //   return state.columns.filter(c => c._id > 2).length
  // },
  getColumnById: (state: GlobalDataProps) => (id: string) => {
    return state.columns.find(c => c._id === id)
  },
  getPostsByCid: (state: GlobalDataProps) => {
    return (cid: string) => {
      // console.log(state.posts.filter(post => +post.column === cid))
      return state.posts.filter(post => post.column === cid)
    }
  }
}

export default getters
