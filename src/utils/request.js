import axios from "axios"

const service = axios.create({
    // baseURL: import.meta.env.VITE_BASE_API,
    timeout: 10000 // request timeout
})


// 响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.data.code !== 200) {
            return Promise.reject(response.data)
        } else {
            return response.data.data
        }
        // return response.data.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
