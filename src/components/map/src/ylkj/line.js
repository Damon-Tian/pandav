import {
    uuid,
} from "./util.js";
import ARRAOW_ICON from "./lib/returnbtn.png"
export function addLine(map, data, option) {
    const layerId = data.id ? data.id : uuid();
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
        map.getLayer('arrowline') ? map.removeLayer('arrowline') : null;
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
    map.addSource(layerId, {
        'type': 'geojson',
        'data': data.geojson
    });

    map.addLayer({
        'id': layerId,
        'type': 'line',
        'source': layerId,
        'layout': {
            'line-cap': 'round',

        },
        'paint': {
            'line-color': (option && option.lineColor) ? option.lineColor : '#f00',
            'line-width': (option && option.lineWidth) ? option.lineWidth : 2,
            // 'line-color': '#f00',
            // 'line-width': 2,

        }
    })

    option.arrow ? map.loadImage(ARRAOW_ICON, (error, image) => {
        if (!map.hasImage(layerId)) {
            map.addImage(layerId, image);
        }
        map.addLayer({
            'id': 'arrowline',
            'type': 'symbol',
            'source': layerId,
            'layout': {
                'symbol-placement': 'line',
                'symbol-spacing': 50, // 图标间隔，默认为250
                'icon-image': layerId, //箭头图标
                'icon-size': option.arrow.size ? option.arrow.size : 1
            }
        });

    }) : null




}
export function removeline(map, layerId) {
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
        map.getLayer('arrowline') ? map.removeLayer('arrowline') : null;
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
}