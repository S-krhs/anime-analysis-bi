import axios, { AxiosInstance } from 'axios'

// axios通信でもbasic認証を行う
export const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  auth: process.env.REQUIRED_BASIC_AUTH ? {
    username: String(process.env.BASIC_AUTH_USER),
    password: String(process.env.BASIC_AUTH_PASSWORD)
  } : undefined,
  timeout: 10000,
})

/**
 * @todo エラーハンドリング
 */
axiosClient.interceptors.response.use(
  (response) => response.data,
)