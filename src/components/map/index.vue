<!--
 * @Author: renhaihua 1030884759@qq.com
 * @Date: 2022-10-31 15:54:28
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-01 19:50:36
 * @FilePath: \pandav\src\components\map\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
/* 地图组件相关代码 */
<template>
  <div id="map">
    <div class="map-button">
      <button
        type="button"
        @click="
          addlayer(
            'http://3888z2k945.wicp.vip:6150/file/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png',
            'chengdu'
          )
        "
      >
        崇州地图
      </button>
      <button
        type="button"
        @click="
          addterrian(
            '/profile/xiongmao_dem/chongzhou_dem/{z}/{x}/{y}.png',
            'chongzhoudixing'
          )
        "
      >
        崇州地形
      </button>
      <button
        type="button"
        @click="
          addterrian(
            '/profile/xiongmao_dem/dayi_dem/{z}/{x}/{y}.png',
            'dayi_dem'
          )
        "
      >
        大邑地形
      </button>
      <button
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
// import { setMap } from "@egis/map"
export default {
  data() {
    return {
      Map2d: null,
      layers: [], //图层
      terrians: [] //地形
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
      this.removePolygon()
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
          // this.terrians = []
        })
      }
      this.terrians.push(this.Map2d.addterrian(url, id))
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
        poygon: CHOUZHOUJSON,
        fillColor: "rgba(255,44,44,0.4)",
        opacity: 0.4,
        width: 2
      }
    ) {
      addPolygon(this.map, data)
      flyBounds(this.map, data.poygon)
    },
    removePolygon(layerId = "mapPlygon") {
      removePlygon(this.map, layerId)
    }
  }
}
</script>
<style scoped lang="less"></style>
