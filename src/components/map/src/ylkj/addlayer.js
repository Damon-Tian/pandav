// import {
//   setMap,
//   addSource,
//   addLayer,
//   setTerrain,
//   onComponentMount
// } from "@egis/map";
let {
  setMap,
  addSource,
  addLayer,
  setTerrain,
  getLayer,
  getSource,
  removeLayer,
  removeSource,
  onComponentMount,

} = window.egis
// interface AnyObject {
//   [key: string]: any
// }
import {
  uuid,
  isString
} from "./util.js";
import {
  addHeatMap
} from "./heatmap.js"
class CreatMap {
  // eslint-disable-next-line no-undef
  // [x: string]: any
  constructor(id, url) {
    this.map = null
    this.int(id, url)
  }

  int(
    id,
    url = ""
  ) {
    this.map = setMap({
      container: id,
      center: [103.46345144619704, 30.466287355910467],
      // crs:'EGSP:3857',
      pitch: 65.5,
      // ./lib/fonts/{fontstack}/{range}.pbf

      zoom: 11.99715452226343,
      bearing: 0,
      touchZoomRotate: true,
      style: url ? {
        glyphs: "./lib/fonts/{fontstack}/{range}.pbf",
        sources: {
          maplasource: {
            type: "raster",
            tiles: Array.isArray(url) ? url : [url],
            tileSize: 256
          }
          // 'satellite': {
          //     type: "raster",
          //     tiles: ['https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=915de993ea6873664830bf5d8217723c'],
          //     tileSize: 256,
          // },
        },
        layers: [{
            id: "TDT_TITLE_ID",
            type: "raster",
            source: "maplasource"
          }
          // {
          // 	'id': 'satellite',
          // 	'type': 'raster',
          // 	'source': 'satellite'
          // },
        ]
      } : {
        glyphs: "./lib/fonts/{fontstack}/{range}.pbf",
      }
    })
    // this.addterrian()
    // onComponentMount (()=>{

    //     this.addterrian();
    // })
    // setTimeout(()=>{
    //     this.addterrian();
    //  },1000);
  }
  getMap() {
    return this.map
  }
  /**
   * @Descripttion:添加图层区域
   * @Author: 
   * @Date: 2022-11-01 10:48:21
   * @LastEditors: 
   * @param {*} url
   * @param {*} id
   * @return {*}
   */
  addlayer(url, id) {
    if (!url) {
      console.error('请传入正确地址')
    }
    const layerId = (id ? id : uuid())
    addSource(layerId, {
      type: 'raster',
      tiles: Array.isArray(url) ? url : [url],
      tileSize: 256,
    });
    addLayer({
      id: layerId,
      type: "raster",
      source: layerId,
    });
    return id
  }
  // 删除图层
  removelayer(id) {
    if (getLayer(id)) {
      removeLayer(id);
    }
    if (getSource(id)) {
      removeSource(id);
    }

  }
  addMvt(url, id) {
    const layerId = (id ? id : uuid())
    addSource(layerId, {
      type: 'vector',
      scheme: 'tms',
      url: [url]
    });
    addLayer({
      id: layerId,
      type: "circle",
      source: layerId,

    });
  }
  /**
   * @Descripttion: 添加地形区域
   * @Author:
   * @Date: 2022-11-01 10:48:39
   * @LastEditors: 
   * @return {*}
   */
  addterrian(
    url = "http://10.51.100.105/profile/xiongmao_dem/chongzhou_dem/{z}/{x}/{y}.png",
    id
  ) {
    const terrianId = (id ? id : uuid())
    if (!getSource(id)) {
      addSource(terrianId, {
        // 类型（必填）
        type: "raster-dem",
        // 用于指定一个或多个切片数据源的请求地址（可选，和 TileJSON 中的 tiles 属性一致）
        tiles: [url],
        // 切片坐标系方案（可选，可选值为 xyz、tms，默认值为 xyz）
        scheme: "xyz",
        // 最小层级（可选，默认值为 0）
        minzoom: 0,
        // 最大层级（可选，默认值为 22）
        maxzoom: 22
      })
    }
    setTerrain({
      source: id,
    })
    return terrianId
  }
  // 删除地形
  removterrian(id) {
    if (getSource(id)) {
      setTerrain({
        source: id,
        exaggeration: 0
      })

    }
  }




}

export default CreatMap