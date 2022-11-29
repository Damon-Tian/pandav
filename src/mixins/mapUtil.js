/* 地图方法 根据type 添加图层 删除图层 

    type 1:点 2:线 3:面,4:热力图
    id 图层id 
    geoData geoJson格式数据

*/
export default {
    methods: {
        //通过map方法生成图层
        async setLayer(type, id, geoData) {
            if (!geoData && geoData[0]) {
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
    },
}