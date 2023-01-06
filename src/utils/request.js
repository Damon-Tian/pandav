import axios from "axios"
import store from "@/store"
import domMessage from './messageOnce'
import { getToken } from "./auth"

const messageOnce = new domMessage()
const service = axios.create({
    // baseURL: import.meta.env.VITE_BASE_API,
    timeout: 20000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {

        const token = getToken()
        // 如果有token 就携带tokon
        if (token) {
            config.headers["Authorization"] = token
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.request.responseType === "blob") {
            return response
        }
        if (response.data.code !== 200) {
            if (response.data.code === 102) {
                store.dispatch("user/logout")
                messageOnce.error({
                    message: "登陆已过期，请重新登陆！",
                    duration: 5 * 1000
                })
                return Promise.reject(response.data)
            }
            return Promise.reject(response.data)
        } else {
            //获取token  headers access_token
            const access_token = response.headers["access_token"]
            if (getToken() !== access_token && access_token) {
                store.commit("user/SET_TOKEN", access_token)
            }

            return response.data.data
        }
        // return response.data.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
