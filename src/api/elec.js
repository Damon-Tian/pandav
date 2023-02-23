// 电子围栏 api
const img = require("@/assets/img/3931670557158_.pic.jpg")
import request from '@/utils/request'
import { getRandomRgb } from '@/utils'
import axios from 'axios'
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
 * 热力图人数统计
 * @param {*} params
 * @returns
 */
export function get_electronic_person_his(params) {
    return request({
        url: "/front/edmp/largeScreen/getPersonCountHistoryData",
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

/**
 * 导出历史统计人数
 * @param {*} params
 * @returns
 */
export function export_Area_user_count(params) {
    return request({
        url: "/front/edmp/largeScreen/exportAreaUserCount",
        method: "get",
        params,
        responseType: 'blob'
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
    const geoJson = records.map((item) => JSON.parse(item.geoJson))
    geoJson[0].properties.lineColor = "#f90909"
    geoJson[0].properties.fillColor = "rgba(249,9,9,0.4)"
    return geoJson
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
    const geoJson = records.map((item) => JSON.parse(item.geoJson))
    geoJson[0].properties.lineColor = "#0B9FFB"
    geoJson[0].properties.fillColor = "rgba(11,159,251,0.4)"
    return geoJson
}

export function getArea(orgId) {
    let area = []
    if (orgId == 5) {
        //崇州
        area = ['G3', 'C2', 'C3']
    } else if (orgId == 6) {
        //大邑
        area = ['C1', 'G1', 'G2']
    } else if (orgId == 7) {
        //彭州
        area = ['C6', 'G6']
    } else if (orgId == 8) {
        //都江堰
        area = ['C4', 'C5', 'G4', 'G5']
    }

    return area
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
        // 热力图传参

        params.areaCodes = getArea(orgId)
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
        params.areaCodes = getArea(orgId)
    }
    const geoJson = await get_elec_person(params)
    geoJson.forEach((item, index) => {
        item.properties.color = getRandomRgb()
        item.id = (index + 1)
    })
    geoJson[0].linePoint = true
    return geoJson
}


export async function get_elec_area_geojson() {
    const data = await axios.get('/static/line01.json')
    const geoJson = data.data
    geoJson[0].img = img
    geoJson[0].tip = '总长度：221.6KM'
    return geoJson
}

