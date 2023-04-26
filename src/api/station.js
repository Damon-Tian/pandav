// 基层站点 api

import request from "@/utils/request"
const stationImg = require("../assets/img/selectedInfo/station.png")
/**
 * 基层站点列表
 * @param {*} params
 * @returns
 */

export function get_station_list(params) {
  return request({
    url: "/front/org",
    method: "get",
    params
  })
}
/**
 * 获取机构
 * @param {*} params
 * @returns
 */

export function get_org(params) {
  return request({
    url: "/front/org/page",
    method: "get",
    params
  })
}

/**
 * 大屏获取四个区域人员信息
 * @param {*} params
 * @returns
 */

export function get_person_info(params) {
  return request({
    url: "/front/edmp/largeScreen/getPersonInfo",
    method: "get",
    params
  })
}
export async function get_station_geojson(orgId) {
  const params = {
    pageNumber: 1,
    pageSize: 999
  }
  if (orgId) {
    params.orgId = orgId
  }
  const { records } = await get_station_list(params)
  const geoJson = []
  records
    .filter((item) => item.lot && item.lat)
    .forEach((item) => {
      let geo = {
        type: "Polygon",
        coordinates: [[Number(item.lot), Number(item.lat)]]
      }
      if (item.protectMap) {
        geo = JSON.parse(item.protectMap).geometry
      }
      const json = {
        id: item.id,
        type: "Feature",
        img: stationImg,
        textName: "name",
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
  geoJson[0].properties.lineColor = "#0B9FFB"
  geoJson[0].properties.fillColor = "rgba(11,159,251,0.4)"
  return geoJson
}
