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
  addControl,
  DrawControl,
  getDrawGeoJSON,
  moveLayer
} = window.egis
// interface AnyObject {
//   [key: string]: any
// }
import { uuid, isString } from "./util.js"
import { addHeatMap } from "./heatmap.js"
class CreatMap {
  // eslint-disable-next-line no-undef
  // [x: string]: any
  constructor(id, url) {
    this.map = null
    this.int(id, url)
    this.currentId = null
  }

  int(id, url = "") {
    this.map = setMap({
      container: id,
      center: [103.46345144619704, 30.466287355910467],
      // crs: 'EGSP:3857',
      pitch: 65.5,
      // ./lib/fonts/{fontstack}/{range}.pbf
      maxZoom: 20,
      minZoom: 8,
      zoom: 11.99715452226343,
      bearing: 0,
      touchZoomRotate: true,
      style: "/map/POI/hbnew/p12/resources/styles/root.json"
    })
    // this.addterrian()
    // onComponentMount (()=>{

    //     this.addterrian();
    // })
    // setTimeout(()=>{
    //     this.addterrian();
    //  },1000);
    // addControl(new MeasureControl());
    // this.map.addControl()
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
      console.error("请传入正确地址")
    }
    const layerId = id ? id : uuid()
    this.currentId = layerId
    addSource(layerId, {
      type: "raster",
      tiles: Array.isArray(url) ? url : [url],
      tileSize: 256
    })
    addLayer({
      id: layerId,
      type: "raster",
      source: layerId
    })
    // console.log("返回1", this.map.getStyle())
    return id
  }
  addVector() {
    let _this = this
    // this.map.setStyle('http://3888z2k945.wicp.vip:6150/file/POI/hbPOI/p12/resources/styles/root.json')
    // this.map.addSource('mapillary', {
    //   'type': 'vector',
    //   // 'tiles': [
    //   //   '/file/POI/hbPOI/p12/resources/{z}/{y}/{x}.pbf'
    //   // ],
    //   'url': 'http://3888z2k945.wicp.vip:6150/file/POI/hbPOI/p12/resources/styles/root.json'

    // })
    // this.map.addLayer({
    //   'id': 'mapillary', // Layer ID
    //   'type': 'symbol',
    //   'source': 'mapillary',
    //   'source-layer': 'mapillary',
    //   'layout': {
    //     'text-field': ['get', 'name']
    //   },
    //   "paint": {
    //     "text-color": "#fff",
    //     // "text-halo-color": "rgba(0,0,0,0.5)",
    //     // "text-halo-width": 2,
    //     // "text-opacity": 0.8
    //   }
    // })
    fetch(
      "http://3888z2k945.wicp.vip:6150/file/POI/hbPOI/p12/resources/styles/root.json"
    )
      .then((response) => response.json())
      .then((data) => {
        // data.id = "mypbf";
        // data.type = "symbol"
        // data.source = data.sources.esri;
        // data['source-layer'] = "mypbf";
        // this.map.addLayer(data)
        // console.log("返回1", _this.map.getStyle())
        try {
          _this.map.setStyle(data)
        } catch (error) {
          console.error(error)
        }

        // moveLayer(_this.currentId)
      })
    // this.map.addLayer('http://3888z2k945.wicp.vip:6150/file/POI/hbPOI/p12/resources/styles/root.json')
  }
  // 删除图层
  removelayer(id) {
    if (getLayer(id)) {
      removeLayer(id)
    }
    if (getSource(id)) {
      removeSource(id)
    }
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
    const terrianId = id ? id : uuid()
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
      source: id
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
