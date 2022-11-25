
// 设备 api

import request from '@/utils/request'

/*
 * 设备点位
 * @param {*} data
 * @returns
 */

export function get_device_list(data) {
    return request({
        url: '/front/ePoint/getEPList',
        method: 'post',
        data
    })
}
/*
 * 设备点位详情
 * @param {*} params
 * @returns
 */

export function get_device_detail(params) {
    return request({
        url: '/front/edmp/device/getDetails',
        method: 'get',
        params
    })
}
