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
    <div
      v-if="showHeatmap"
      class="zoom-map"
      :style="{
        right: isRightCollapse ? '2%' : '27%'
      }"
      :class="{
        'electron-area': currentTab == 7
      }"
    >
      <div class="count">
        <div>100人</div>
        <div>80人</div>
        <div>60人</div>
        <div>40人</div>
      </div>
      <div class="map">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
    <div
      v-if="showHeatmap"
      class="slide-timebar"
      :style="{
        right: isRightCollapse ? '40%' : '50%'
      }"
    >
      <el-slider
        v-model="currentTime"
        :step="1"
        show-stops
        :max="24"
        :format-tooltip="formatTooltip"
        @change="timeChange"
      />
    </div>
  </div>
</template>

<script>
import {
  get_elec_geojson,
  get_eleccore_geojson,
  get_elec_heatmap_geojson,
  get_elec_person_geojson
} from "@/api/elec"
import { get_line_geojson, get_patrol_detail_geojson } from "@/api/line"
import {
  get_infrared_camera_geojson,
  get_ecological_equipment_geojson,
  get_video_camera_geojson
} from "@/api/device"
import { get_bio_geosjon } from "@/api/animal"
import { get_station_geojson } from "@/api/station"
import { DateFormat, debounce } from "@/utils"
const commonSelectInfoList = [
  {
    img: require("../../assets/img/selectedInfo/core.png"),
    title: "核心保护区",
    checked: false,
    type: 3,
    id: "1",
    getData: get_eleccore_geojson
  },
  {
    img: require("../../assets/img/selectedInfo/general.png"),
    title: "一般保护区",
    checked: false,
    type: 3,
    id: "2",
    getData: get_elec_geojson
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
          type: 4,
          getData: get_elec_heatmap_geojson
        },
        {
          img: require("../../assets/img/selectedInfo/person.jpg"),
          title: "人员轨迹图",
          checked: false,
          type: 2,
          id: "16",
          getData: get_elec_person_geojson
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
              getData: get_infrared_camera_geojson
            },
            {
              title: "摄像机",
              checked: false,
              type: 1,
              id: "11",
              getData: get_video_camera_geojson
            },
            {
              title: "生态设备",
              type: 1,
              checked: false,
              id: "12",
              getData: get_ecological_equipment_geojson
            }
          ]
        },
        {
          img: require("../../assets/img/selectedInfo/natural.png"),
          title: "自然资源",
          checked: false,
          type: 1,
          id: "4",
          getData: get_bio_geosjon
        },
        {
          img: require("../../assets/img/selectedInfo/site.png"),
          title: "基层站点",
          checked: false,
          type: 1,
          id: "5",
          getData: get_station_geojson
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
              getData: get_line_geojson
            },
            {
              title: "巡护路线",
              checked: false,
              type: 2,
              id: "19",
              getData: get_patrol_detail_geojson
            }
          ]
        }
      ],
      selectedInfoList2: [...commonSelectInfoList],
      needRemoveChecked: [],
      subselectedInfo: [],
      currentTime: 24
    }
  },
  computed: {
    showHeatmap() {
      return (
        !this.selectList.length &&
        (this.selectedInfoList.some(
          (item) => item.title == "人员热力图" && item.checked
        ) ||
          this.currentTab == 7)
      )
    },
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
    currentTab() {
      return this.$store.state.app.currentTab
    },
    isRightCollapse() {
      return this.$store.state.app.isRightCollapse
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
          // 绘制图层
          const geoData = await item.getData(this.orgId)
          this.setLayer(type, title, geoData)
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
      // type 1:点 2:线 3:面,4:热力图
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
      if (type == 4) {
        const data = {
          id,
          magName: "mag",
          data: {
            type: "FeatureCollection",
            crs: {
              type: "name",
              properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
            },
            features: geoData
          }
        }
        this.$store.state.app.map.mapBox.addHeatmap(data)
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
      } else if (type === 4) {
        this.$store.state.app.map.mapBox.removelayer(id)
      }
    },
    //热力图滑块相关
    formatTooltip(val) {
      return DateFormat(this.getDateBySilderVal(), "yyyy-MM-dd hh点")
    },
    //1,24时刻计算热力图时间
    getDateBySilderVal() {
      //三小时延迟
      let dateNow = new Date().getTime() - 1000 * 60 * 60 * 3
      if (this.currentTime < 24) {
        dateNow -= (24 - this.currentTime) * 1000 * 60 * 60
      }
      return dateNow
    },
    timeChange: debounce(async function () {
      const time = DateFormat(this.getDateBySilderVal(), "yyyyMMddhh")
      //清除热力图
      const { type, id } = { type: 4, id: "人员热力图" }
      this.removelayer(type, id)
      const geoData = await get_elec_heatmap_geojson(this.orgId, time)
      this.setLayer(type, id, geoData)
    })
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

.zoom-map {
  position: fixed;
  top: 180px;
  display: flex;
  transition: right 0.5s;

  .count {
    margin-right: 10px;
    font-size: 12px;

    div {
      height: 40px;
      color: #fff;
      line-height: 40px;
    }
  }

  .map {
    overflow: hidden;
    width: 15px;
    height: 160px;
    border-radius: 15px;

    .item {
      height: 40px;
    }

    & > div:first-child {
      background: linear-gradient(#ff0003, #ddfe02);
    }

    & > div:nth-child(2) {
      background: linear-gradient(#ddfe02, #7ed62f);
    }

    & > div:nth-child(3) {
      background: linear-gradient(#7ed62f, #41dfe9);
    }

    & > div:nth-child(4) {
      background: linear-gradient(#41dfe9, #718cd4);
    }
  }
}

.electron-area {
  top: unset;
  bottom: 50px;
}

.slide-timebar {
  position: fixed;
  bottom: 10px;
  width: 400px;
}
</style>
