import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.100.10.149:8080/api/v1/auth',
  withCredentials: false,
})

export default api
