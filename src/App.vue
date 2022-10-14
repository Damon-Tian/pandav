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
  // max-width: 2560px;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: #081940;

  .main-container {
    position: relative;
    //   background-color: #081940;
    width: 100%;
    height: 100vh;
  }
}
</style>
