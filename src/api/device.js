// 设备 api

import request from "@/utils/request"
import { getImageUrl } from "@/utils"
/*
 * 设备点位
 * @param {*} data
 * @returns
 */

export function get_device_list(
  data,
  params = {
    pageNumber: 1,
    pageSize: 9999
  }
) {
  return request({
    url: "/front/ePoint/getEPList",
    method: "post",
    data,
    params
  })
}
/*
 * 设备列表
 * @param {*} data
 * @returns
 */

export function get_device_list_item(
  data
) {
  return request({
    url: "/front/edmp/device/list",
    method: "post",
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
    url: "/front/edmp/device/getDetails",
    method: "get",
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
    url: "/front/edmp/device/getDetails/" + id,
    method: "get"
  })
}

/*
 * 大屏获取红外相机信息
 * @param {*}
 * @returns
 */
export function get_infrared_camera() {
  return request({
    url: "/front/edmp/largeScreen/getInfraredCamera",
    method: "get"
  })
}

/*
 * 大屏根据机构ID获取摄像机信息
 * @param {*} params
 * @returns
 */

export function get_vidicon(params) {
  return request({
    url: "/front/edmp/largeScreen/getVidicon",
    method: "get",
    params
  })
}

/*
 * 大屏根据机构id获取抓拍和巡护事件
 * @param {*} params
 * @returns
 */

export function get_event_by_orgId(params) {
  return request({
    url: "/front/edmp/largeScreen/getEventByOrgId",
    method: "get",
    params
  })
}

/*
 * 大屏根据设备编号获取抓拍
 * @param {*} params
 * @returns
 */

export function get_event_by_device_sn(params) {
  return request({
    url: "/front/edmp/largeScreen/getEventByDeviceSn",
    method: "get",
    params
  })
}

/*
 * 通过设备编码获取设备详情
 * @param {*} deviceSn
 * @returns
 */

export function get_device_by_devicesn(params) {
  return request({
    url: "/front/edmp/largeScreen/getEquipmentPointBySn",
    method: "get",
    params
  })
}
/*
 * 获取摄像机直播地址
 * @param {*} deviceSn
 * @returns
 */

export function get_video_list() {
  return request({
    url: "/front/edmp/largeScreen/getLiveVideo",
    method: "get"
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
      coordinates: JSON.parse(detail.geoJson).geometry.coordinates.flat()
    }
  }
}

/*
 * 获取红外相机geojson
 * @param {*} data
 * @returns
 */

export async function get_infrared_camera_geojson(orgId) {
  const params = {}
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
  console.log(geoJson);
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
