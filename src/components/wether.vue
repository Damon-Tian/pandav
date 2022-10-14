<template>
  <div class="weather-time">
    <div class="weather-time__timeinfo">2022 年 8 月 6 日 16 : 40 星期六</div>
    <div class="weather-time__weatherinfo">
      <img src="../assets/img/weather-cloudy.png" alt="" />
      <span class="weather-time__weatherinfo__text">多云 32℃</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="less">
.weather-time {
  position: absolute;
  z-index: 2;
  top: 80px;
  right: 20px;
  display: flex;
  height: 35px;
  align-items: center;
  padding: 0 27px;
  background: rgba(0, 0, 0, 60%);
  border-radius: 4px;
  color: #fff;
  font-size: 16px;

  &__timeinfo {
    margin-right: 64px;
    white-space: nowrap;
  }

  &__weatherinfo {
    display: flex;
    align-items: center;
    white-space: nowrap;

    &__text {
      margin-left: 11px;
    }
  }
}
</style>
