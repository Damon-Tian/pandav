// 电子围栏 api

import request from '@/utils/request'

/**
 * 电子围栏列表
 * @param {*} data
 * @returns
 */

export function get_elec(data) {
    return request({
        url: '/front/edmp/elecRail/list',
        method: 'post',
        data
    })
}
/**
 * 获取电子围栏 热力图数据
 * @param {*} data
 * @returns
 */

export function get_elec_hotmap(data) {
    return request({
        url: '/front/edmp/elecRail/heatMap',
        method: 'post',
        data
    })
}
/**
 * 获取电子围栏核心区域 人员轨迹图
 * @param {*} data
 * @returns
 */

export function get_elec_person(data) {
    return request({
        url: '/front/edmp/elecRail/heatMap/personCount',
        method: 'post',
        data
    })
}

/**
 * 热力图人数统计
 * @param {*} params
 * @returns
 */
export function get_electronic_fence_count(params) {
    return request({
        url: "/front/edmp/dataVisualization/getElectronicFenceCount",
        method: "get",
        params
    })
}

/**
 * 获取靶向短信统计数据
 * @param {*} params
 * @returns
 */
export function get_targeted_sms_data(params) {
    return request({
        url: "/front/edmp/dataVisualization/getTargetedSmsData",
        method: "get",
        params
    })
}