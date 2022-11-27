
// 基层站点 api

import request from '@/utils/request'

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
        isCore: 0,
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    return [
        {
            id: 1,
            type: "Feature",
            img: require("../assets/img/selectedInfo/基层站点.png"),
            properties: {
                stationName: '基层站点2'
            },
            geometry: {
                type: "Point",
                coordinates:
                    [103.624, 30.556]

            }
        },
        {
            id: 2,
            type: "Feature",
            img: require("../assets/img/selectedInfo/基层站点.png"),
            properties: {
                stationName: '基层站点1'
            },
            geometry: {
                type: "Point",
                coordinates:
                    [103.194, 30.546]

            }
        }
    ]
}