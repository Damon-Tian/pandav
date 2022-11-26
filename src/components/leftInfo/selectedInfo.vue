<template>
  <!-- :style="{
      left: isCollapse ? '134px' : '264px'
    }" -->
  <div class="selected-info">
    <div>
      <div class="selected-info-list">
        <div
          v-for="(item, index) in selectedInfoList"
          :key="index"
          class="selected-info-list__item"
        >
          <div v-if="item.img" class="selected-info-list__item__icon">
            <img :src="item.img" alt="" style="max-width: 18px" />
          </div>
          <div class="selected-info-list__item__text">{{ item.title }}</div>
          <div
            class="selected-info-list__item__checkbox"
            @click="handleClick(item)"
          >
            <img
              v-if="item.checked"
              src="../../assets/img/selectedInfo/checked.png"
              alt=""
            />
            <img
              v-if="!item.checked"
              src="../../assets/img/selectedInfo/check.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <selected-info
      v-for="(item, index) in subselectedInfoList"
      :key="item.id"
      :select-list="item.children"
      class="sub-selected"
      :style="`${
        index !== 0 &&
        'bottom:' +
          (subselectedInfoList[index - 1].children.length * 50 + 50) +
          'px'
      }`"
    />
  </div>
</template>

<script>
import { get_elec, get_elec_hotmap, get_elec_person } from "@/api/elec"
import { get_line, get_patrol_detail } from "@/api/line"
import { get_device_list } from "@/api/device"
import { get_bio_list } from "@/api/animal"
const c1 = require("@/assets/img/selectedInfo/heatmap.jpg")
const c2 = require("@/assets/img/svgIcon/摄像机.svg")
const c3 = require("@/assets/img/svgIcon/生态设备.svg")
import { getImageUrl } from "@/utils"
const commonSelectInfoList = [
  {
    img: require("../../assets/img/selectedInfo/core.png"),
    title: "核心保护区",
    checked: false,
    type: 3,
    id: "1",
    getData: async (orgId) => {
      const params = {
        isCore: 0,
        pageNumber: 1,
        pageSize: 999
      }
      if (orgId) {
        params.orgIds = [orgId]
      }
      const { records } = await get_elec(params)
      return records.map((item) => JSON.parse(item.geoJson))
    }
  },
  {
    img: require("../../assets/img/selectedInfo/general.png"),
    title: "一般保护区",
    checked: false,
    type: 3,
    id: "2",
    getData: async (orgId) => {
      const params = {
        isCore: 1,
        pageNumber: 1,
        pageSize: 999
      }
      if (orgId) {
        params.orgIds = [orgId]
      }
      const { records } = await get_elec(params)
      return records.map((item) => JSON.parse(item.geoJson))
    }
  }
]
export default {
  name: "SelectedInfo",
  components: {},
  props: {
    //左边tabs是否展开
    isCollapse: {
      type: Boolean,
      default: false
    },
    selectList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedInfoList1: [
        ...commonSelectInfoList,
        {
          img: require("../../assets/img/selectedInfo/heatmap.jpg"),
          title: "人员热力图",
          checked: false,
          id: "8",
          getHotmap: async (orgId) => {
            const params = {
              areaCodes: []
            }
            if (orgId) {
              params.areaCodes = [orgId]
            }
            return get_elec_hotmap(params)
          }
        },
        {
          img: require("../../assets/img/selectedInfo/person.jpg"),
          title: "人员轨迹图",
          checked: false,
          type: 2,
          id: "16",
          getData: async (orgId) => {
            const params = {
              areaCodes: []
            }
            if (orgId) {
              params.areaCodes = [orgId]
            }
            return get_elec_person(params)
          }
        },
        {
          img: require("../../assets/img/selectedInfo/patrol.png"),
          title: "设备管理",
          checked: false,
          type: 1,
          id: "6",
          children: [
            {
              title: "红外相机",
              checked: false,
              type: 1,
              id: "10",
              getData: async (orgId) => {
                const params = {
                  pageNumber: 1,
                  pageSize: 999
                }
                if (orgId) {
                  params.orgIds = [orgId]
                }
                const { rows } = await get_device_list({
                  equipmentType: ["infrared_camera"]
                })
                const geoJson = []
                rows.forEach((item) => {
                  const json = {
                    type: "Feature",
                    img: getImageUrl(item.icon),
                    circle: true,
                    properties: {
                      ...item
                    }, //其中必须包含id字段，用于高亮点钟图标
                    geometry: {
                      type: "Point",
                      coordinates: JSON.parse(
                        item.geoJson
                      ).geometry.coordinates.flat()
                    }
                  }
                  geoJson.push(json)
                })
                return geoJson
              }
            },
            {
              title: "摄像机",
              checked: false,
              type: 1,
              id: "11",
              getData: async (orgId) => {
                const params = {
                  pageNumber: 1,
                  pageSize: 999
                }
                if (orgId) {
                  params.orgIds = [orgId]
                }
                const { rows } = await get_device_list({
                  equipmentType: ["video_camera"]
                })
                const geoJson = []
                rows.forEach((item) => {
                  const json = {
                    type: "Feature",
                    img: getImageUrl(item.icon),
                    properties: {
                      ...item
                    }, //其中必须包含id字段，用于高亮点钟图标
                    geometry: {
                      type: "Point",
                      coordinates: JSON.parse(
                        item.geoJson
                      ).geometry.coordinates.flat()
                    }
                  }
                  geoJson.push(json)
                })
                return geoJson
              }
            },
            {
              title: "生态设备",
              type: 1,
              checked: false,
              id: "12",
              getData: async (orgId) => {
                const params = {
                  pageNumber: 1,
                  pageSize: 999
                }
                if (orgId) {
                  params.orgIds = [orgId]
                }
                const { rows } = await get_device_list({
                  equipmentType: ["ecological_equipment"]
                })
                const geoJson = []
                rows.forEach((item) => {
                  const json = {
                    type: "Feature",
                    img: getImageUrl(item.icon),
                    properties: {
                      ...item
                    }, //其中必须包含id字段，用于高亮点钟图标
                    geometry: {
                      type: "Point",
                      coordinates: JSON.parse(
                        item.geoJson
                      ).geometry.coordinates.flat()
                    }
                  }
                  geoJson.push(json)
                })
                return geoJson
              }
            }
          ]
        },
        {
          img: require("../../assets/img/selectedInfo/natural.png"),
          title: "自然资源",
          checked: false,
          type: 1,
          id: "4",
          getData: async (orgId) => {
            const params = {
              pageNumber: 1,
              pageSize: 999
            }
            if (orgId) {
              params.orgIds = [orgId]
            }
            const geoJson = []
            const { records } = await get_bio_list(params)
            records.forEach((item) => {
              const json = {
                type: "Feature",
                img: getImageUrl(item.icon),
                properties: {
                  ...item
                }, //其中必须包含id字段，用于高亮点钟图标
                geometry: {
                  type: "MultiPoint",
                  coordinates: JSON.parse(item.geoJson).geometry.coordinates
                }
              }
              geoJson.push(json)
            })
            return geoJson
          }
        },
        {
          img: require("../../assets/img/selectedInfo/site.png"),
          title: "基层站点",
          checked: false,
          type: 1,
          id: "5",
          getData: async (orgId) => {
            const params = {
              isCore: 0,
              pageNumber: 1,
              pageSize: 999
            }
            if (orgId) {
              params.orgIds = [orgId]
            }
            return [
              {
                id: 1,
                type: "Feature",
                img: require("../../assets/img/selectedInfo/site.png"),
                properties: {}, //其中必须包含id字段，用于高亮点钟图标
                geometry: {
                  type: "MultiPoint",
                  coordinates: [
                    [103.194, 30.546],
                    [103.624, 30.556]
                  ]
                }
              }
            ]
          }
        },
        {
          img: require("../../assets/img/selectedInfo/patrol1.png"),
          title: "巡护管理",
          checked: false,
          type: 1,
          id: "7",
          children: [
            {
              title: "巡护样线",
              checked: false,
              type: 2,
              id: "18",
              getData: async (orgId) => {
                const params = {}
                if (orgId) {
                  params.orgIds = [orgId]
                }
                const { rows } = await get_line(params, {
                  pageNumber: 1,
                  pageSize: 999
                })
                return rows.map((item) => JSON.parse(item.geoJson))
              }
            },
            {
              title: "巡护路线",
              checked: false,
              type: 2,
              id: "19",
              getData: async (orgId) => {
                const params = {}
                if (orgId) {
                  params.orgIds = [orgId]
                }
                const data = await get_patrol_detail({ id: 109 })
                const geoJson = [
                  {
                    type: "Feature",
                    properties: {
                      color: "#62f709"
                    },
                    geometry: {
                      type: "LineString",
                      coordinates: data.pointList.map((item) => [
                        Number(item.lon),
                        Number(item.lat)
                      ])
                    }
                  }
                ]
                return geoJson
              }
            }
          ]
        }
      ],
      selectedInfoList2: [...commonSelectInfoList],
      needRemoveChecked: [],
      subselectedInfo: []
    }
  },
  computed: {
    selectedInfoList() {
      if (this.selectList && this.selectList.length) {
        return this.selectList
      }
      return this.currentTab === 1
        ? this.selectedInfoList1
        : this.selectedInfoList2
    },
    currentArea() {
      return this.$store.state.app.currentArea
    },
    orgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    },
    subselectedInfoList() {
      return this.currentTab === 1 ? this.subselectedInfo : []
    },
    currentFeature() {
      return this.$store.state.app.map.feature
    },
    currentTab() {
      return this.$store.state.app.currentTab
    }
  },
  watch: {
    currentTab() {
      this.handleLeaveEnter()
      this.initLayer()
    },
    currentArea() {
      //切换图层再重新请求数据再添加图层
      this.initLayer()
    },
    //点击不同图层处理
    currentFeature() {
      // 设备管理 红外相机
      if (this.currentFeature.properties.type === "infrared_camera") {
        //
      }
      // 设备管理 生态相机
      if (this.currentFeature.properties.type === "ecological_equipment") {
        //
      }
      // 设备管理 摄像机
      if (this.currentFeature.properties.type === "video_camera") {
        this.$emit(
          "deviceOnlineUrl",
          this.currentFeature.properties.deviceOnlineUrl
        )
      }
      // 自然资源 动物
      if (this.currentFeature.properties.protectionLevel == 1) {
        //
      }
      // 自然资源 植物
      if (this.currentFeature.properties.protectionLevel == 2) {
        //
      }
    }
  },
  beforeDestroy() {
    this.handleLeaveEnter()
  },
  mounted() {
    this.handleLeaveEnter()
  },
  methods: {
    getRemovedList() {
      //只对首页选中的图层移除，其他页面的图层其他页面单独操作,不包括公共图层核心保护区一般保护区,不包括含有子菜单
      const needRemoveChecked = this.selectedInfoList.filter(
        (item) =>
          item.checked &&
          !item.children &&
          !commonSelectInfoList.filter((e) => e.title === item.title).length
      )
      this.needRemoveChecked = needRemoveChecked
    },
    // 点击图层处理事件，加载点线面，热力图图层
    async handleClick(item) {
      item.checked = !item.checked
      const { type, title } = item
      if (item.checked) {
        if (item.getData) {
          //点线面操作
          const geoData = await item.getData(this.orgId)
          this.setLayer(type, title, geoData)
        }
        if (item.getHotmap) {
          //点线面操作
          const data = await item.getHotmap(this.orgId)
          const hotmapData = {
            id: title,
            magName: "mag",
            data: {
              type: "FeatureCollection",
              crs: {
                type: "name",
                properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
              },
              features: data
            }
          }
          this.$store.state.app.map.mapBox.addHeatmap(hotmapData)
        }
      } else {
        this.removelayer(type, title)
      }

      //加载子菜单
      if (item.children && item.checked) {
        this.subselectedInfo.push(item)
      } else {
        const index = this.subselectedInfo.findIndex(
          (sub) => sub.id === item.id
        )
        if (index > -1) {
          this.subselectedInfo.splice(index, 1)
        }
      }
      this.getRemovedList()
    },
    //处理首页图层展示删除 ，和回显
    handleLeaveEnter() {
      const subNeedRemoveChecked = this.selectList.filter(
        (item) => item.checked
      )
      this.needRemoveChecked.concat(subNeedRemoveChecked).forEach((item) => {
        //首页加载之前勾选的，离开首页删除勾选的图层
        if (this.currentTab === 1) {
          item.checked = false
          this.handleClick(item)
        } else {
          this.removelayer(item.type, item.title)
        }
      })
    },
    //初始化图层 核心保护区和一般保护区 热力图 人员轨迹图
    async initLayer() {
      this.selectedInfoList1
        .slice(0, this.currentTab === 1 ? 4 : 2)
        .forEach((item) => {
          item.checked = false
          this.handleClick(item)
        })
    },
    //通过map方法生成图层
    async setLayer(type, id, geoData) {
      // type 1:点 2:线 3:面
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
          fillColor:
            id !== "核心保护区" ? "rgba(11,159,251,0.4)" : "rgba(249,9,9,0.4)",
          opacity: 0.2,
          width: 1,
          lineColor: id !== "核心保护区" ? "#0B9FFB" : "#f90909",
          polygon: {
            type: "FeatureCollection",
            features: geoData
          }
        }
        this.$store.state.app.map.mapBox.Polygon(data)
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
      } else {
        this.$store.state.app.map.mapBox.removelayer(id)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.selected-info {
  display: flex;
  width: 180px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 30px;
  border-radius: 2px;
  transition: all 0.5s;

  &-list {
    position: relative;
    bottom: 0;
    padding: 40px 10px 8px;
    background: rgba(0, 0, 0, 60%);

    &__item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;

      &__text {
        width: 86px;
        color: #fff;
      }

      &__icon {
        width: 20px;
      }

      &__checkbox {
        cursor: pointer;
      }
    }
  }
}

.sub-selected {
  position: absolute;
  margin-left: 200px;
}
</style>
