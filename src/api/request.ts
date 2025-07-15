import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.100.200.121:8088/api',
  withCredentials: false,
})

export default api
