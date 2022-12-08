// 样线 api

import request from "@/utils/request"

/**
 * 巡护样线列表
 * @param {*} data
 * @returns
 */

export function get_line(data, params) {
  return request({
    url: "/front/edmp/transect/getTransList",
    method: "post",
    data,
    params
  })
}

/**
 * 大屏获取四个区域巡护统计信息
 * @param {*} data
 * @returns
 */

export function get_patrol_info(data) {
  return request({
    url: "/front/edmp/largeScreen/getPatrolInfo",
    method: "post",
    data
  })
}

/*
 * 大屏通过机构和巡护方式获取巡护记录
 * @param {*} data
 * @returns
 */

export function get_patrol_by_orgid(data) {
  return request({
    url: "/front/edmp/largeScreen/getPatrolList",
    method: "post",
    data
  })
}

/*
 * 巡护路线列表十条
 * @param {*} data
 * @returns
 */

export function get_patrol_list(params) {
  return request({
    url: "/front/patrol/page",
    method: "get",
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
    url: "/front/patrol/detail",
    method: "get",
    params
  })
}
/*
 * 巡护事件
 * @param {*} data
 * @returns
 */

export function get_report_detail(params) {
  return request({
    url: "/front/report/detail",
    method: "get",
    params
  })
}
/*
 * 巡护事件查询巡护记录
 * @param {*} data
 * @returns
 */

export function get_patrol_by_report(params) {
  return request({
    url: "/front/edmp/largeScreen/getPatrolInfoByReportNum",
    method: "get",
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

export async function get_patrol_detail_geojson(orgId, query = {}) {
  const params = {}
  if (orgId) {
    params.orgIds = [orgId]
  }
  const { records } = await get_patrol_list({
    pageNum: 1,
    pageSize: 10,
    ...query
  })
  const requsets = []
  records.forEach((item) => {
    requsets.push(get_patrol_detail({ id: item.patrolId }))
  })
  const data = await Promise.allSettled(requsets)
  const geoJson = []
  data.forEach((detail) => {
    if (detail.status == "fulfilled") {
      const json = get_patrol_detail_geojson_item(detail.value)
      geoJson.push(json)
    }
  })
  return geoJson
}
//获取单条巡护记录的geojson
export function get_patrol_detail_geojson_item(detail) {
  return {
    type: "Feature",
    start: "startTime",
    end: "endTime",
    properties: {
      color: "#62f709",
      ...detail
    },
    geometry: {
      type: "LineString",
      coordinates: detail.pointList.map((item) => [
        Number(item.lon),
        Number(item.lat)
      ])
    }
  }
}
