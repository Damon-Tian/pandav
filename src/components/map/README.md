调用采用父组件 this.$ref.addLayer 的形式
1、地图加载完成回调
@onload="onload"
2、监听点击事件
@mapclick="mapclick"
3、切换地图
初始进入页面在监听 onload 事件后，调用 addlayer

    addlayer(
    'http://3888z2k945.wicp.vip:6150/file/xiongmao/chongzhou/ArcGis/_alllayers/{z}/{y}/{x}.png',
    'chongzhou'
    )
    addlayer(
    'http://3888z2k945.wicp.vip:6150/file/xiongmao/dayi/ArcGis/_alllayers/{z}/{y}/{x}.png',
    'dayi'
    )
    addlayer(
    'http://3888z2k945.wicp.vip:6150/file/xiongmao/dujiangyan/ArcGis/_alllayers/{z}/{y}/{x}.png',
    'dujiangyan'
    )
    addlayer(
    'http://3888z2k945.wicp.vip:6150/file/xiongmao/pengzhou/ArcGis/_alllayers/{z}/{y}/{x}.png',
    'pengzhou'
    )

4、热力图
/\*\*

- @Descripttion:
- @Author:
- @Date: 2022-11-03 09:44:22
- @LastEditors: id：string ，magName：string,url:string
- @return {_}，magName 是在 geojson 中热力图所取的权重值
  _/
  addHeatmap({
  id: 'heatmap',
  magName: 'mag',
  url: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
  })

/\*\*

- @Descripttion:
- @Author:
- @Date: 2022-11-03 09:46:15
- @LastEditors: id:stirng
- @return {_}
  _/
  removelayer(id)
  /\*\*
- @Descripttion: 添加面
- @Author:
- @Date: 2022-11-03 09:46:45
- @LastEditors: id:stirng，polygon：geojson,fillColor:string,opacity:number,with
- @return {_}fillColor 填充颜色 opacity 填充透明度 width 面边框宽度
  _/

Polygon(
data = {
id: "mapPlygon",
polygon: CHOUZHOUJSON,
fillColor: "rgba(255,44,44,0.4)",
opacity: 0.4,
lineColor:'#FF2C2C',
width: 2
}
)

<!-- 删除面 -->

/**
_ @Descripttion:
_ @Author:
_ @Date: 2022-11-03 09:48:45
_ @LastEditors: layerId：string
_ @return {_}
\*/  
 removePolygon(layerId = "mapPlygon")
/**
_ @Descripttion: 添加点
_ @Author:
_ @Date: 2022-11-03 09:48:13
_ @LastEditors: id:string,imgUrl:string,textName:string,pointArray:geojson
_ @return {_}imgUrl 图标，textName 若要显示标注，在 properties 取的字段，pointArray 点的 geojson
\*/
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
}, //其中必须包含 id 字段，用于高亮点钟图标
geometry: {
type: "Point",
coordinates: [109.679943564, 35.559617265]
}
}
]
}
}
)

<!-- 删除点 -->

removelayer(id)

/\*\*

- @Descripttion: 添加线
- @Author:
- @Date: 2022-11-03 09:52:33
- @LastEditors: id: string, geojson:geojson option：object
- @return {_}lineColor 线条颜色 lineWidth 线宽度 arrow 是否开启方向箭头
  _/
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
  /\*\*

* @Descripttion: 添加弹框
* @Author:
* @Date: 2022-11-03 09:55:15
* @LastEditors:
* @return {_}
  _/
  poup(
  data = {
  center: [104,30],
  centent: "<div style='width:300px'>helloword</div>"
  }
  )
  或者 poup(
  data = {
  center: [104,30],
  centent:centent: this.$refs.textbutton
  }
  )
    <!-- 移除弹框 -->
  removePoup()
  /\*\*
* @Descripttion: 定位范围
* @Author:
* @Date: 2022-11-03 09:57:54
* @LastEditors: polygon:geojson
* @return {_}
  _/
  flybound(polygon)
  //背景颜色，在监听 onload 事件里修改
  background("rgba(30,62,17,0.5)")
  <!--地图重置  -->

  resize()
  //获取当前视角，返回定位所需视角对象，然后可以用 fly 定位到调整的视野

  view()
  //定位
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
