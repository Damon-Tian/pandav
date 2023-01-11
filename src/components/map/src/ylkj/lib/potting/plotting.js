/*
 * @Author: your name
 * @Date: 2021-09-03 10:52:50
 * @LastEditTime: 2022-11-09 14:39:14
 * @LastEditors: night-white-up 1030884759@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \mapbox\src\page\plotting.js
 */
import * as turf from '../truf'
export default class Plotting {
    constructor(map) {
        this.map = map;
        this.flag = null;
        this.execute = true; //判断是否执行
        // this.flag='point';
        this.initMapClick();
        this.callback = null;
        this.pointStyle = null;
        this.firstStart = 0;
        this.linepointArray = []; //绘线的点位数组
        this.createLinelayer = [];
        this.josnPoint = {
            'type': 'FeatureCollection',
            'features': []
        }; //绘面时的json 
        this.jsonLine = {
            'type': 'FeatureCollection',
            'features': []
        }
        this.areaPoint = []; //绘面时大小
        this.aerejson = null; //绘面时的json数据
        this.drawCircleCenter = null; //中心点
        this.circleJson = null; //绘圆保存的json
    }
    /**
     * @Descripttion:初始化地图点击事件
     * @Author: 陈杰
     * @Date: 2021-09-03 11:11:58
     * @LastEditors: 
     * @param {*}
     * @return {*}
     */
    initMapClick() {
        this.map.on('click', (e) => {
            if (this.flag) {
                this.disabled(true)
                let coordinate = [e.lngLat.lng, e.lngLat.lat];
                if (this.flag === 'point' && this.execute) {
                    if (this.map.getLayer('plotting-point')) {
                        this.map.removeLayer('plotting-point');
                        this.map.removeSource('plotting-point')
                    }
                    var point = turf.point([e.lngLat.lng, e.lngLat.lat]);
                    this.callback ? this.callback(point) : null;
                    this.createPoint(point); //创建点
                } else if (this.flag === 'line') {
                    if (this.execute) {
                        this.ceateLine(coordinate);
                    } else {

                        this.execute = true;
                        this.firstStart = 0;
                        this.clear(); //清除之前的
                        this.ceateLine(coordinate);

                    }

                } else if (this.flag === 'ploygn') {
                    if (this.execute) {
                        let _this = this;
                        let coords = [e.lngLat.lng, e.lngLat.lat];
                        this.areaPoint.push(coords); //保存绘面的坐标点
                        if (this.josnPoint.features.length) {
                            let prev = this.josnPoint.features[_this.josnPoint.features.length - 1];
                            this.jsonLine.features.push({
                                type: 'Feature',
                                geometry: {
                                    type: 'LineString',
                                    coordinates: [prev.geometry.coordinates, coords]
                                }
                            });
                        }
                        this.josnPoint.features.push({
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: coords
                            }
                        });

                        this.ceateArea(e)

                    } else {
                        let features = this.map.queryRenderedFeatures(e.point);
                        if (features.length > 0 && features[0].source === 'line-area-plotploygn') {
                            this.execute = true;
                        } else {
                            this.execute = true;
                            this.clearArea()

                        }




                    }

                } else if (this.flag === 'cirecle') {
                    let _this = this;
                    let coords = [e.lngLat.lng, e.lngLat.lat];
                    if (this.execute) {
                        this.drawCircleCenter = coords;
                    } else {
                        let features = this.map.queryRenderedFeatures(e.point);
                        if (features.length > 0 && features[0].source === "circlecirecle") {
                            this.execute = true;
                        } else {
                            this.clearCirecle() //清除圆
                            this.drawCircleCenter = coords;
                            this.execute = true;

                        }
                    }



                }
            }


        });
        //监听右键
        this.map.on('contextmenu', () => {
            this.execute = false;
            if (this.flag === 'line' && this.linepointArray.length > 0) {
                let linestring = turf.lineString(this.linepointArray);
                this.callback ? this.callback(linestring) : null
                for (const item of this.createLinelayer) {
                    if (this.map.getLayer(item)) {
                        this.map.removeLayer(item);
                        this.map.removeSource(item)
                    }
                }
                this.createFillline(linestring)

            } else if (this.flag === 'ploygn') {
                this.callback ? this.callback(this.aerejson) : null
            } else if (this.flag === 'cirecle') {
                this.callback ? this.callback(this.circleJson) : null
            }
            if (this.flag) {
                this.flag = null; //去除点线面
                this.disabled(false); //右键结束后恢复拖动
            }


        })
        //监听鼠标移动
        this.map.on('mousemove', e => {
            let _this = this;

            if (this.flag === 'ploygn' && this.execute && this.map.getSource('line-area-plot' + _this.flag)) {
                let coords = [e.lngLat.lng, e.lngLat.lat];
                let len = this.josnPoint.features.length;
                if (len === 0) {
                    //ele.innerHTML = '点击地图开始测量';
                } else if (len === 1) {
                    //ele.innerHTML = '点击地图继续绘制';
                } else {
                    // 获取面数据
                    let pts = this.areaPoint.concat([coords]);
                    pts = pts.concat([_this.areaPoint[0]]);
                    let json = {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [pts]
                        }
                    };
                    this.aerejson = json;
                    this.map.getSource('line-area-plot' + _this.flag).setData(json)

                }


            } else if (this.flag === 'cirecle' && this.execute) {
                // this.drawCircleCenter
                if (_this.drawCircleCenter) {
                    let from = turf.point(_this.drawCircleCenter)
                    let to = turf.point([e.lngLat.lng, e.lngLat.lat]);
                    let options = {
                        units: 'miles'
                    };
                    let distance = turf.distance(from, to, options);
                    let geojson = turf.circle(_this.drawCircleCenter, distance);
                    this.circleJson = geojson; //保存绘圆的json
                    this.createCirecle(geojson)

                }

            }






        })

    }
    /**
     * @Descripttion: 地图禁止操作
     * @Author: 陈杰
     * @Date: 2021-09-03 18:20:50
     * @LastEditors: 
     * @param {*} flag
     * @return {*}
     */
    disabled(flag) {
        if (flag) {
            this.map.doubleClickZoom.disable();
            this.map.dragPan.disable();
            this.map.scrollZoom.disable()

        } else {
            this.map.doubleClickZoom.enable();
            this.map.dragPan.enable();
            this.map.scrollZoom.enable()
        }
    }
    createPoint(point) {
        let {
            pointStyle
        } = this;
        this.map.addSource('plotting-point', {
            type: 'geojson',
            data: point
        })
        this.map.addLayer({
            id: 'plotting-point',
            type: 'circle',
            source: 'plotting-point',
            paint: {
                'circle-color': pointStyle ? pointStyle.circleColor : '#ffffff',
                'circle-radius': pointStyle ? pointStyle.circleRadius : 5,
                'circle-stroke-width': pointStyle ? pointStyle.circleStrokeWidth : 5,
                'circle-stroke-color': pointStyle ? pointStyle.circleStrokeColor : '#5388e1'
            }
        })

    }
    clearPoint() {
        if (this.map.getLayer('plotting-point')) {
            this.map.removeLayer('plotting-point');
            this.map.removeSource('plotting-point')
        }
    }
    /**
     * @Descripttion:创建线
     * @Author: 陈杰
     * @Date: 2021-09-03 16:41:19
     * @LastEditors: 
     * @param {*}
     * @return {*}
     */
    ceateLine(coordinate) {
        this.linepointArray.push(coordinate)
        let self = this;

        function createPoint() {
            let pointjson = turf.point(coordinate);
            self.map.addSource('points-plotline' + self.firstStart, {
                type: 'geojson',
                data: pointjson
            })
            self.map.addLayer({
                id: 'points-plotline' + self.firstStart,
                type: 'circle',
                source: 'points-plotline' + self.firstStart,
                paint: {
                    'circle-color': '#5388e1',
                    'circle-radius': 2,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#5388e1'
                }
            })
        }
        if (!this.firstStart) { //判断是否是第一点击
            createPoint(); //创建点
            this.createLinelayer.push(('points-plotline' + self.firstStart))
        } else {
            let prev = this.linepointArray[this.linepointArray.length - 2];
            createPoint(); //创建点
            let jsonLine = turf.lineString([prev, coordinate]);
            let obj = 'line-move-plotline' + this.firstStart;
            this.map.addSource(obj, {
                type: 'geojson',
                data: jsonLine
            })
            this.map.addLayer({
                id: obj,
                type: 'line',
                source: obj,
                paint: {
                    'line-color': '#5388e1',
                    'line-width': 4,
                    // 'line-opacity': 0.65
                }
            })
        }
        this.firstStart++;
        this.createLinelayer.push(('points-plotline' + self.firstStart))
        this.createLinelayer.push(('line-move-plotline' + this.firstStart))
    }
    /**
     * @Descripttion:创建线条
     * @Author: 陈杰
     * @Date: 2021-09-04 08:50:00
     * @LastEditors: 
     * @param {*} jsonLine
     * @return {*}
     */
    createFillline(jsonLine) {
        let obj = 'line-move-plotline';
        this.map.addSource(obj, {
            type: 'geojson',
            data: jsonLine
        })
        this.map.addLayer({
            id: obj,
            type: 'line',
            source: obj,
            paint: {
                'line-color': '#5388e1',
                'line-width': 4,
                // 'line-opacity': 0.65
            }
        })



    }
    /**
     * @Descripttion:清除点
     * @Author: 陈杰
     * @Date: 2021-09-03 15:47:41
     * @LastEditors: 
     * @param {*}
     * @return {*}
     */
    clear() {
        this.disabled(false); //清除时允许操作

        if (this.map.getLayer('plotting-point')) {
            this.map.removeLayer('plotting-point');
            this.map.removeSource('plotting-point');
            this.execute = false; //切换时将动作置于可以
        }
        this.firstStart = 0;
        this.linepointArray = [];
        if (this.map.getLayer('line-move-plotline')) {
            this.map.removeLayer('line-move-plotline');
            this.map.removeSource('line-move-plotline')
        }
        if (this.createLinelayer.length > 0) {
            for (const item of this.createLinelayer) {
                if (this.map.getLayer(item)) {
                    this.map.removeLayer(item);
                    this.map.removeSource(item)
                }
            }
        }
        this.clearArea(); //清除绘圆
        this.clearCirecle(); //清除绘圆


    }
    /**
     * @Descripttion: 改变标绘的方式
     * @Author: 陈杰
     * @Date: 2021-09-03 11:12:42
     * @LastEditors: point点
     * @param {*}
     * @return {*}
     */
    on(type, callback, pointStyle) {
        this.flag = type;
        this.pointStyle = null;
        this.clear(); //清除地图标绘的所有
        // if(!type){
        //     this.clear();//清除地图标绘的所有
        // }
        this.execute = true
        this.map.getCanvas().style.cursor = 'crosshair'
        if (type == 'point') {
            pointStyle ? this.pointStyle = pointStyle : null;
        } else {

            this.disabled(true); //如果不是标点则禁止操作
        }
        if (this.callback) {
            this.callback = null;
        }
        this.callback = callback;
    }
    /**
     * @Descripttion: 绘面
     * @Author: 陈杰
     * @Date: 2021-09-04 09:57:14
     * @LastEditors: 
     * @param {*}
     * @return {*}
     */
    ceateArea(e) {
        let _this = this;
        let source = _this.map.getSource('points-area-plot' + _this.flag);
        if (source) {
            this.map.getSource('points-area-plot' + _this.flag).setData(_this.josnPoint)

            this.map.getSource('line-area-plot' + _this.flag).setData(_this.jsonLine);
            this.map.getSource('line-area-plot' + _this.flag).setData(_this.aerejson);

        } else {
            this.map.addSource('points-area-plot' + _this.flag, {
                type: 'geojson',
                data: _this.josnPoint
            })

            this.map.addSource('line-area-plot' + _this.flag, {
                type: 'geojson',
                data: _this.jsonLine
            })
            this.map.addLayer({
                id: 'points-area-plot' + _this.flag,
                type: 'circle',
                source: 'points-area-plot' + _this.flag,
                paint: {
                    'circle-color': '#ffffff',
                    'circle-radius': 3,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#5388e1'
                }
            })
            this.map.addLayer({
                id: 'line-area-plot' + _this.flag,
                type: 'fill',
                source: 'line-area-plot' + _this.flag,
                paint: {
                    'fill-color': '#5388e1',
                    'fill-opacity': 0.5
                }
            });
            this.map.addLayer({
                id: 'line-area-stroke-plot' + _this.flag,
                type: 'line',
                source: 'line-area-plot' + _this.flag,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#5388e1',
                    'line-width': 2,
                    'line-opacity': 0.65
                }
            });

        }




    }
    /**
     * @Descripttion: 清除绘面的
     * @Author: 陈杰
     * @Date: 2021-09-04 12:09:10
     * @LastEditors: 
     * @param {*}
     * @return {*}
     */
    clearArea() {
        let _this = this;
        if (this.map.getLayer('line-area-plot' + 'ploygn')) {
            this.map.removeLayer('line-area-stroke-plot' + 'ploygn')
            this.map.removeLayer('line-area-plot' + 'ploygn')
            this.map.removeLayer('points-area-plot' + 'ploygn')
            this.map.removeSource('points-area-plot' + 'ploygn')
            this.map.removeSource('line-area-plot' + 'ploygn')

        }
        this.aerejson = null;
        this.josnPoint = {
            'type': 'FeatureCollection',
            'features': []
        }; //绘面时的json 
        this.jsonLine = {
            'type': 'FeatureCollection',
            'features': []
        }
        this.areaPoint = []; //绘面时大小
        this.aerejson = null; //绘面时的json数据
    }
    /**
     * @Descripttion:创建圆 
     * @Author: 陈杰
     * @Date: 2021-09-05 00:36:02
     * @LastEditors: 
     * @param {*}
     * @return {*}
     */
    createCirecle(json) {
        let _this = this;
        if (this.map.getLayer('circle' + _this.flag)) {
            this.map.getSource('circle' + _this.flag).setData(json)
        } else {
            this.map.addSource(('circle' + _this.flag), {
                type: 'geojson',
                data: {
                    type: 'Polygon',
                    coordinates: [
                        []
                    ]
                }
            })
            this.map.addLayer({
                id: ('circle' + _this.flag),
                type: 'fill',
                source: ('circle' + _this.flag),
                paint: {
                    'fill-color': '#5388e1', // 填充颜色
                    'fill-opacity': 0.8, // 透明度
                    'fill-outline-color': '#5388e1' // 边缘颜色
                }
            })
        }



    }
    /**
     * @Descripttion:清除圆
     * @Author: 陈杰
     * @Date: 2021-09-05 00:44:25
     * @LastEditors: 
     * @param {*}
     * @return {*}
     */
    clearCirecle() {
        if (this.map.getLayer('circle' + 'cirecle')) {
            this.map.removeLayer('circle' + 'cirecle')
            this.map.removeSource('circle' + 'cirecle')
        }

        this.drawCircleCenter = null;
        this.circleJson = null;
    }













}