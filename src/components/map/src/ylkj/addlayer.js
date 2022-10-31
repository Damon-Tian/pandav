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
  onComponentMount
} =window.egis
// interface AnyObject {
//   [key: string]: any
// }

class CreatMap {
  // eslint-disable-next-line no-undef
  // [x: string]: any
  constructor(id, url) {
    this.map = null
    this.int(id, url)
  }

  int(
    id,
    url = "http://10.51.100.105/profile/xiongmao_dem/{z}/{x}/{y}.png"
  ) {
    this.map = setMap({
      container: id,
      center: [103.46345144619704, 30.466287355910467],
      // crs:'EGSP:3857',
      pitch: 65.5,
      zoom: 11.99715452226343,
      bearing: 0,
      touchZoomRotate: true,
      style: {
        sources: {
          maplasource: {
            type: "raster",
            tiles: [url],
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
  addlayer() {
    // addSource('maplasource',{
    //     type: 'raster',
    //     tiles: ['http://10.51.100.105/profile/xiongmao/arcgis/tuceng/_alllayers/{z}/{y}/{x}.png'],
    //     tileSize: 256,
    // });
    // addLayer({
    //     id:"maplayer",
    //     type:"raster",
    //     source:"maplasource",
    // });
  }
  addterrian(
    url = "http://10.51.100.105//profile/xiongmao_dem/{z}/{x}/{y}.png"
  ) {
    addSource("raster-dem-source", {
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
    setTerrain({
      source: "raster-dem-source"
    })
  }
}

export default CreatMap