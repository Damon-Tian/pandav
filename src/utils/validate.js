
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
    if (typeof str === "string" || str instanceof String) {
        return true
    }
    return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
    if (typeof Array.isArray === "undefined") {
        return Object.prototype.toString.call(arg) === "[object Array]"
    }
    return Array.isArray(arg)
}

//重置表单
export const resetForm = (form) => {
    form && form.resetFields && form.resetFields()
}
//校验输入不能为空
export function required(message = "输入不能为空") {
    return { required: true, message, trigger: "blur" }
}
export function lengthRange(min = 5, max = 11, message) {
    return {
        min,
        max,
        message: message ? message : `输入长度${min}-${max}`,
        trigger: "blur"
    }
}
//校验multiple select 是否没选
export function validateMultSelect(rule, value, callback) {
    if (value && value.length) {
        callback()
    } else {
        callback(new Error("请至少选择一条数据"))
    }
}
