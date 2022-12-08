import { user_login, user_logout } from "@/api/user"
import {
    getToken,
    setToken,
    getRoles,
    setRoles,
    getPermission,
    setPermission,
    getName,
    setName,
    getAvatar,
    setAvatar,
    getOrgid,
    setOrgid,
    getSavePassword,
    setSavePassword,
    getPassword,
    setPassword
} from "@/utils/auth"

const state = {
    token: getToken(),
    // 角色 1：成都分局超级管理员，2:区域超级管理员，3:区域普通管理员
    roles: getRoles(),
    name: getName(),
    savePassword: getSavePassword(),
    password: getPassword(),
    avatar: getAvatar(),
    introduction: "",
    permission: getPermission(),
    orgid: getOrgid()
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        setToken(token)
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
        setRoles(roles)
    },
    SET_PERMISSION: (state, permission) => {
        state.permission = permission
        setPermission(permission)
    },
    SET_NAME: (state, name) => {
        state.name = name
        setName(name)
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
        setAvatar(avatar)
    },
    SET_ORGID: (state, orgid) => {
        state.orgid = orgid
        setOrgid(orgid)
    },
    SET_SAVEPASSWORD: (state, params) => {
        const { savePassword, password } = params
        state.savePassword = savePassword
        setSavePassword(savePassword)
        if (savePassword) {
            setPassword(password)
        } else {
            setPassword("")
        }
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            user_login(userInfo)
                .then((res) => {
                    const { roleId, username, avatar, permission, orgId } = res
                    commit("SET_ROLES", roleId)
                    commit("SET_NAME", username)
                    commit("SET_AVATAR", avatar)
                    commit("SET_PERMISSION", permission)
                    commit("SET_ORGID", orgId)
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            if (!getSavePassword()) {
                commit("SET_NAME", "")
                commit("SET_SAVEPASSWORD", { savePassword: false })
            }
            commit("SET_TOKEN", "")
            commit("SET_ROLES", "")
            commit("SET_AVATAR", "")
            commit("SET_PERMISSION", "")
            commit("SET_ORGID", "")
            window.location.reload()
            resolve(true)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
