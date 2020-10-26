import axios from 'axios'
interface LoginProp {
  email: string;
  password: string;
}

export function login (data: LoginProp) {
  return axios({
    url: '/user/login',
    method: 'post',
    data
  })
}
