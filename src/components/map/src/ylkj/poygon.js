/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-01 18:19:53
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-14 10:31:17
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
    createMarker,
} = window.egis;
import features from "core-js/features/index.js";
import {
    uuid,
    isString
} from "./util.js";
import {
    centerOfMass
} from "./lib/truf.js";
import DEFAULT_ICON from "./lib/RESOURCE.png";
let markerObj = {}
export function addPolygon(map, data) {
    let poygon = data.polygon;
    // console.log('边界', bbox(poygon), bboxPolygon)
    const layerId = data.id ? data.id : uuid();
    if (map.getLayer(layerId)) {
        // map.getLayer((layerId +'outline'))? map.removeLayer((layerId +'outline')):null;
        map.removeLayer(layerId);
        map.removeLayer((layerId + 'outline'));
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
    const setConfig = (data = {
        icon: DEFAULT_ICON,
        text: '巡护点B',
        calback: function () {}
    }) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.display = 'flex';
        const iconel = `<div style="margin-top:-72px;display:flex;flex-direction:column;align-items:center;">
            <div style=" white-space:nowrap;padding:5px 10px;fontSize:14px;color:#fff;background:rgba(0,0,0,0.6);margin-bottom:10px">${data.text?data.text:''}</div>
            <image src="${data.icon?data.icon:DEFAULT_ICON}" style="width:20px;height:24px;"/>
            </div>`
        el.innerHTML = iconel;
        el.addEventListener('click', () => {
            data.calback ? data.calback(data.properties) : null;
        })

        return el


    };
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
        'id': (layerId + 'outline'),
        'type': 'line',
        'source': layerId,
        'layout': {},
        'paint': {
            'line-color': data.lineColor ? data.lineColor : '#FF2C2C',
            'line-width': data.width ? data.width : 2
        }
    });
    if (data.textName) {
        markerObj[layerId] = []
        poygon.features.forEach(item => {
            const center = centerOfMass(item).geometry.coordinates;
            try {
                console.log('面积', center, poygon)
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
            } catch (error) {
                console.error(error)
            }

        });

    }




}
export function removePlygon(map, layerId) {
    if (map.getLayer(layerId)) {
        // map.getLayer((layerId +'outline'))? map.removeLayer((layerId +'outline')):null;
        map.removeLayer(layerId);
        map.removeLayer((layerId + 'outline'));
        map.getSource(layerId) ? map.removeSource(layerId) : null
    }
    if (Array.isArray(markerObj[layerId])) {
        markerObj[layerId].forEach(item => item.remove())
    } else if (markerObj[layerId]) {
        markerObj[layerId].remove()
    }
}