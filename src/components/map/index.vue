<template>
  <div id="map"></div>
</template>

<script>
import "./src/index.less"
// import "@egis/map/theme-default/index.scss"
import CreatMap from "./src/ylkj/addlayer.js"
import { addHeatMap } from "./src/ylkj/heatmap.js"
import { addPolygon, removePlygon } from "./src/ylkj/poygon.js"
import { flyBounds, getView, flyTo } from "./src/ylkj/fly.js"
import CHOUZHOUJSON from "./src/ylkj/lib/chongzhou.json"
import LINE_GEOJSON from "./src/ylkj/lib/testline.json"
import REGION_GEOJSON from "./src/ylkj/lib/rg.json"
import { addImgIcon } from "./src/ylkj/point.js"
import { addLine, removeline } from "./src/ylkj/line.js"
import ELEC_ICON from "./src/ylkj/lib/elec.png"
import TEST_ICON from "./src/ylkj/lib/test.png"
import Plotting from "./src/ylkj/lib/potting/plotting.js"
const { createPopup } = window.egis
// import { setMap } from "@egis/map"
export default {
  data() {
    return {
      Map2d: null,
      layers: [], //图层
      terrians: [], //地形
      poupobj: null, //弹框对象
      currentView: null,
      PlottingObj: null, //测量对象
      currentLayer: null //当前图层
    }
  },
  mounted() {
    this.Map2d = new CreatMap(
      "map"
      // "/profile/tuceng/ArcGis/_alllayers/{z}/{y}/{x}.png"
    )
    this.map = this.Map2d.getMap()
    // const settimoutobj = setTimeout(() => {
    //   // this.Map2d.addlayer(
    //   //   "http://3888z2k945.wicp.vip:6150/file/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png"
    //   // )
    //   // this.Map2d.addterrian(
    //   //   // "http://3888z2k945.wicp.vip:6150/file/xiongmao_dem/{z}/{x}/{y}.png"
    //   //   "/profile/xiongmao_dem/chongzhou_dem/{z}/{x}/{y}.png"
    //   // )
    //   // clearTimeout(settimoutobj)
    // }, 1000)

    this.map.on("load", () => {
      this.background("rgba(8,25,64,0.5)")
      this.addterrian(
        "http://3888z2k945.wicp.vip:6150/file/xiongmao_dem/{z}/{x}/{y}.png",
        "terrian"
      )
      this.$emit("onload")
      // 初始加载成都地图
      // this.layers.push(
      //   this.Map2d.addlayer(
      //     "http://3888z2k945.wicp.vip:6150/profile/tuceng/ArcGis/_alllayers/{z}/{y}/{x}.png",
      //     "chengdu2"
      //   )
      // )
      this.map.on("click", (e) => {
        const features = this.map.queryRenderedFeatures(e.point)
        // this.Map2d.addVector()
        if (features.length) {
          console.log(features[0].properties)
          this.$emit("mapclick", features[0].properties, features)
        }
        // this.poup({
        //   center: [103.37310679593571, 30.53780732123583],
        //   centent: "<div style='width:300px'>helloword</div>"
        // })
      })
      try {
        this.PlottingObj = new Plotting(this.map) //测量图标
      } catch (error) {
        console.error(error)
      }
      // this.Map2d.addlayer(
      //   "http://3888z2k945.wicp.vip:6309/profile/tuceng/ArcGis/_alllayers/{z}/{y}/{x}.png",
      //   "pbf"
      // )
      // http://3888z2k945.wicp.vip:6150/file/arcgis/tuceng/_alllayers/10/417/806.png
    })
  },
  methods: {
    // 背景色
    background(color = "rgba(30,62,17,0.5)") {
      if (this.map.getLayer("beijing")) {
        // this.map.removeLayer("beijing")
        this.map.setPaintProperty("beijing", "background-color", color)
      } else {
        try {
          this.map.addLayer({
            id: "beijing",
            type: "background",
            paint: {
              // "background-opacity": 0.5,
              "background-color": color
            },
            layout: {
              visibility: "visible"
            },
            metadata: {
              "mapbox:group": "92ca48f13df25"
            }
          })
        } catch (error) {
          console.log("背景", error)
        }
      }
    },
    // 边界线
    regionBorder(
      id = "regionborder",
      option = { lineColor: "#FFFF00", lineWidth: 2 }
    ) {
      this.line(
        { id: id, geojson: REGION_GEOJSON },
        Object.assign(
          { lineColor: "#FFFF00", lineWidth: 2, arrow: false },
          option
        )
      )
    },
    // 添加地图
    /**
     * @Descripttion:
     * @Author:
     * @Date: 2022-11-03 09:41:28
     * @LastEditors:
     * @param {*} url：string, id:string
     * @param {*}
     * @return {*}
     */
    addlayer(url, id) {
      if (this.layers.length) {
        this.layers.forEach((item) => {
          this.removelayer(item)
        })
        this.layers = []
      }
      this.layers.push(this.Map2d.addlayer(url, id))
      console.log("结果", this.map.getStyle())
      this.map.moveLayer(id, "iGisMapSky")
      this.map.moveLayer("beijing", id)
    },
    // 删除地图
    removelayer(id) {
      if (!id) {
        console.error("请输入删除图层id")
        return
      }
      this.Map2d.removelayer(id)
      // this.rmline("lines")
      // this.removePolygon()
      // this.poupobj?.isOpen() ? this.poupobj.remove() : null
    },
    //添加地形
    addterrian(url, id) {
      // console.log("地形", this.map.setTerrain)
      if (!url) {
        console.error("请输入地形地址")
        return
      }
      if (this.terrians.length) {
        this.terrians.forEach((item) => {
          this.removeterrian(item)
          this.terrians = []
        })
      }
      this.terrians.push(id)
      this.Map2d.addterrian(url, id)
      // this.Map2d.addterrian(url, id)
    },
    removeterrian(id) {
      this.Map2d.removterrian(id)
    },
    // 添加热力图
    addHeatmap(obj) {
      obj.id ? this.removelayer(obj.id) : null
      addHeatMap(this.map, obj)
    },
    // 添加面
    Polygon(
      data = {
        id: "mapPlygon",
        polygon: CHOUZHOUJSON,
        fillColor: "rgba(255,44,44,0.4)",
        opacity: 0.4,
        width: 2
      }
    ) {
      addPolygon(this.map, data)
      // this.flybound(data.polygon)
    },
    removePolygon(layerId = "mapPlygon") {
      removePlygon(this.map, layerId)
    },
    // 范围定位
    flybound(polygon) {
      flyBounds(this.map, polygon)
    },
    // 添加点
    point(
      data = {
        imgUrl: ELEC_ICON,
        id: "测试",
        textName: "text",
        pointArray: {
          type: "FeatureCollection",
          features: [
            {
              id: 1,
              type: "Feature",
              properties: {
                text: "测试点位"
              }, //其中必须包含id字段，用于高亮点钟图标
              geometry: {
                type: "Point",
                coordinates: [103.513296, 30.589647]
              }
            },
            {
              id: 2,
              type: "Feature",
              properties: {
                text: "测试点位1"
              }, //其中必须包含id字段，用于高亮点钟图标
              geometry: {
                type: "Point",
                coordinates: [109.678943564, 35.559617265]
              }
            }
          ]
        }
      }
    ) {
      addImgIcon(this.map, data)
      this.flybound(data.pointArray)
    },
    // 弹框
    poup(
      data = {
        center: [104, 30],
        centent: "<div style='width:300px'>helloword</div>"
      }
    ) {
      this.poupobj = createPopup(data.center, data.centent, {
        closeButton: true,
        closeOnClick: true,
        anchor: "bottom"
      })
    },
    // 删除弹框
    removePoup() {
      this.poupobj?.isOpen() ? this.poupobj.remove() : null
    },
    //添加线
    line(
      data = {
        id: "lines",
        geojson: LINE_GEOJSON,
        textName: "样线编号",
        icon: "",
        calback: function (e) {
          console.log("点击了", e)
        }
      },
      option = { lineColor: "#0080FF", lineWidth: 10, arrow: true }
    ) {
      addLine(this.map, data, option)
    },
    // 移除线
    rmline(id) {
      removeline(this.map, id)
    },
    // 坐标定位
    fly(
      view = {
        bearing: 9.600000000000023,
        center: [103.58806946916616, 30.630077549993786],
        duration: 12000,
        essential: true,
        pitch: 73.99999999999997,
        zoom: 16.001771985334283
      }
    ) {
      flyTo(this.map, view)
    },
    // 获取视角
    view() {
      this.currentView = getView(this.map)
      console.log(this.currentView)
      return getView(this.map)
    },
    // 地图重置
    resize() {
      this.map.resize()
    },
    /**
     * @Descripttion:绘点
     * @Author:
     * @Date: 2022-11-09 13:54:04
     * @LastEditors:
     * @return {*}
     */
    drawPoint() {
      const _this = this
      this.PlottingObj.on("point", (e) => {
        _this.$emit("draw", e)
        console.log(e)
      })
    },
    /**
     * @Descripttion: 绘线
     * @Author:
     * @Date: 2022-11-09 13:53:33
     * @LastEditors:
     * @return {*}
     */
    drawLine() {
      const _this = this
      this.PlottingObj.on("line", (e) => {
        _this.$emit("draw", e)
        console.log(e)
      })
    },
    /**
     * @Descripttion: 绘面
     * @Author:
     * @Date: 2022-11-09 13:53:44
     * @LastEditors:
     * @return {*}
     */
    drawPolygon() {
      const _this = this
      this.PlottingObj.on("ploygn", (e) => {
        _this.$emit("draw", e)
        console.log(e)
      })
    },
    // 删除绘制
    deleteDraw() {
      this.PlottingObj.clear()
    }
  }
}
</script>
<style scoped lang="less"></style>
