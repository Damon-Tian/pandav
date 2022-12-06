
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