
// 基层站点 api

import request from '@/utils/request'
const stationImg = require("../assets/img/selectedInfo/基层站点.png")
/**
 * 基层站点列表
 * @param {*} params
 * @returns
 */

export function get_station_list(params) {
    return request({
        url: '/front/org',
        method: 'get',
        params
    })
}
export async function get_station_geojson(orgId) {
    const params = {
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { records } = await get_station_list(params)
    const geoJson = []
    records.filter(item => item.lot && item.lat).forEach(item => {
        const json = {
            id: item.id,
            type: "Feature",
            img: stationImg,
            textName: 'name',
            properties: {
                stationName: item.name,
                ...item
            },
            geometry: {
                type: "Point",
                coordinates: [Number(item.lot), Number(item.lat)]

            }
        }
        geoJson.push(json)
    })
    return geoJson
}