/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-01 18:19:53
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-04 10:10:00
 * @FilePath: \pandav\src\components\map\src\ylkj\poygon.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let {
    addSource,
    addLayer,
    getLayer,
    getSource,
    removeLayer,
    removeSource,
} = window.egis;
import {
    uuid,
    isString
} from "./util.js";
import {
    bbox,
    bboxPolygon
} from "./lib/truf.js"

export function addPolygon(map, data) {
    let poygon = data.polygon;
    // console.log('边界', bbox(poygon), bboxPolygon)
    const layerId = data.id ? data.id : uuid();
    if (map.getLayer(layerId)) {
        // map.getLayer((layerId +'outline'))? map.removeLayer((layerId +'outline')):null;
        map.removeLayer(layerId);
        map.removeLayer('outline');
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
    map.addSource(layerId, {
        'type': 'geojson',
        'data': poygon
    });
    map.addLayer({
        'id': layerId,
        'type': 'fill',
        'source': layerId, // reference the data source
        'layout': {},
        'paint': {
            'fill-color': data.fillColor ? data.fillColor : 'rgba(255,44,44,0.4)', // blue color fill
            'fill-opacity': data.opacity ? data.opacity : 0.4
        }
    });
    // Add a black outline around the polygon.
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': layerId,
        'layout': {},
        'paint': {
            'line-color': data.lineColor ? data.lineColor : '#FF2C2C',
            'line-width': data.width ? data.width : 2
        }
    });
}
export function removePlygon(map, layerId) {
    if (map.getLayer(layerId)) {
        // map.getLayer((layerId +'outline'))? map.removeLayer((layerId +'outline')):null;
        map.removeLayer(layerId);
        map.removeLayer('outline');
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
    // map.getLayer('outline') ? map.removeLayer('outline') : null
}