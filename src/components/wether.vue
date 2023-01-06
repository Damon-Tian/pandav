<template>
  <div class="weather">
    <div class="weather-time">
      <div class="weather-time__timeinfo">{{ time }} {{ week }}</div>
      <div class="weather-time__weatherinfo">
        <!-- <img src="../assets/img/weather-cloudy.png" alt="" /> -->
        <span v-if="weather" class="weather-time__weatherinfo__text"
          >{{ weather.text }} {{ weather.temp }}℃</span
        >
      </div>
    </div>
    <div class="version">天地图数据22年（大屏）</div>
  </div>
</template>

<script>
import { DateFormat } from "@/utils"
import { get_weather } from "@/api/user"
export default {
  data() {
    return {
      time: "",
      week: "",
      weather: null
    }
  },
  mounted() {
    this.getDate()
    setInterval(() => {
      this.getDate()
    }, 1000 * 60)
  },
  async created() {
    this.weather = await get_weather()
  },
  methods: {
    getDate() {
      this.time = DateFormat(new Date(), "yyyy 年 MM 月 dd 日 hh : mm")
      this.week = this.getWeek()
    },
    getWeek() {
      var tempDate = new Date()

      var days = tempDate.getDay()
      var week

      switch (days) {
        case 1:
          week = "星期一"
          break
        case 2:
          week = "星期二"
          break
        case 3:
          week = "星期三"
          break
        case 4:
          week = "星期四"
          break
        case 5:
          week = "星期五"
          break
        case 6:
          week = "星期六"
          break
        case 0:
          week = "星期日"
          break
      }
      return week
    }
  }
}
</script>
<style scoped lang="less">
.weather {
  position: absolute;
  z-index: 2;
  top: 90px;
  right: 20px;
  min-width: 460px;

  .weather-time {
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

  .version {
    color: #bbb;
    font-size: 12px;
    opacity: 0.5;
    text-align: right;
  }
}
</style>
