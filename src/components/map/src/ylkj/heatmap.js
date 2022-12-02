/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-01 15:35:53
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-21 14:55:59
 * @FilePath: \pandav\src\components\map\src\ylkj\heatmap.js
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
export function addHeatMap(map, data) {
    const layerId = data.id ? data.id : uuid();
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
    map.addSource(data.id, {
        'type': 'geojson',
        'data': data.data
    });
    map.addLayer({
        'id': data.id,
        'type': 'heatmap',
        'source': data.id,
        // 'maxzoom': 21,
        'paint': {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', data.magName],
                0, 0, 1, 1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                8, 1,
                20, 9
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                '#718CD4',
                0.4,
                '#41DFE9',
                0.6,
                '#7ED62F',
                0.8,
                '#DDFE02',
                1,
                '#FF0003'
            ],
            "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 8,
                20, 20
            ],
            // Adjust the heatmap radius by zoom level

            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                8, 1,
                20, 1
            ]
        }
    },

    );
}