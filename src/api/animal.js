// 动植物 api
import request from "@/utils/request"
import { get_camera_geojson_item } from "./device"
/*
 * 设备点位
 * @param {*} data
 * @returns
 */

export function get_bio_list(data) {
  return request({
    url: "/front/edmp/bioPoint/page",
    method: "post",
    data
  })
}

// 获取动植物点位列表(new)
export function get_bio_point_list(data) {
  return request({
    url: "/front/edmp/largeScreen/getBioPointList",
    method: "post",
    data
  })
}

//获取设备 geojson

/*
 * 动植物点位geojson
 * @param {*} data
 * @returns
 */

export function get_bio_geosjon(data) {
  const geoJson = []
  data.forEach((item) => {
    const json = get_camera_geojson_item(item)
    geoJson.push(json)
  })

  return geoJson
}
