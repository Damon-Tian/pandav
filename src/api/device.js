
// 设备 api

import request from '@/utils/request'
import { getImageUrl } from "@/utils"
/*
 * 设备点位
 * @param {*} data
 * @returns
 */

export function get_device_list(data) {
    return request({
        url: '/front/ePoint/getEPList',
        method: 'post',
        data
    })
}
/*
 * 设备点位详情
 * @param {*} params
 * @returns
 */

export function get_device_detail(params) {
    return request({
        url: '/front/edmp/device/getDetails',
        method: 'get',
        params
    })
}
/*
 * 获取设备详情
 * @param {*} id
 * @returns
 */

export function get_device_by_id(id) {
    return request({
        url: '/front/edmp/device/getDetails/' + id,
        method: 'get'
    })
}

//获取设备 geojson

/*
 * 获取红外相机geojson
 * @param {*} data
 * @returns
 */

export async function get_infrared_camera_geojson(orgId) {
    const params = {
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { rows } = await get_device_list({
        equipmentType: ["infrared_camera"]
    })
    const geoJson = []
    rows.forEach((item) => {
        const json = {
            type: "Feature",
            img: getImageUrl(item.icon),
            circle: true,
            properties: {
                ...item
            }, //其中必须包含id字段，用于高亮点钟图标
            geometry: {
                type: "Point",
                coordinates: JSON.parse(
                    item.geoJson
                ).geometry.coordinates.flat()
            }
        }
        geoJson.push(json)
    })
    return geoJson
}
/*
 * 获取摄像机相机geojson
 * @param {*} data
 * @returns
 */

export async function get_video_camera_geojson(orgId) {
    const params = {
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { rows } = await get_device_list({
        equipmentType: ["video_camera"]
    })
    const geoJson = []
    rows.forEach((item) => {
        const json = {
            type: "Feature",
            img: getImageUrl(item.icon),
            properties: {
                ...item
            }, //其中必须包含id字段，用于高亮点钟图标
            geometry: {
                type: "Point",
                coordinates: JSON.parse(
                    item.geoJson
                ).geometry.coordinates.flat()
            }
        }
        geoJson.push(json)
    })
    return geoJson
}

/*
 * 获取生态设备geojson
 * @param {*} data
 * @returns
 */

export async function get_ecological_equipment_geojson(orgId) {
    const params = {
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { rows } = await get_device_list({
        equipmentType: ["ecological_equipment"]
    })
    const geoJson = []
    rows.forEach((item) => {
        const json = {
            type: "Feature",
            img: getImageUrl(item.icon),
            properties: {
                ...item
            }, //其中必须包含id字段，用于高亮点钟图标
            geometry: {
                type: "Point",
                coordinates: JSON.parse(
                    item.geoJson
                ).geometry.coordinates.flat()
            }
        }
        geoJson.push(json)
    })
    return geoJson
}
