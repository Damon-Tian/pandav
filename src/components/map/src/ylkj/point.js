/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-01 18:19:37
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-16 11:23:29
 * @FilePath: \pandav\src\components\map\src\ylkj\point.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {
    createMarker
} = window.egis;
let markerObj = {}
let layerId
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
        </div>`
    el.innerHTML = iconel;
    el.addEventListener('click', () => {
        data.calback ? data.calback(data.properties) : null;
    })
    return el
};
export function addImgIcon(map, option = {
    imgUrl: "",
    id: "points",
    pointArray: {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: [{
                id: 1,
                type: "Feature",
                properties: {}, //其中必须包含id字段，用于高亮点钟图标
                geometry: {
                    type: "Point",

                    coordinates: [109.679943564, 35.559617265]
                }
            }]
        }
    }
}) {

    layerId = option.id ? option.id : 'points'
    markerObj[layerId] = []
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
        map.removeSource(layerId)
    }
    if (option.tip) {
        const center = option.pointArray.features[parseInt(option.pointArray.features.length / 2)].geometry.coordinates.slice(0, 2)
        const idmarker = createMarker(center, {
            element: setConfig({
                text: option.tip
            }),
            anchor: 'center',
            // offset: [0, -30],
        })
        markerObj[layerId].push(idmarker)
    }
    map.loadImage(option.imgUrl, (error, image) => {
        if (error) throw error;
        if (!map.hasImage(layerId)) {
            map.addImage(layerId, image);
        }
        map.addSource(layerId, {
            'type': 'geojson',
            'data': option.pointArray
        });
        const style = Object.assign({
            'icon-image': layerId, // reference the image
            "icon-anchor": "bottom",
            'icon-size': 1,
            "text-size": 14
        }, option.textName ? {
            "text-field": ['get', option.textName],
            "text-padding": 10,
            "text-offset": [0, -4],
            "text-anchor": 'bottom',
            "text-font": ["Microsoft YaHei UI Semibold Regular"],
            'text-allow-overlap': true
        } : {})
        map.addLayer({
            'id': layerId,
            'type': 'symbol',
            'source': layerId, // reference the data source
            'layout': style,
            "paint": {
                'text-color': [
                    'case',
                    ['boolean', ['feature-state', 'click'], false],
                    '#23d9fb',
                    option.color ? option.color : "#000"
                ]
                // "text-halo-color": "rgba(0,0,0,0.5)",
                // "text-halo-width": 2,
                // "text-opacity": 0.8
            }
        })
    })
}

export function removeMarker() {
    if (Array.isArray(markerObj[layerId])) {
        markerObj[layerId].forEach(item => {
            item.remove()
        })
    } else {
        markerObj[layerId] && markerObj[layerId].remove()
    }
}