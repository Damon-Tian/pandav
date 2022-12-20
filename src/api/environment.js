
// 生态环境 api


import request from '@/utils/request'
/**
 * 大屏获取生态设备信息
 * @returns 
 */
export function get_ecologicalequipment() {
    return request({
        url: '/front/edmp/largeScreen/getEcologicalEquipment',
        method: 'get'
    })
}
/**
 * 大屏获取生态设备详细指标
 * @returns 
 */
export function get_env_detail(data) {
    return request({
        url: '/front/env/monitors/list',
        method: 'post',
        data
    })
}
/**
 * 大屏获取生态设备详细指标
 * @returns 
 */
export function get_env_trend(params) {
    return request({
        url: '/front/env/monitors/trend',
        method: 'get',
        params
    })
}