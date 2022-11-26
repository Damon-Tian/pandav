// 动植物 api
import request from '@/utils/request'

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

