<template>
  <div class="main-container">
    <top-nav />
    <left-bar />
    <div class="right-block">
      <right-info />
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
