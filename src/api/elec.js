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

export function get_elec_heatmap(data) {
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



// 到处每个接口可拼装好的geojson


/**
 * 获取一般核心区域geojson
 * @param {*} params
 * @returns
 */
export async function get_eleccore_geojson(orgId) {
    const params = {
        isCore: 0,
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { records } = await get_elec(params)
    return records.map((item) => JSON.parse(item.geoJson))
}

/**
 * 获取一般保护区区域geojson
 * @param {*} params
 * @returns
 */
export async function get_elec_geojson(orgId) {
    const params = {
        isCore: 1,
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { records } = await get_elec(params)
    return records.map((item) => JSON.parse(item.geoJson))
}

/**
 * 获取热力图geojson
 * @param {*} params
 * @returns
 */
export async function get_elec_heatmap_geojson(orgId, timeRange) {
    const params = {
        areaCodes: []
    }
    if (orgId) {
        params.areaCodes = [orgId]
    }
    if (timeRange) {
        params.queryDate = timeRange
    }
    const geoJson = await get_elec_heatmap(params)
    return geoJson
}
/**
 * 获取核心区域人员 轨迹geojson
 * @param {*} params
 * @returns
 */
export async function get_elec_person_geojson(orgId) {
    const params = {
        areaCodes: []
    }
    if (orgId) {
        params.areaCodes = [orgId]
    }
    return get_elec_person(params)
}