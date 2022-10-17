import axios from 'axios'
import qs from 'qs'
import JSEncrypt from "jsencrypt"
/**
 * @augments
 * @method encryption()  加密
 * @param
 * publicKey:公钥；password:密码
 */
function encryption(publicKey, password) {
    let encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    let psw = encryptor.encrypt(password);
    return psw;
}

function getAjax(param) {
    return new Promise((resolve, reject) => {
        axios({
            method: param.method || 'get',
            headers: {
                "Authorization": `bearer ${localStorage.accessToken}`,
                "Content-Type": param.contentType || 'application/json',
            },
            url: `/iccapi/${param.url}`,
            data: param.data
        }).then(res => {
            if(res.data.success) {
                resolve(res.data.data)
            }
            else {
                reject("用户名或密码错误")
            }
        }).catch(err => {
            reject(err)
        })
    })
}

function getPublickKey(ip) {
    return new Promise((resolve, reject) => {
        getAjax({
            url: `/evo-apigw/evo-oauth/1.0.0/oauth/public-key?t=${new Date().getTime()}`,
        }).then(res => {
            resolve(res)
        })
    })
}

export default {

    // 登录服务器
    loginServer(param) {
        return new Promise((resolve, reject) => {
            getPublickKey(param.ip).then(res => {
                let publicKey = res.publicKey
                let value = {
                    'username': encryption(publicKey, param.username),
                    'password': encryption(publicKey, param.password),
                    'code': "",
                    'grant_type': 'password',
                    'client_id': 'web_client',
                    "client_secret": 'web_client',
                    "public_key": publicKey,
                    "verifyCodeFlag": 1
                }
                getAjax({
                    method: 'post',
                    contentType: 'application/x-www-form-urlencoded',
                    url: `/evo-apigw/evo-oauth/oauth/token`,
                    data: qs.stringify(value)
                }).then(res => {
                    console.log(res)
                    localStorage.setItem("UserName", param.username);
                    localStorage.setItem("accessToken", res.access_token);
                    localStorage.setItem("refreshToken", res.refresh_token);
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("magicId", res.magicId);
                    localStorage.setItem("remainderDays", res.remainderDays || '');
                    resolve("登录成功")
                }).catch(err => {
                    reject(err)
                })
            })
        })
    },
    // 获取树
    getTree(data) {
        return new Promise((resolve, reject) => {
            getAjax({
                method: 'post',
                url: `/evo-apigw/evo-brm/1.2.0/tree`,
                data
            }).then(res => {
                resolve(res)
            })
        })
    },
    videoInfo() {
        return new Promise((resolve, reject) => {
            getAjax({
                method: 'get',
                url: `evo-brm/1.2.0/resources-info/get-resource?category=1&type=DHPlayer`,
                onSuccess(rel) {
                    resolve(rel.data.data)
                },
                onError(rel) {
                    reject(rel)
                }
            })
        })
    },
    /**
     * @method fetchRealRTSP 获取实时视频RTSP地址
     */
    fetchRealRTSP(params) {
        return new Promise((resolve, reject) => {
            axios.post('admin/API/MTS/Video/StartVideo', params).then(res => {
                
            })
        })
    },
    /**
     * @method 获取联动录像 RTSP地址
     */
    fetchRTSP(params) {
        const resetAjax = that.resetAjax || function () {}
        return new Promise((resolve, reject) => {
            resetAjax({
                method: 'post',
                url: `admin/API/SS/Playback/StartPlaybackByTime`,
                isSNoTip: true,
                data: params,
                onSuccess(res) {
                    resolve(res.data.data)
                },
                onError(res) {
                    reject(res)
                }
            })
        })
    },
    //获取录像文件
    fetchRecord(params) {
        const resetAjax = that.resetAjax || function () {}
        return new Promise((resolve, reject) => {
            resetAjax({
                method: 'post',
                url: `admin/API/SS/Record/QueryRecords`,
                isSNoTip: true,
                data: params,
                onSuccess(res) {
                    resolve(res.data.data)
                },
                onError(res) {
                    reject(res)
                }
            })
        })
    },
    // 封装的方法，url，methods 全部由现场传入到
    getRTSPURL(params) {
        const resetAjax = that.resetAjax || function () {}
        return new Promise((resolve, reject) => {
        resetAjax({
            method: params.methods,
            url: params.url || params.path,
            isSNoTip: true,
            data: params,
            onSuccess(res) {
                resolve(res.data.data)
            },
            onError(res) {
                reject(res)
            }
        })
        })
    }
}