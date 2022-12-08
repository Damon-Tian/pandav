export default {
    get(key) {
        const str = sessionStorage.getItem(key)
        try {
            const toObj = JSON.parse(str) // json字符串转对象
            /*
                      判断条件 1. 排除null可能性 
                      2. 确保数据是对象或数组
            */
            if (typeof toObj === "number") {
                return toObj
            }
            if (typeof toObj === "boolean") {
                return toObj
            }
            if (toObj && typeof toObj === "object") {
                return toObj
            }
        } catch {
            return str
        }
    },
    set(key, value) {
        if (value && typeof value === "object") {
            value = JSON.stringify(value)
        }
        sessionStorage.setItem(key, value)
    },
    remove(key) {
        sessionStorage.removeItem(key)
    }
}
