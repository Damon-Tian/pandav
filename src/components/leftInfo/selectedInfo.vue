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
const commonSelectInfoList = [
  {
    img: require("../../assets/img/selectedInfo/core.png"),
    title: "核心保护区",
    checked: true,
    type: 3,
    id: "1"
  },
  {
    img: require("../../assets/img/selectedInfo/general.png"),
    title: "一般保护区",
    checked: true,
    type: 3,
    id: "2"
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
          id: "7"
        },
        {
          img: require("../../assets/img/selectedInfo/fence.png"),
          title: "电子围栏",
          checked: false,
          type: 3,
          id: "8"
        }
      ],
      selectedInfoList2: commonSelectInfoList,
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
  mounted() {
    this.initLayer()
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
    handleClick(item) {
      item.checked = !item.checked
      const { type, title } = item
      if (item.checked) {
        this.setLayer(type, title)
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
      this.needRemoveChecked.concat(commonSelectInfoList).forEach((item) => {})
    },
    async setLayer(type, id) {
      const geoData = await this.getData(type, id)
      // type 1:点 2:线 3:面
      if (type == 1) {
        const data = {
          imgUrl: img,
          id,
          textName: "text",
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
          lineColor: "#f90909",
          lineWidth: 4,
          arrow: false
        }
        this.$store.state.app.map.mapBox.line(data, option)
      }
      if (type == 3) {
        const data = {
          id,
          fillColor: " rgba(11,159,251,0.4)",
          opacity: 0.4,
          width: 2,
          lineColor: "#0B9FFB",
          polygon: {
            type: "FeatureCollection",
            features: geoData
          }
        }
        this.$store.state.app.map.mapBox.Polygon(data)
      }
    },
    async getData(type, id) {
      switch (type) {
        case 1:
          return Promise.resolve([
            {
              id: "1",
              type: "Feature",
              properties: {
                text: "动物点1"
              }, //其中必须包含id字段，用于高亮点钟图标
              geometry: {
                type: "Point",
                coordinates: [103.681065, 30.644377]
              }
            },
            {
              id: "2",
              type: "Feature",
              properties: {
                text: "动物点2"
              },
              geometry: {
                type: "Point",
                coordinates: [103.681165, 30.645377]
              }
            }
          ])
        case 2:
          return Promise.resolve([
            {
              type: "Feature",
              properties: {
                name: "线条1"
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [103.432937, 30.878296],
                  [103.431534, 30.878371],
                  [103.430488, 30.878591],
                  [103.427857, 30.879531],
                  [103.426433, 30.879565],
                  [103.425718, 30.879164],
                  [103.409448, 30.864955],
                  [103.403892, 30.863962]
                ]
              }
            },
            {
              type: "Feature",
              properties: {
                name: "线条2"
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [103.543722, 30.828089],
                  [103.544396, 30.830691],
                  [103.544171, 30.832102],
                  [103.543757, 30.833789],
                  [103.543084, 30.835082],
                  [103.541632, 30.83608],
                  [103.54032, 30.836406],
                  [103.538881, 30.836501],
                  [103.536328, 30.837267],
                  [103.534237, 30.837529],
                  [103.532546, 30.837566],
                  [103.528372, 30.837354],
                  [103.525973, 30.836937],
                  [103.524085, 30.836918],
                  [103.522437, 30.837802],
                  [103.521188, 30.83875],
                  [103.519799, 30.839527]
                ]
              }
            }
          ])
        case 3:
          return Promise.resolve([
            {
              type: "Feature",
              properties: {
                name: "电子围栏1"
              },
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [103.432937, 30.878296],
                      [103.532937, 30.978296],
                      [103.632937, 30.778296],

                      [103.432937, 30.878296]
                    ]
                  ]
                ]
              }
            },
            {
              type: "Feature",
              properties: {
                name: "电子围栏2"
              },
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [103.513296, 30.589647],
                      [103.522574, 30.599069],
                      [103.531795, 30.608084],
                      [103.561156, 30.616818],
                      [103.588869, 30.629464],
                      [103.513296, 30.589647]
                    ]
                  ]
                ]
              }
            }
          ])
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
