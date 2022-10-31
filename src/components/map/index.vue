<!--
 * @Author: renhaihua 1030884759@qq.com
 * @Date: 2022-10-31 15:54:28
 * @LastEditors: renhaihua 1030884759@qq.com
 * @LastEditTime: 2022-10-31 17:41:26
 * @FilePath: \pandav\src\components\map\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
/* 地图组件相关代码 */
<template>
  <div id="map"></div>
</template>

<script>
import "./src/index.less"
// import "@egis/map/theme-default/index.scss"
import CreatMap from "./src/ylkj/addlayer.js"
console.log(window.egis)
// import { setMap } from "@egis/map"
export default {
  data() {
    return {
      Map2d: null
    }
  },
  mounted() {
    this.Map2d = new CreatMap(
      "map",
      "/profile/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png"
    )
    this.map = this.Map2d.getMap();
    const settimoutobj= setTimeout(() => {
				this.Map2d.addterrian('/profile/xiongmao_dem/{z}/{x}/{y}.png');
				clearTimeout(settimoutobj);
			}, 1000);
  },
  methods: {}
}
</script>
<style scoped lang="less"></style>
