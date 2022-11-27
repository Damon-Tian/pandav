// 地图弹窗 api

import request from "@/utils/request"

/**
 * 根据id查询生物详情
 * @param {*} params
 * @returns
 */
export function biodiversity_details(params) {
  return request({
    url: "/front/biodiversity/details",
    method: "get",
    params
  })
}

/**
 * 机构查询
 * @param {*} params
 * @returns
 */
export function get_org(params) {
  return request({
    url: "/front/org",
    method: "get",
    params
  })
}

/**
 * 获取手持终端列表
 * @param {*} data
 * @returns
 */
export function get_device_list(data) {
  return request({
    url: "/front/edmp/device/list",
    method: "post",
    data
  })
}
