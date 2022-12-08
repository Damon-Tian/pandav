
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
        let geo = {
            "type": "Polygon", "coordinates": [[Number(item.lot), Number(item.lat)]]
        }
        console.log(item);
        if (item.protectMap) {
            geo = JSON.parse(item.protectMap).geometry
        }
        const json = {
            id: item.id,
            type: "Feature",
            img: stationImg,
            textName: 'name',
            properties: {
                stationName: item.name,
                ...item,
                coordinates: [Number(item.lot), Number(item.lat)],
                protectMap: null
            },
            geometry: {
                ...geo
            }
        }
        geoJson.push(json)
    })
    geoJson[0].properties.lineColor = "#F7C10E"
    geoJson[0].properties.fillColor = "rgba(247,193,14,0.4)"
    geoJson[0].textName = "stationName"
    console.log(geoJson);
    return geoJson
}