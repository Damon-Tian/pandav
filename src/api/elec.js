// 电子围栏 api

import request from '@/utils/request'
import north from "@/assets/stationdata/north.json"
import sourth from "@/assets/stationdata/sourth.json"
/**
 * 电子围栏列表
 * @param {*} data
 * @returns
 */

export function get_elec(data) {
    return request({
        url: '/front/edmp/elecRail/list',
        method: 'post',
        data
    })
}
/**
 * 获取电子围栏 热力图数据
 * @param {*} data
 * @returns
 */

export function get_elec_heatmap(data) {
    return request({
        url: '/front/edmp/elecRail/heatMap',
        method: 'post',
        data
    })
}
/**
 * 获取电子围栏核心区域 人员轨迹图
 * @param {*} data
 * @returns
 */

export function get_elec_person(data) {
    return request({
        url: '/front/edmp/elecRail/heatMap/personCount',
        method: 'post',
        data
    })
}

/**
 * 热力图人数统计
 * @param {*} params
 * @returns
 */
export function get_electronic_fence_count(params) {
    return request({
        url: "/front/edmp/dataVisualization/getElectronicFenceCount",
        method: "get",
        params
    })
}

/**
 * 获取靶向短信统计数据
 * @param {*} params
 * @returns
 */
export function get_targeted_sms_data(params) {
    return request({
        url: "/front/edmp/dataVisualization/getTargetedSmsData",
        method: "get",
        params
    })
}



// 到处每个接口可拼装好的geojson


/**
 * 获取一般核心区域geojson
 * @param {*} params
 * @returns
 */
export async function get_eleccore_geojson(orgId) {
    const params = {
        isCore: 0,
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { records } = await get_elec(params)
    const geoJson = records.map((item) => JSON.parse(item.geoJson))
    geoJson[0].properties.lineColor = "#f90909"
    geoJson[0].properties.fillColor = "rgba(249,9,9,0.4)"
    return geoJson
}

/**
 * 获取一般保护区区域geojson
 * @param {*} params
 * @returns
 */
export async function get_elec_geojson(orgId) {
    const params = {
        isCore: 1,
        pageNumber: 1,
        pageSize: 999
    }
    if (orgId) {
        params.orgIds = [orgId]
    }
    const { records } = await get_elec(params)
    const geoJson = records.map((item) => JSON.parse(item.geoJson))
    geoJson[0].properties.lineColor = "#0B9FFB"
    geoJson[0].properties.fillColor = "rgba(11,159,251,0.4)"
    return geoJson
}

export function getArea(orgId) {
    let area = []
    if (orgId == 5) {
        //崇州
        area = ['G3', 'C2', 'C3']
    } else if (orgId == 6) {
        //大邑
        area = ['C1', 'G1', 'G2']
    } else if (orgId == 7) {
        //彭州
        area = ['C6', 'G6']
    } else if (orgId == 8) {
        //都江堰
        area = ['C4', 'C5', 'G4', 'G5']
    }

    return area
}

/**
 * 获取热力图geojson
 * @param {*} params
 * @returns
 */
export async function get_elec_heatmap_geojson(orgId, timeRange) {
    const params = {
        areaCodes: []
    }
    if (orgId) {
        // 热力图传参

        params.areaCodes = getArea(orgId)
    }
    if (timeRange) {
        params.queryDate = timeRange
    }
    const geoJson = await get_elec_heatmap(params)
    return geoJson
}
/**
 * 获取核心区域人员 轨迹geojson
 * @param {*} params
 * @returns
 */
export async function get_elec_person_geojson(orgId) {
    const params = {
        areaCodes: []
    }
    if (orgId) {
        params.areaCodes = getArea(orgId)
    }
    return get_elec_person(params)
    // return [
    //     {
    //         "type": "Feature",
    //         "properties": {},
    //         "geometry": {
    //             "type": "LineString",
    //             "coordinates": [
    //                 [
    //                     103.25110238347327,
    //                     30.695561279803982
    //                 ],
    //                 [
    //                     103.2510495300732,
    //                     30.694512366775157
    //                 ],
    //                 [
    //                     103.25105390710007,
    //                     30.694205611585303
    //                 ],
    //                 [
    //                     103.25110213151197,
    //                     30.693797907411764
    //                 ],
    //                 [
    //                     103.25131558370356,
    //                     30.693458271541346
    //                 ],
    //                 [
    //                     103.25137855738478,
    //                     30.693339943249242
    //                 ],
    //                 [
    //                     103.25162654782639,
    //                     30.693110861721152
    //                 ],
    //                 [
    //                     103.25141968224449,
    //                     30.692736485432746
    //                 ],
    //                 [
    //                     103.25135981819705,
    //                     30.692249054441874
    //                 ],
    //                 [
    //                     103.25134086083403,
    //                     30.6919405947759
    //                 ],
    //                 [
    //                     103.25151369526827,
    //                     30.69138605009593
    //                 ],
    //                 [
    //                     103.25156786415641,
    //                     30.691009019858285
    //                 ],
    //                 [
    //                     103.25130815824343,
    //                     30.690523578207646
    //                 ],
    //                 [
    //                     103.25108049323961,
    //                     30.689944376200643
    //                 ],
    //                 [
    //                     103.25100378588155,
    //                     30.689392586584603
    //                 ],
    //                 [
    //                     103.25109899497744,
    //                     30.688858107447416
    //                 ],
    //                 [
    //                     103.25161521879448,
    //                     30.68867943733656
    //                 ],
    //                 [
    //                     103.25203512911776,
    //                     30.687953119571773
    //                 ],
    //                 [
    //                     103.25224224363075,
    //                     30.687593939140896
    //                 ],
    //                 [
    //                     103.25212941399548,
    //                     30.68717479685489
    //                 ],
    //                 [
    //                     103.25175265892739,
    //                     30.686686864215616
    //                 ],
    //                 [
    //                     103.25160285787211,
    //                     30.686495121594803
    //                 ],
    //                 [
    //                     103.25129663301294,
    //                     30.68677117704614
    //                 ],
    //                 [
    //                     103.25099079480106,
    //                     30.686760382690608
    //                 ],
    //                 [
    //                     103.25071135194776,
    //                     30.686178649285353
    //                 ],
    //                 [
    //                     103.2512742679333,
    //                     30.6858500368091
    //                 ],
    //                 [
    //                     103.25182356708092,
    //                     30.68502971640268
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "type": "Feature",
    //         "properties": {},
    //         "geometry": {
    //             "type": "LineString",
    //             "coordinates": [
    //                 [
    //                     103.46395949140759,
    //                     30.843971056093977
    //                 ],
    //                 [
    //                     103.46412442068839,
    //                     30.843867425999747
    //                 ],
    //                 [
    //                     103.46429658538756,
    //                     30.84379974752656
    //                 ],
    //                 [
    //                     103.46443598080049,
    //                     30.84371181079983
    //                 ],
    //                 [
    //                     103.46442220580326,
    //                     30.843498199304804
    //                 ],
    //                 [
    //                     103.46437185846924,
    //                     30.84341095531154
    //                 ],
    //                 [
    //                     103.46458383514005,
    //                     30.843055904008253
    //                 ],
    //                 [
    //                     103.46463397444808,
    //                     30.842884627037094
    //                 ],
    //                 [
    //                     103.46496893435585,
    //                     30.842911426665907
    //                 ],
    //                 [
    //                     103.4652762127941,
    //                     30.84292700865926
    //                 ],
    //                 [
    //                     103.46564206999722,
    //                     30.84294799754572
    //                 ],
    //                 [
    //                     103.46584741429035,
    //                     30.843006567797218
    //                 ],
    //                 [
    //                     103.46637044580302,
    //                     30.84318317270639
    //                 ],
    //                 [
    //                     103.4665982375451,
    //                     30.843171702159893
    //                 ],
    //                 [
    //                     103.46664567793448,
    //                     30.843018518954793
    //                 ],
    //                 [
    //                     103.46688651952849,
    //                     30.843136367102602
    //                 ],
    //                 [
    //                     103.46714072991006,
    //                     30.843321964725476
    //                 ],
    //                 [
    //                     103.4673690805214,
    //                     30.84357769034854
    //                 ],
    //                 [
    //                     103.46751079253448,
    //                     30.843924609438133
    //                 ]
    //             ]
    //         }
    //     }
    // ]
}

export async function get_elec_area_geojson() {
    const geoJson = north.features.concat(sourth.features)
    geoJson[0].properties.lineColor = "#F7C10E"
    geoJson[0].properties.fillColor = "rgba(247,193,14,0.4)"
    return geoJson
}

