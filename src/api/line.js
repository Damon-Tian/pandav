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

export async function get_patrol_detail_geojson(orgId, id = 109) {
    const params = {}
    if (orgId) {
        params.orgIds = [orgId]
    }
    const data = await get_patrol_detail({ id })
    const geoJson = [
        {
            type: "Feature",
            properties: {
                color: "#62f709"
            },
            geometry: {
                type: "LineString",
                coordinates: data.pointList.map((item) => [
                    Number(item.lon),
                    Number(item.lat)
                ])
            }
        }
    ]
    return geoJson
}