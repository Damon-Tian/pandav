<template>
  <div class="main-container">
    <div class="main-left">
      <top-nav ref="topNav" />
      <left-bar ref="leftBar" />
      <div class="right-block">
        <right-info />
      </div>
      <wether />
      <map-box
        ref="mapBox"
        style="position: absolute; top: 0; left: 0; width: 100%"
        @mapclick="handleClick"
        @onload="handleOnLoad"
        @markerClick="handleMarkerClick"
      />

      <!-- <router-view /> -->
    </div>
    <camera ref="cameraRef" class="main-right" />
    <!-- // 地图弹窗 -->
    <div style="display: none">
      <component
        :is="componentId"
        :id="infoId"
        ref="messageBox"
        :type="cameraType"
        @onlineUrl="handleSetVideoUrl"
      />
    </div>
  </div>
</template>

<script>
import topNav from "@/components/nav"
import leftBar from "@/components/leftBar"
import camera from "@/components/camera.vue"
import rightInfo from "@/components/rightInfo"
import wether from "@/components/wether"
import ResourcesInfo from "@/components/mapPopupInfo/resourcesInfo.vue"
import CameraInfo from "@/components/mapPopupInfo/cameraInfo.vue"
import PipeCareStation from "@/components/mapPopupInfo/pipeCareStation.vue"
import patrolEvent from "@/components/mapPopupInfo/patrolEvent.vue"
import patrolDetail from "@/components/mapPopupInfo/patrolDetail"
import HeatMap from "@/components/mapPopupInfo/heatmap.vue"
import mapUtil from "@/mixins/mapUtil"
export default {
  components: {
    topNav,
    leftBar,
    camera,
    rightInfo,
    wether,
    mapBox: () => import("../components/map/index.vue"),
    ResourcesInfo,
    CameraInfo,
    PipeCareStation,
    HeatMap,
    patrolEvent,
    patrolDetail
  },
  mixins: [mapUtil],
  data() {
    return {
      componentId: null,
      infoId: null,
      cameraType: ""
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    },
    currentTab() {
      return this.$store.state.app.currentTab
    }
  },
  watch: {
    currentArea() {
      this.setBorder()
    },
    currentTab() {
      this.setBorder()
    }
  },
  mounted() {
    this.$store.commit("app/SET_DEFAULT_COMPONENT", this)
  },
  methods: {
    handleClick(currentFeature, features) {
      this.$store.commit("app/SET_MAPFEATURE", currentFeature)
      this.$store.commit("app/SET_MAPFEATURES", features)
      this.handleFeature(currentFeature)
    },
    handleOnLoad() {
      this.$store.commit("app/SET_MAPBOX", this.$refs.mapBox)
      this.$refs.mapBox.background("#081940")
      this.setBorder()
      this.reset()
      this.$refs.mapBox.addlayer(
        "/map/xiongmao/ArcGis/_alllayers/{z}/{y}/{x}.png",
        "chengdu"
      )
      this.$refs.leftBar.init()
    },
    //图层点击
    async handleFeature(currentFeature) {
      console.log(currentFeature)
      //设备
      if (currentFeature.properties.equipmentType) {
        if (
          currentFeature.properties.equipmentType == "ecological_equipment" &&
          this.currentTab !== 1
        ) {
          this.componentId = null
          return
        }
        this.cameraType = currentFeature.properties.equipmentType
        this.componentId = "CameraInfo"
        this.infoId = currentFeature.properties.equipmentId
      }
      //自然资源
      else if (currentFeature.properties.bioId) {
        this.componentId = "ResourcesInfo"
        this.infoId = currentFeature.properties.bioId
      }

      // //保护站 ,只在首页地图显示卡片
      // else if (currentFeature.properties.stationName && this.currentTab === 1) {
      //   this.componentId = "PipeCareStation"
      // }

      // 热力图
      else if (currentFeature.properties.mag) {
        this.componentId = "HeatMap"
      } else {
        this.componentId = null
      }
      if (this.componentId) {
        // 对管护站center单独处理
        const stationCenter = currentFeature.properties.coordinates

        this.showPopupMenu(
          stationCenter
            ? JSON.parse(stationCenter)
            : currentFeature.geometry.coordinates
        )
      }
    },
    //marker点击
    async handleMarkerClick(marker) {
      //巡护事件
      let center = []
      if (marker.event) {
        this.componentId = "patrolEvent"
        this.infoId = marker.id
        center = [Number(marker.longitude), Number(marker.latitude)]
      }
      //巡护记录
      if (marker.line) {
        this.componentId = "patrolDetail"
        this.infoId = marker.patrolId
        center = [Number(marker.longitude), Number(marker.latitude)]
      }
      //基层站点
      if (marker.stationName) {
        this.componentId = "PipeCareStation"
        this.$store.commit("app/SET_MAPFEATURE", {
          properties: marker
        })
        if (this.currentTab != 1) {
          return
        }
        center = marker.coordinates
      }

      setTimeout(() => {
        this.showPopupMenu(center)
      }, 200)
    },
    showPopupMenu(center) {
      this.$nextTick(() => {
        const dom = this.$refs.messageBox.$el
        this.showPopu({
          center,
          centent: dom
        })
      })
    },
    handleSetVideoUrl(url) {
      this.$refs.cameraRef.setVideoUrl(url)
    }
  }
}
</script>

<style lang="less">
.main-container {
  //   background-color: #081940;
  // width: 2560px;
  // width: 1920px;
  display: flex;

  &__map {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .right-block {
    position: absolute;
    z-index: 2;
    top: 127px;
    right: 0;
    display: flex;
  }

  .main-right {
    width: 25%;
  }

  .main-left {
    position: relative;
    z-index: 2;
    flex: 1;

    .btn {
      position: absolute;
      right: 20px;
      bottom: 10px;
      padding: 5px 10px;
      background: rgba(0, 0, 0, 60%);
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
