<template>
  <div class="weather-time">
    <div class="weather-time__timeinfo">{{ time }} {{ week }}</div>
    <div class="weather-time__weatherinfo">
      <img src="../assets/img/weather-cloudy.png" alt="" />
      <span class="weather-time__weatherinfo__text">多云 18℃</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      week: ""
    }
  },
  mounted() {
    this.getDate()
    setInterval(() => {
      this.getDate()
    }, 1000 * 60)
  },
  methods: {
    getDate() {
      this.time = this.DateFormat(new Date(), "yyyy 年 MM 月 dd 日 hh : mm")
      this.week = this.getWeek()
    },
    DateFormat(date, fmt) {
      fmt = fmt || "yyyy-MM-dd hh:mm:ss"
      if (date === null || typeof date === "undefined" || date === "") {
        return null
      } else {
        // 时间要转成obj，否则报错
        date = new Date(date)
      }
      var o = {
        "M+": date.getMonth() + 1, // 月
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        )
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          )
        }
      }
      return fmt
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
