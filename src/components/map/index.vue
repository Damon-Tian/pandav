<template>
  <div id="map">
    <div class="map-button">
      <button
        type="button"
        @click="
          addlayer(
            'http://3888z2k945.wicp.vip:6150/file/xiongmao/chongzhou/ArcGis/_alllayers/{z}/{y}/{x}.png',
            'chengdu'
          )
        "
      >
        崇州地图
      </button>
      <button
        type="button"
        @click="
          addlayer(
            'http://3888z2k945.wicp.vip:6150/file/xiongmao/dayi/ArcGis/_alllayers/{z}/{y}/{x}.png',
            'chengdu'
          )
        "
      >
        大邑地图
      </button>
      <button
        type="button"
        @click="
          addlayer(
            'http://3888z2k945.wicp.vip:6150/file/xiongmao/dujiangyan/ArcGis/_alllayers/{z}/{y}/{x}.png',
            'chengdu'
          )
        "
      >
        都江堰地图
      </button>
      <button
        type="button"
        @click="
          addlayer(
            'http://3888z2k945.wicp.vip:6150/file/xiongmao/pengzhou/ArcGis/_alllayers/{z}/{y}/{x}.png',
            'chengdu'
          )
        "
      >
        彭州地图
      </button>
      <button
        ref="textbutton"
        type="button"
        @click="
          addHeatmap({
            id: 'heatmap',
            magName: 'mag',
            url: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          })
        "
      >
        添加热力图
      </button>
      <button type="button" @click="Polygon()">添加面</button>
      <button type="button" @click="point()">添加点位</button>
      <button type="button" @click="line()">添加线</button>
      <button type="button" @click="removelayer('chengdu')">删除</button>
    </div>
  </div>
</template>

<script>
import "./src/index.less"
// import "@egis/map/theme-default/index.scss"
import CreatMap from "./src/ylkj/addlayer.js"
import { addHeatMap } from "./src/ylkj/heatmap.js"
import { addPolygon, removePlygon } from "./src/ylkj/poygon.js"
import { flyBounds } from "./src/ylkj/fly.js"
import CHOUZHOUJSON from "./src/ylkj/lib/chongzhou.json"
import LINE_GEOJSON from "./src/ylkj/lib/line.json"
import { addImgIcon } from "./src/ylkj/point.js"
import { addLine, removeline } from "./src/ylkj/line.js"
import ELEC_ICON from "./src/ylkj/lib/elec.png"
const { createPopup } = window.egis
// import { setMap } from "@egis/map"
export default {
  data() {
    return {
      Map2d: null,
      layers: [], //图层
      terrians: [], //地形
      poupobj: null //弹框对象
    }
  },
  mounted() {
    this.Map2d = new CreatMap(
      "map"
      // "http://3888z2k945.wicp.vip:6150/file/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png"
    )
    this.map = this.Map2d.getMap()
    const settimoutobj = setTimeout(() => {
      // this.Map2d.addlayer(
      //   "http://3888z2k945.wicp.vip:6150/file/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png"
      // )
      // this.Map2d.addterrian(
      //   // "http://3888z2k945.wicp.vip:6150/file/xiongmao_dem/{z}/{x}/{y}.png"
      //   "/profile/xiongmao_dem/chongzhou_dem/{z}/{x}/{y}.png"
      // )
      // clearTimeout(settimoutobj)
    }, 1000)
    this.map.on("load", () => {
      this.addterrian(
        "http://3888z2k945.wicp.vip:6150/file/xiongmao_dem/{z}/{x}/{y}.png",
        "terrian"
      )
      this.map.on("click", (e) => {
        const features = this.map.queryRenderedFeatures(e.point)
        console.log("点击事件", features)
        if (features.length) {
          this.$emit("mapclick", features[0].properties, features)
        }
        // this.poup({
        //   // center: { lon: Number(e.lngLat.lng), lat: Number(e.lngLat.lat) },
        //   center: [Number(e.lngLat.lng), Number(e.lngLat.lat)],
        //   centent: this.$refs.textbutton
        // })
      })
    })
  },
  methods: {
    // 添加地图
    addlayer(url, id) {
      if (this.layers.length) {
        this.layers.forEach((item) => {
          this.removelayer(item)
        })
        this.layers = []
      }
      this.layers.push(this.Map2d.addlayer(url, id))
    },
    // 删除地图
    removelayer(id) {
      if (!id) {
        console.error("请输入删除图层id")
        return
      }
      this.Map2d.removelayer(id)
      this.rmline("lines")
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
    // 添加地形
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
      this.flybound(data.polygon)
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
        id: "points",
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
                coordinates: [109.679943564, 35.559617265]
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
        center: { lon: 104, lat: 30 },
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
      data = { id: "lines", geojson: LINE_GEOJSON },
      option = { lineColor: "#0080FF", lineWidth: 10, arrow: true }
    ) {
      addLine(this.map, data, option)
    },
    // 移除线
    rmline(id) {
      removeline(this.map, id)
    }
  }
}
</script>
<style scoped lang="less"></style>
