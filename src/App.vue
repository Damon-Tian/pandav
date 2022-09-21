<template>
  <div id="app">
    <!-- <dv-full-screen-container class="main-container"> -->
    <div class="main-container">
      <top-nav />
      <left-bar />
      <div class="right-block">
        <div>12</div>
        <camera />
      </div>
      <router-view />
    </div>
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
import topNav from "@/components/nav";
import leftBar from "@/components/leftBar";
import camera from "@/components/camera.vue";

export default {
  components: {
    topNav,
    leftBar,
    camera
  },
  beforeMount() {}
};
</script>

<style lang="less">
#app {
  background-color: #081940;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 2560px;
  max-width: 2560px;
  overflow: hidden;
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
}
</style>
