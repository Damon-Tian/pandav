<template>
  <!-- :style="{
      left: isCollapse ? '134px' : '264px'
    }" -->
  <div class="selected-info" :style="`${isCollapse && 'left:110px'}`">
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
          (subselectedInfoList[index - 1].children.length * 50 + 30) +
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
        <div
          v-for="(item, index) in 5"
          :key="item"
          :class="{
            'gray-count':
              currentHeatMapRange !== '' && currentHeatMapRange !== index
          }"
          @click="handleFilterHeatMap(index)"
        >
          {{ index != 4 ? (5 - index) * 20 : 0 }}人
        </div>
      </div>
      <div class="map">
        <div
          v-for="(item, index) in 5"
          :key="item"
          class="item"
          @click="handleFilterHeatMap(index)"
        ></div>
      </div>
    </div>
    <div
      v-if="showHeatmap"
      class="slide-timebar"
      :style="{
        right: isRightCollapse ? 'calc(2% + 80px)' : 'calc(27% + 80px)'
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
  get_elec_person_geojson,
  get_elec_area_geojson
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
import mapUtil from "@/mixins/mapUtil"
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
  mixins: [mapUtil],
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
          img: require("@/assets/img/p-leftbar-electron.png"),
          title: "电子围栏范围",
          checked: false,
          type: 3,
          id: "16",
          getData: get_elec_area_geojson
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
      subselectedInfo: [],
      currentTime: 24,
      // 筛选热力图人数
      currentHeatMapRange: "",
      needRemoveChecked: []
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
    //只对首页选中的图层移除，其他页面的图层其他页面单独操作,不包括公共图层核心保护区一般保护区,不包括含有子菜单
  },
  watch: {
    currentTab(oldvalue, newvalue) {
      if (oldvalue == 1) {
        this.$nextTick(() => {
          this.handleNeedReomvedCheck()
        })
      } else {
        this.handleNeedReomvedCheck()
      }
    },
    currentArea() {
      console.log(this.needRemoveChecked)
      this.handleNeedReomvedCheck()
      //切换图层再重新请求数据再添加图层
      this.initLayer()
    },
    selectedInfoList: {
      deep: true,
      handler(val) {
        const list = this.selectedInfoList.filter(
          (item) =>
            item.checked &&
            !item.children &&
            !commonSelectInfoList.filter((e) => e.title === item.title).length
        )
        this.needRemoveChecked = list
      }
    }
  },
  destroyed() {
    this.handleNeedReomvedCheck()
  },
  mounted() {
    this.handleNeedReomvedCheck()
  },
  methods: {
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
    },
    // 切换地图，切换tab菜单 显示隐藏需要的图层
    handleNeedReomvedCheck() {
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
      this.currentHeatMapRange = ""
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
      this.currentHeatMapRange = ""
      const time = DateFormat(this.getDateBySilderVal(), "yyyyMMddhh")
      //清除热力图
      const { type, id } = { type: 4, id: "人员热力图" }
      this.removelayer(type, id)
      const geoData = await get_elec_heatmap_geojson(this.orgId, time)
      this.setLayer(type, id, geoData)
    }),
    //过滤热力图
    async handleFilterHeatMap(index) {
      //清除热力图
      const { type, id } = { type: 4, id: "人员热力图" }
      this.removelayer(type, id)
      const geoData = await get_elec_heatmap_geojson(this.orgId)
      let filterGeoData = []
      if (index == 0) {
        filterGeoData = geoData.filter(
          (item) => item.properties.personNum >= 100
        )
      } else if (index == 4) {
        filterGeoData = geoData.filter((item) => item.properties.personNum < 40)
      } else {
        filterGeoData = geoData.filter(
          (item) =>
            item.properties.personNum < 40 + index * 20 &&
            item.properties.personNum >= 40 + (index - 1) * 20
        )
      }
      if (index === this.currentHeatMapRange) {
        this.currentHeatMapRange = ""
        filterGeoData = geoData
      } else {
        this.currentHeatMapRange = index
      }

      this.setLayer(type, id, filterGeoData)
    }
  }
}
</script>

<style lang="less" scoped>
.selected-info {
  position: absolute;
  bottom: 0;
  left: 240px;
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
    padding: 10px 10px 8px;
    background: rgba(0, 0, 0, 60%);

    &__item {
      display: flex;
      justify-content: space-between;
      line-height: 50px;

      &__text {
        width: 100px;
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
  margin-left: -40px;
}

.zoom-map {
  position: fixed;
  top: 180px;
  display: flex;
  transition: right 0.5s;

  .count {
    margin-right: 10px;
    cursor: pointer;
    font-size: 12px;
    text-align: right;

    div {
      height: 40px;
      color: #fff;
      line-height: 40px;
    }
  }

  .gray-count {
    color: #bbb !important;
    opacity: 0.7;
  }

  .map {
    overflow: hidden;
    width: 15px;
    height: 200px;
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

    & > div:nth-child(5) {
      background: linear-gradient(#718cd4, rgba(255, 255, 255, 0%));
    }
  }
}

.electron-area {
  top: unset;
  bottom: 50px;
}

.slide-timebar {
  position: fixed;
  bottom: 5px;
  width: 400px;
  transition: right 0.5s;
}
</style>
