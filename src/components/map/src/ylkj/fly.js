/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-01 18:23:59
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-03 11:07:17
 * @FilePath: \pandav\src\components\map\src\ylkj\fly.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    bbox
} from "./lib/truf.js"
export function flyBounds(map, geojson) {
    let bounds = bbox(geojson)
    map.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
    ], {
        padding: {
            top: 10,
            bottom: 25,
            left: 15,
            right: 5
        }
    });
}
/**
 * @Descripttion: 
 * @Author:
 * @Date: 2022-11-03 11:02:54
 * @LastEditors: 
 * @param {*} map
 * @param {*} option={
                center: [74.5, 40],
                zoom: 2
                center: [8.11862, 46.58842],
                zoom: 12.5,
                bearing: 130,
                pitch: 75
                }
 * @return {*}
 */
export function flyTo(map, option={bearing: 9.600000000000023,
    center: [103.58806946916616, 30.630077549993786],
    duration: 12000,
    essential: true,
    pitch: 73.99999999999997,
    zoom: 16.001771985334283}) {
    let target = Object.assign({
        center: [104.5, 30],
        zoom: 8,
        bearing: 130,
        pitch: 75
    }, option)
    map.flyTo(target)
}
export function getView(map) {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const pitch = map.getPitch();
    const bearing = map.getBearing();
    return {
        center:[center.lng,center.lat],
        zoom,
        pitch,
        bearing,
        duration: 12000,
        essential: true
    }
}