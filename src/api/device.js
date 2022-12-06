
// 设备 api

import request from '@/utils/request'
import { getImageUrl } from "@/utils"
/*
 * 设备点位
 * @param {*} data
 * @returns
 */

export function get_device_list(data, params = {
    pageNumber: 1,
    pageSize: 999
}) {
    return request({
        url: '/front/ePoint/getEPList',
        method: 'post',
        data,
        params
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
 * 通过设备id获取设备详情
 * @param {*} id
 * @returns
 */

export function get_device_by_id(id) {
    return request({
        url: '/front/edmp/device/getDetails/' + id,
        method: 'get'
    })
}

/*
 * 通过设备编码获取设备详情
 * @param {*} deviceSn
 * @returns
 */

export function get_device_by_devicesn(params) {
    return request({
        url: '/front/edmp/largeScreen/getEquipmentPointBySn',
        method: 'get',
        params
    })
}

//获取设备 geojson


export function get_camera_geojson_item(detail) {
    return {
        type: "Feature",
        img: getImageUrl(detail.icon),
        // circle: true,
        properties: {
            ...detail
        }, //其中必须包含id字段，用于高亮点钟图标
        geometry: {
            type: "Point",
            coordinates: JSON.parse(
                detail.geoJson
            ).geometry.coordinates.flat()
        }
    }
}

/*
 * 获取红外相机geojson
 * @param {*} data
 * @returns
 */

export async function get_infrared_camera_geojson(orgId) {
    const params = {
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { rows } = await get_device_list({
        equipmentType: ["infrared_camera"],
        ...params
    })
    const geoJson = []
    rows.forEach((item) => {
        const json = get_camera_geojson_item(item)
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
        equipmentType: ["video_camera"],
        ...params
    })
    const geoJson = []
    rows.forEach((item) => {
        const json = get_camera_geojson_item(item)
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
        equipmentType: ["ecological_equipment"],
        ...params
    })
    const geoJson = []
    rows.forEach((item) => {
        const json = get_camera_geojson_item(item)
        geoJson.push(json)
    })
    return geoJson
}
