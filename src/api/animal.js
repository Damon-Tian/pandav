// 动植物 api
import request from '@/utils/request'
import { getImageUrl } from "@/utils"
/*
 * 设备点位
 * @param {*} data
 * @returns
 */

export function get_bio_list(data) {
    return request({
        url: '/front/edmp/bioPoint/page',
        method: 'post',
        data
    })
}

//获取设备 geojson

/*
 * 获取红外相机geojson
 * @param {*} data
 * @returns
 */

export async function get_bio_geosjon(orgId) {

    const params = {
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const geoJson = []
    const { records } = await get_bio_list(params)
    records.forEach((item) => {
        const json = {
            type: "Feature",
            img: getImageUrl(item.icon),
            properties: {
                ...item
            }, //其中必须包含id字段，用于高亮点钟图标
            geometry: {
                type: "MultiPoint",
                coordinates: JSON.parse(item.geoJson).geometry.coordinates
            }
        }
        geoJson.push(json)
    })
    return geoJson
}
