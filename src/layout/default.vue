<template>
  <div class="main-container">
    <top-nav />
    <left-bar @select-menu="selectMenu" />
    <div class="right-block">
      <right-info :current-tab="currentTab" />
      <camera />
    </div>
    <iframe
      frameborder="0"
      scrolling="auto"
      class="main-container__map"
      src="http://172.20.10.13:3001/read-vue.html?id=layer-tile/type/xyz-rectangle"
    ></iframe>
    <router-view />
  </div>
</template>

<script>
import topNav from "@/components/nav"
import leftBar from "@/components/leftBar"
import camera from "@/components/camera.vue"
import rightInfo from "@/components/rightInfo"

export default {
  components: {
    topNav,
    leftBar,
    camera,
    rightInfo
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
  position: relative;
  //   background-color: #081940;
  // width: 2560px;
  // width: 1920px;
  height: 1080px;

  &__map {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .right-block {
    position: absolute;
    top: 127px;
    right: 20px;
    display: flex;
  }
}
</style>
