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
 * 巡护路线列表十条
 * @param {*} data
 * @returns
 */

export function get_patrol_list(params) {
    return request({
        url: '/front/patrol/page',
        method: 'get',
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

//获取geojson 接口

/*
 * 巡护样线geojson
 * @param {*} data
 * @returns
 */

export async function get_line_geojson(orgId) {
    const params = {}
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { rows } = await get_line(params, {
        pageNumber: 1,
        pageSize: 999
    })
    return rows.map((item) => JSON.parse(item.geoJson))

}

/*
 * 某条巡护路线geojson
 * @param {*} data
 * @returns
 */

export async function get_patrol_detail_geojson(orgId) {
    const params = {}
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { records } = await get_patrol_list({ pageNum: 1, pageSize: 10 })
    const requsets = []
    records.forEach(item => {
        requsets.push(get_patrol_detail({ id: item.patrolId }))
    })
    const data = await Promise.allSettled(requsets)
    console.log(data);
    const geoJson = []
    data.forEach(detail => {
        if (detail.status == "fulfilled") {
            const json = {
                type: "Feature",
                properties: {
                    color: "#62f709"
                },
                geometry: {
                    type: "LineString",
                    coordinates: detail.value.pointList.map((item) => [
                        Number(item.lon),
                        Number(item.lat)
                    ])
                }
            }
            geoJson.push(json)
        }

    })
    console.log(geoJson);
    return geoJson
}