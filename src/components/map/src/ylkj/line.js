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
import DEFAULT_ICON from "@/assets/img/3701669967141_.pic.jpg";
import EVENT_ICON from "@/assets/img/3711669967141_.pic.jpg";
const {
    createMarker
} = window.egis;
let markerObj = {}
const setConfig = (data) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.display = 'flex';
    let text = ''
    if (data.text) {
        text = `<div style=" white-space:nowrap;padding:5px 10px;fontSize:14px;color:#fff;background:rgba(0,0,0,0.6);margin-bottom:10px">${data.text ? data.text : ''}</div>`
    }
    const iconel = `<div style="margin-top:-72px;display:flex;flex-direction:column;align-items:center;">
        ${text}
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
    markerObj[layerId] = [];
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
    //样线名称点位
    if (data.textName || data.start || data.end) {
        try {
            data.geojson.features.forEach(item => {
                let start = [];
                let end = [];
                if (item.geometry.type == "MultiLineString") {
                    start = item.geometry.coordinates[0][0]
                    end = item.geometry.coordinates[0][item.geometry.coordinates.length - 1]
                } else {
                    start = item.geometry.coordinates[0]
                    end = item.geometry.coordinates[item.geometry.coordinates.length - 1]
                }
                if (data.textName) {
                    const idmarker = createMarker(start, {
                        element: setConfig({
                            icon: data.icon ? data.icon : DEFAULT_ICON,
                            text: item.properties ? item.properties[data.textName] : '',
                            properties: item.properties
                        }),
                        anchor: 'center',
                        // offset: [0, -30],
                    })
                    markerObj[layerId].push(idmarker)
                }

                if (data.start) {
                    const idmarker = createMarker(start, {
                        element: setConfig({
                            icon: data.icon ? data.icon : DEFAULT_ICON,
                            text: item.properties ? '开始时间：' + item.properties[data.start] : '',
                            properties: item.properties
                        }),
                        anchor: 'center',
                        // offset: [0, -30],
                    })
                    markerObj[layerId].push(idmarker)
                }
                if (data.end && start.toString() !== end.toString()) {
                    const idmarker = createMarker(end, {
                        element: setConfig({
                            icon: data.icon ? data.icon : DEFAULT_ICON,
                            text: item.properties ? item.properties[data.end] ? '结束时间：' + item.properties[data.end] : '巡护中' : '',
                            properties: item.properties
                        }),
                        anchor: 'center',
                    })
                    markerObj[layerId].push(idmarker)
                }
                // 巡护中的事件 业务场景
                if (Array.isArray(item.properties?.reportDTOList)) {
                    item.properties.reportDTOList.forEach(event => {
                        const point = [Number(event.longitude), Number(event.latitude)]
                        const idmarker = createMarker(point, {
                            element: setConfig({
                                icon: EVENT_ICON,
                                text: event.typeName + "事件",
                                properties: event,
                                calback: data.calback
                            }),
                            anchor: 'center',
                        })
                        markerObj[layerId].push(idmarker)
                    })
                }

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
    console.log(layerId);
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
        map.getLayer('arrowline') ? map.removeLayer('arrowline') : null;
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
    if (Array.isArray(markerObj[layerId])) {
        markerObj[layerId].forEach(item => {
            item.remove()
        })
    } else {
        markerObj[layerId].remove()
    }
    // Array.isArray(markerObj[layerId])? markerObj[layerId].remove() : markerObj[layerId].remove();
}