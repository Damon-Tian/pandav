<template>
  <info-block title="设备报警">
    <div class="info-content">
      <p>离线设备数 <span style="color: red">3</span></p>
      <div v-for="i in 3" :key="i" class="info-home__camera">
        <img src="@/assets/img/icon-info__camera.png" alt="" />
        <p>鸡冠山巴栗坪保护站C7摄像头已离线</p>
      </div>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "./infoBlock"
export default {
  components: { infoBlock }
}
</script>

<style lang="less" scoped>
.info-content {
  padding: 16px 11px;

  .info-home__camera {
    display: flex;
    height: 40px;
    align-items: center;
    margin: 10px 0;
    background: rgba(255, 0, 0, 15%);
    font-weight: 500;

    img {
      margin-right: 20px;
    }
  }
}
</style>
