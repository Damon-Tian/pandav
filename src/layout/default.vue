<template>
  <div class="main-container">
    <div class="main-left">
      <top-nav />
      <left-bar @select-menu="selectMenu" />
      <div class="right-block">
        <right-info :current-tab="currentTab" />
      </div>
      <wether />
      <!-- <iframe
        frameborder="0"
        scrolling="auto"
        class="main-container__map"
        src="https://pano.cd720.com/panda/Apps/"
      ></iframe> -->
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
export default {
  components: {
    topNav,
    leftBar,
    camera,
    rightInfo,
    wether
  },
  data() {
    return {
      currentTab: 1
    }
  },
  methods: {
    selectMenu(i) {
      this.currentTab = i
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
