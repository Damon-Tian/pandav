// 样线 api

import request from '@/utils/request'

/**
 * 电子围栏列表
 * @param {*} data
 * @returns
 */

export function get_line(data, params) {
    return request({
        url: '/front/edmp/transect/getTransList',
        method: 'post',
        data,
        params
    })
}