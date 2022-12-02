/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-01 18:23:59
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-03 11:07:17
 * @FilePath: \pandav\src\components\map\src\ylkj\fly.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    bbox,
    point,
    buffer,
    circle
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
export function flyTo(map, option) {

    map.flyTo({ ...option, curve: 1, duration: 2000 })
}
export function getView(map) {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const pitch = map.getPitch();
    const bearing = map.getBearing();
    return {
        center: [center.lng, center.lat],
        zoom,
        pitch,
        bearing,
        duration: 12000,
        essential: true
    }
}
export function setCircle(center) {
    var point1 = point(center);
    return buffer(point1, 0.2, { units: 'kilometers' });
}