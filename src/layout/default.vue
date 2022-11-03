<template>
  <div class="main-container">
    <div class="main-left">
      <top-nav />
      <left-bar @select-menu="selectMenu" />
      <div class="right-block">
        <right-info :current-tab="currentTab" />
      </div>
      <wether />
      <map-box
        ref="mapBox"
        style="width: 100%"
        @mapclick="handleClick"
        @onload="handleOnLoad"
      />
      <!-- <router-view /> -->
    </div>
    <camera class="main-right" />
  </div>
</template>

<script>
import topNav from "@/components/nav"
import leftBar from "@/components/leftBar"
import camera from "@/components/camera.vue"
import rightInfo from "@/components/rightInfo"
import wether from "@/components/wether"
import mapBox from "@/components/map/index"
export default {
  components: {
    topNav,
    leftBar,
    camera,
    rightInfo,
    wether,
    mapBox
  },
  data() {
    return {
      currentTab: 1
    }
  },
  mounted() {
    this.$store.commit("app/SET_MAPBOX", this.$refs.mapBox)
  },
  methods: {
    selectMenu(i) {
      this.currentTab = i
    },
    handleClick(currentFeature) {
      this.$store.commit("app/SET_MAPFEATURE", currentFeature)
    },
    handleOnLoad() {
      this.$refs.mapBox.background("#081940")
      this.$refs.mapBox.fly({
        bearing: 13.517716661366421,
        center: [103.31194986717048, 30.472073615727084],
        duration: 12000,
        essential: true,
        pitch: 57.01769083909942,
        zoom: 10
      })
      this.$refs.mapBox.addlayer(
        "http://3888z2k945.wicp.vip:6150/file/xiongmao/tuceng/ArcGis/_alllayers/{z}/{y}/{x}.png",
        "chengdu"
      )
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
  }
}
</style>
