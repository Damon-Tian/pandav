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
            <img :src="item.img" alt="" />
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
      v-if="showSubSelectList"
      :select-list="subselectedInfo"
      class="sub-selected"
    />
  </div>
</template>

<script>
import img from "../../assets/img/selectedInfo/checked.png"
import { get_elec } from "@/api/elec"
import { get_line } from "@/api/line"
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
      return get_elec(params)
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
      return get_elec(params)
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
    //左边tab点击的状态
    currentTab: {
      type: [Number, String],
      default: null
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
          img: require("../../assets/img/selectedInfo/natural.png"),
          title: "自然资源",
          checked: false,
          type: 1,
          id: "4"
        },
        {
          img: require("../../assets/img/selectedInfo/site.png"),
          title: "基层站点",
          checked: false,
          type: 3,
          id: "5"
        },
        {
          img: require("../../assets/img/selectedInfo/patrol.png"),
          title: "设备管理",
          checked: false,
          type: 1,
          id: "6"
        },
        {
          img: require("../../assets/img/selectedInfo/patrol1.png"),
          title: "巡护管理",
          checked: false,
          type: 2,
          id: "7",
          getData: async (orgId) => {
            const params = {}
            if (orgId) {
              params.orgIds = [orgId]
            }
            return await get_line(params, { pageNumber: 1, pageSize: 999 })
          }
        },
        {
          img: require("../../assets/img/selectedInfo/fence.png"),
          title: "电子围栏",
          checked: false,
          type: 3,
          id: "8"
        }
      ],
      selectedInfoList2: [...commonSelectInfoList],
      subselectedInfo: [
        {
          title: "红外相机",
          checked: false,
          type: 1,
          id: "10"
        },
        {
          title: "摄像机",
          checked: false,
          type: 1,
          id: "11"
        },
        {
          title: "生态设备",
          type: 1,
          checked: false,
          id: "12"
        }
      ],
      needRemoveChecked: []
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
    showSubSelectList() {
      return (
        this.selectedInfoList.findIndex(
          (item) => item.id == 6 && item.checked
        ) > -1
      )
    },
    currentArea() {
      return this.$store.state.app.currentArea
    },
    orgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    }
  },
  watch: {
    currentTab() {
      this.handleLeave()
    },
    currentArea() {
      this.needRemoveChecked.concat(commonSelectInfoList).forEach((item) => {
        this.removelayer(item.type, item.title)
      })
      //切换图层再重新请求数据再添加图层
      this.initLayer()
    }
  },
  methods: {
    getRemovedList() {
      const checked = this.showSubSelectList
        ? this.selectedInfoList.concat(this.showSubSelectList)
        : this.selectedInfoList
      //只对首页选中的图层移除，其他页面的图层其他页面单独操作,不包括公共图层核心保护区一般保护区
      const needRemoveChecked = checked.filter(
        (item) =>
          item.checked &&
          !commonSelectInfoList.filter((e) => e.title === item.title).length
      )
      this.needRemoveChecked = needRemoveChecked
    },
    async handleClick(item) {
      item.checked = !item.checked
      const { type, title } = item
      if (item.checked) {
        if (item.getData) {
          const { records, rows } = await item.getData(this.orgId)
          const data = records ? records : rows
          const geoData = data.map((item) => JSON.parse(item.geoJson))
          this.setLayer(type, title, geoData)
        }
      } else {
        this.removelayer(type, title)
      }
      this.getRemovedList()
    },
    handleLeave() {
      this.needRemoveChecked.forEach((item) => {
        if (this.currentTab == 1) {
          this.setLayer(item.type, item.title)
        } else {
          this.removelayer(item.type, item.title)
        }
      })
    },
    //初始化图层 核心保护区和一般保护区
    async initLayer() {
      // commonSelectInfoList.forEach((item) => {
      //   this.removelayer(item.type, item.title)
      // })
      commonSelectInfoList.forEach((item) => {
        this.handleClick(item)
      })
    },
    async setLayer(type, id, geoData) {
      // type 1:点 2:线 3:面
      if (type == 1) {
        const data = {
          imgUrl: img,
          id,
          textName: "name",
          color: "#fff",
          pointArray: {
            type: "FeatureCollection",
            features: geoData
          }
        }
        this.$store.state.app.map.mapBox.point(data)
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
          lineColor: "#F4BD1A",
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
          opacity: 0.4,
          width: 2,
          lineColor: id !== "核心保护区" ? "#0B9FFB" : "#f90909",
          polygon: {
            type: "FeatureCollection",
            features: geoData
          }
        }
        this.$store.state.app.map.mapBox.Polygon(data)
      }
    },
    removelayer(type, id) {
      if (type === 1) {
        this.$store.state.app.map.mapBox.removelayer(id)
      }
      if (type === 2) {
        this.$store.state.app.map.mapBox.rmline(id)
      }
      if (type === 3) {
        this.$store.state.app.map.mapBox.removePolygon(id)
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
    bottom: -26px;
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
