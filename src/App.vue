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
