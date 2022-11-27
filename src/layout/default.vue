<template>
  <div class="main-container">
    <div class="main-left">
      <top-nav ref="topNav" />
      <left-bar ref="leftBar" @select-menu="selectMenu" />
      <div class="right-block">
        <right-info />
      </div>
      <wether />
      <map-box
        ref="mapBox"
        style="width: 100%"
        @mapclick="handleClick"
        @onload="handleOnLoad"
      />
      <span class="btn" @click="$refs.topNav.reset()">复位</span>
      <!-- <router-view /> -->
    </div>
    <camera ref="cameraRef" class="main-right" />
    <videoPlayer v-if="videoUrl" ref="videoPlayerRef" style="display: none" />
  </div>
</template>

<script>
import topNav from "@/components/nav"
import leftBar from "@/components/leftBar"
import camera from "@/components/camera.vue"
import rightInfo from "@/components/rightInfo"
import wether from "@/components/wether"
import mapBox from "@/components/map/index"
import videoPlayer from "@/components/videoPlayer/videoPlayer.vue"
export default {
  components: {
    topNav,
    leftBar,
    camera,
    rightInfo,
    wether,
    mapBox,
    videoPlayer
  },
  data() {
    return {
      currentTab: 1,
      videoUrl: ""
    }
  },
  mounted() {
    this.$store.commit("app/SET_MAPBOX", this.$refs.mapBox)
  },
  methods: {
    selectMenu(i) {
      this.currentTab = i
      this.$store.commit("app/SET_MAPFEATURE", null)
      this.$store.commit("app/SET_TAB", i)
    },
    handleClick(currentFeature) {
      this.$store.commit("app/SET_MAPFEATURE", currentFeature)
      this.handleFeature(currentFeature)
    },
    handleOnLoad() {
      this.$refs.mapBox.background("#081940")
      this.$refs.mapBox.fly({
        center: [103.37200312027926, 30.671440838957167],
        zoom: 9.838592817487967,
        pitch: 58.69748625766818,
        bearing: 0,
        duration: 12000,
        essential: true
      })
      this.$refs.mapBox.addlayer(
        "/profile/tuceng/ArcGis/_alllayers/{z}/{y}/{x}.png",
        "chengdu"
      )
      this.$refs.leftBar.init()
    },
    async handleFeature(currentFeature) {
      this.videoUrl = ""
      console.log(currentFeature)
      // 设备管理 红外相机
      if (currentFeature.properties.equipmentType === "infrared_camera") {
        //
      }
      // 设备管理 生态相机
      if (currentFeature.properties.equipmentType === "ecological_equipment") {
        //
      }
      // 设备管理 摄像机
      if (currentFeature.properties.equipmentType === "video_camera") {
        //
        const { deviceOnlineUrl } = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              deviceOnlineUrl:
                "http://110.185.102.112:8888/live/liveStream_7L01618PAJF96DB_0_0.flv"
            })
          }, 500)
        })
        this.videoUrl = deviceOnlineUrl
      }
      // 自然资源 动物
      if (currentFeature.properties.protectionLevel == 1) {
        //
      }
      // 自然资源 植物
      if (currentFeature.properties.protectionLevel == 2) {
        //
      }
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
