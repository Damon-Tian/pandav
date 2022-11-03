<!--
 * @Author: renhaihua 1030884759@qq.com
 * @Date: 2022-10-31 15:54:28
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-02 10:23:08
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
        崇州
      </button>
      <button
        type="button"
        @click="
          () => {
            poygon()
          }
        "
      >
        加面
      </button>
      <button type="button" @click="removelayer('chengdu')">删除</button>
    </div>
  </div>
</template>

<script>
import "./src/index.less"
// import "@egis/map/theme-default/index.scss"
import CreatMap from "./src/ylkj/addlayer.js"
// import { setMap } from "@egis/map"
import CHONGZHOU_JSON from "./src/ylkj/lib/chongzhou.json"
import { addPolygon } from "./src/ylkj/poygon.js"
import { flyBounds } from "./src/ylkj/fly.js"
export default {
  data() {
    return {
      Map2d: null,
      layers: [] //项目图层
    }
  },
  mounted() {
    this.Map2d = new CreatMap(
      "map"
      // "http://3888z2k945.wicp.vip:6150/file/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png"
    )

    this.map = this.Map2d.getMap()
    // const settimoutobj = setTimeout(() => {
    //   // this.Map2d.addlayer(
    //   //   "http://3888z2k945.wicp.vip:6150/file/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png"
    //   // )
    //   // this.Map2d.addterrian(
    //   //   "http://3888z2k945.wicp.vip:6150/file/xiongmao_dem/{z}/{x}/{y}.png"
    //   // )
    //   clearTimeout(settimoutobj)
    // }, 1000)
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
    },
    poygon(
      data = {
        id: "polygon",
        polygon: CHONGZHOU_JSON,
        fillColor: "rgba(255,44,44,0.4)",
        opacity: 0.4,
        lineColor: "#FF2C2C",
        width: 3
      }
    ) {
      addPolygon(this.map, data)
      // this.flybound(CHONGZHOU_JSON)
    },
    flybound(geojson) {
      flyBounds(this.map, geojson)
    }
  }
}
</script>
<style scoped lang="less"></style>
