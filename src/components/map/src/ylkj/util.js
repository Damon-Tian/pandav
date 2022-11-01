/**
 * @Descripttion:生成唯一ID
 * @Author: 
 * @Date: 2022-11-01 10:31:55
 * @LastEditors: 
 * @return {*}
 */
export function uuid() {
    const tempUrl = URL.createObjectURL(new Blob());
    const uuid = tempUrl.toString();
    URL.revokeObjectURL(tempUrl); // 释放这个url
    return uuid.substring(uuid.lastIndexOf("/") + 1)
}
// 判断是否字符串
export function isString(value) {
    return Object.prototype.toString.call(value) == "[object String]";
}
// 判断数组
export function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}