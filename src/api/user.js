import request from "@/utils/request"

/**
 * 登录
 * @param {*} params
 * @returns
 */
export function user_login(params) {
    return request({
        url: "/front/user/login",
        method: "post",
        params
    })
}

/**
 * 获取验证码
 * @returns
 */
export function user_code() {
    return request({
        url: "/front/kaptcha",
        method: "get",
        headers: {
            "No-Request-Loading": true
        }
    })
}

/**
 * 登出
 * @param {*} params
 * @returns
 */
export function user_logout(params) {
    return request({
        url: "/front/user/logout",
        method: "get",
        params
    })
}