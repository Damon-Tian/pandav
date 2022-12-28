/* 地图方法 根据type 添加图层 删除图层 

    type 1:点 2:线 3:面,4:热力图
    id 图层id 
    geoData geoJson格式数据

*/
export default {
    data() {
        return {
            hrefs: [
                {
                    name: "综合概况",
                    id: "chengdu",
                    url: "/map/xiongmao/ArcGis/_alllayers/{z}/{y}/{x}.png",
                    view: {
                        center: [103.3440669299489, 30.675952923426294],
                        zoom: 10.019816714374489,
                        pitch: 58.69748625766818,
                        bearing: 0,
                        essential: true
                    }
                },
                {
                    name: "崇州站",
                    id: "chongzhou",
                    url: "/map/xiongmao_fq/chongzhou/ArcGis/_alllayers/{z}/{y}/{x}.png",
                    view: {
                        bearing: 0,
                        center: [103.45711202800089, 30.522769602585484],
                        essential: true,
                        pitch: 53.51769981743894,
                        zoom: 10.310552966704606
                    }
                },
                {
                    name: "大邑站",
                    id: "dayi",
                    url: "/map/xiongmao_fq/dayi/ArcGis/_alllayers/{z}/{y}/{x}.png",
                    view: {
                        bearing: 0,
                        center: [103.42625254689449, 30.492047976346925],
                        essential: true,
                        pitch: 53.51769095010108,
                        zoom: 10.531624037345626
                    }
                },
                {
                    name: "彭州站",
                    id: "pengzhou",
                    url: "/map/xiongmao_fq/pengzhou/ArcGis/_alllayers/{z}/{y}/{x}.png",
                    view: {
                        bearing: 0,
                        center: [103.8764645196427, 31.03717774580734],
                        essential: true,
                        pitch: 53.93684150325133,
                        zoom: 10.39665090798298
                    }
                },

                {
                    name: "都江堰站",
                    id: "dujiangyan",
                    url: "/map/xiongmao_fq/dujiangyan/ArcGis/_alllayers/{z}/{y}/{x}.png",
                    view: {
                        bearing: 0,
                        center: [103.60124114271571, 30.925828475655365],
                        essential: true,
                        pitch: 55.289572892161736,
                        zoom: 10.784372529307735
                    }
                }
            ]
        }
    },
    methods: {
        //通过map方法生成图层
        async setLayer(type, id, geoData) {
            if (!geoData || !geoData[0]) {
                return;
            }

            if (type == 1) {
                const data = {
                    imgUrl: geoData[0].img,
                    id,
                    color: "#fff",
                    pointArray: {
                        type: "FeatureCollection",
                        features: geoData
                    }
                }
                if (geoData[0].textName) {
                    data.textName = geoData[0].textName;
                }
                if (geoData[0].tip) {
                    data.tip = geoData[0].tip;
                }
                this.$store.state.app.map.mapBox.point(data)
                // 是否需要绘制 以某个点位为中心的圆圈
                if (geoData[0].circle) {
                    this.$store.state.app.map.mapBox.addCircle(data)
                }
            }
            if (type == 2) {
                const data = {
                    id,
                    geojson: {
                        features: geoData,
                        type: "FeatureCollection"
                    }
                }
                const option = {
                    lineColor: geoData[0].properties.color || "#F4BD1A",
                    lineWidth: 4,
                    arrow: false
                }
                //设置线条名称
                if (geoData[0].textName) {
                    data.textName = geoData[0].textName
                }
                //设置线条起始点
                if (geoData[0].start) {
                    data.start = geoData[0].start
                }
                //设置线条终点
                if (geoData[0].end) {
                    data.end = geoData[0].end
                }
                this.$store.state.app.map.mapBox.line(data, option)
            }
            if (type == 3) {
                const data = {
                    id,
                    fillColor: geoData[0].properties.fillColor || "rgba(11,159,251,0.4)",
                    opacity: 0.2,
                    width: 1,
                    lineColor: geoData[0].properties.lineColor || "#0B9FFB",
                    polygon: {
                        type: "FeatureCollection",
                        features: geoData
                    }
                }
                if (geoData[0].textName) {
                    data.textName = geoData[0].textName
                }
                if (geoData[0].img) {
                    data.img = geoData[0].img
                }
                this.$store.state.app.map.mapBox.Polygon(data)
            }
            if (type == 4) {
                const data = {
                    id,
                    magName: "mag",
                    data: {
                        type: "FeatureCollection",
                        crs: {
                            type: "name",
                            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
                        },
                        features: geoData
                    }
                }
                this.$store.state.app.map.mapBox.addHeatmap(data)
            }
        },
        //移除图层
        removelayer(type, id) {
            if (type === 1) {
                this.$store.state.app.map.mapBox.removelayer(id)
                this.$store.state.app.map.mapBox.removeCircle(id)
            } else if (type === 2) {
                this.$store.state.app.map.mapBox.rmline(id)
            } else if (type === 3) {
                this.$store.state.app.map.mapBox.removePolygon(id)
            } else if (type === 4) {
                this.$store.state.app.map.mapBox.removelayer(id)
            }
        },
        flyTo(view) {
            this.$store.state.app.map.mapBox.fly(view)
        },
        reset() {
            const currentItem = this.hrefs.find((item) => item.id == this.$store.state.app.currentArea)
            this.$store.state.app.map.mapBox.fly(currentItem.view)
        },
        //设置地图边界
        setBorder() {
            if (this.$store.state.app.currentArea === "chengdu") {
                this.$refs.mapBox.regionBorder("regionborder", {
                    lineColor: "#FFFF00",
                    lineWidth: 2
                })
            } else {
                this.$refs.mapBox.rmline("regionborder")
            }
        },
        showPopu(data) {
            this.$store.state.app.map.mapBox.poup(data)
        },
        hasLayer(layerId) {
            return this.$store.state.app.map.mapBox.getLayer(layerId)
        }
    }

}