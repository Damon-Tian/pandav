/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-04 16:53:51
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-13 14:04:52
 * @FilePath: \pandav\src\components\map\src\ylkj\line.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    uuid,
} from "./util.js";
import ARRAOW_ICON from "./lib/returnbtn.png";
import DEFAULT_ICON from "./lib/RESOURCE.png";
const {
    createMarker
} = window.egis;
let markerObj = {}
const setConfig = (data = {
    icon: DEFAULT_ICON,
    text: '巡护点B',
    calback: function () { }
}) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.display = 'flex';
    const iconel = `<div style="margin-top:-72px;display:flex;flex-direction:column;align-items:center;">
        <div style=" white-space:nowrap;padding:5px 10px;fontSize:14px;color:#fff;background:rgba(0,0,0,0.6);margin-bottom:10px">${data.text ? data.text : ''}</div>
        <image src="${data.icon ? data.icon : DEFAULT_ICON}" style="width:20px;height:24px;"/>
        </div>`
    el.innerHTML = iconel;
    el.addEventListener('click', () => {
        data.calback ? data.calback(data.properties) : null;
    })

    return el


};
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
            'line-opacity': (option && option.opacity) ? option.opacity : 1,
            // 'line-color': '#f00',
            // 'line-width': 2,

        }
    })
    // [103.432937,30.878296]
    if (data.textName) {
        try {
            let point = [];
            if (data.geojson.features[0].geometry.type == "LineString") {
                point = data.geojson.features[0].geometry.coordinates[0]
            } else {
                point = data.geojson.features[0].geometry.coordinates[0][0]
            }
            // let point=data.geojson.features[0].geometry.coordinates
            markerObj[layerId] = [];
            data.geojson.features.forEach(item => {
                let center = [];
                if (item.geometry.type == "MultiLineString") {
                    center = item.geometry.coordinates[0][0]
                } else {
                    center = item.geometry.coordinates[0]
                }
                const idmarker = createMarker(center, {
                    element: setConfig({
                        icon: data.icon ? data.icon : DEFAULT_ICON,
                        text: item.properties ? item.properties[data.textName] : '',
                        properties: item.properties,
                        calback: data.calback
                    }),
                    anchor: 'center',
                    // offset: [0, -30],
                })
                markerObj[layerId].push(idmarker)

            });
        } catch (error) {
            console.error(error)
        }
    }


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
    else if (Array.isArray(markerObj[layerId])) {
        markerObj[layerId].forEach(item => {
            item.remove()
        })
    } else {
        markerObj[layerId].remove()
    }
    // Array.isArray(markerObj[layerId])? markerObj[layerId].remove() : markerObj[layerId].remove();
}