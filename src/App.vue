<template>
  <div id="app">
    <default-layout />
  </div>
</template>

<script>
import defaultLayout from "@/layout/default"

export default {
  components: { defaultLayout }
}
</script>

<style lang="less">
#app {
  // width: 2560px;
  // max-width: 2560px;
  overflow: hidden;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: #081940;

  .main-container {
    position: relative;
    //   background-color: #081940;
    width: 1920px;
    height: 1080px;

    .right-block {
      position: absolute;
      z-index: 2;
      top: 127px;
      right: 20px;
      display: flex;
    }
  }
}
</style>
