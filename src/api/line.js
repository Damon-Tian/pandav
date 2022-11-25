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
/*
 * 巡护路线
 * @param {*} data
 * @returns
 */

export function get_patrol_detail(params) {
    return request({
        url: '/front/patrol/detail',
        method: 'get',
        params
    })
}