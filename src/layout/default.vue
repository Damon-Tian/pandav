<template>
  <div class="main-container">
    <top-nav />
    <left-bar @select-menu="selectMenu"/>
    <div class="right-block">
      <right-info :currentTab="currentTab"/>
      <camera />
    </div>
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
      currentTab: 1,
    }
  },
  methods: {
    selectMenu(i) {
      this.currentTab = i;
    },
  }
}
</script>

<style lang="less">
.main-container {
  //   background-color: #081940;
  width: 2560px;
  height: 1080px;
  position: relative;

  .right-block {
    position: absolute;
    right: 20px;
    top: 127px;
    display: flex;
  }
}
</style>
