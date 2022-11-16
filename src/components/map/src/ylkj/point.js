/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-01 18:19:37
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-16 11:23:29
 * @FilePath: \pandav\src\components\map\src\ylkj\point.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    fontSize
} from "./util.js"
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
    let layerId = option.id ? option.id : 'points'
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
        map.removeSource(layerId)
    }
    // let features=[];
    // if(option.pointArray && option.pointArray.length>0){
    //     for (const item of option.pointArray) {
    //         features.push(
    //             {
    //             'id':item.id,
    //             'type': 'Feature',
    //             "properties":item, //其中必须包含id字段，用于高亮点钟图标
    //             'geometry': {
    //                  'type': 'Point',

    //                 'coordinates':item.point
    //                 }
    //             })
    //     }
    // }

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
            "text-offset": [0, -2],
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
                "text-color": option.color ? option.color : "#000",
                // "text-halo-color": "rgba(0,0,0,0.5)",
                // "text-halo-width": 2,
                // "text-opacity": 0.8
            }
        });


    })


}