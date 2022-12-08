<template>
  <div class="swiper-table">
    <table v-if="config.header">
      <tr
        class="swiper-table__header"
        align="left"
        :style="{
          height: config.headerHeight ? config.headerHeight + 'px' : '',
          background: config.headerBGC ? config.headerBGC : ''
        }"
      >
        <th
          v-for="(item, index) in config.header"
          :key="index"
          :style="{
            lineHeight: config.headerHeight ? config.headerHeight + 'px' : '',
            width: config.columnWidth ? config.columnWidth[index] + 'px' : '',
            border: config.headerBorder
              ? config.headerBorder
              : '1px solid #006cff'
          }"
        >
          <div class="swiper-table__header__box">{{ item }}</div>
        </th>
      </tr>
    </table>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="swiper-slide"
          :class="{ 'is-active': item.checked }"
          @click="handleClick(item)"
        >
          <tr v-if="!$slots.swiperData" align="left" class="swiper-table__data">
            <td
              v-for="(i, ind) in item.data"
              :key="ind"
              :style="{
                width: config.columnWidth ? config.columnWidth[ind] + 'px' : ''
              }"
              class="swiper-table__data__td"
            >
              <div
                class="swiper-table__data__box"
                :style="{
                  width: config.columnWidth
                    ? config.columnWidth[ind] - 10 + 'px'
                    : ''
                }"
              >
                {{ i }}
              </div>
            </td>
          </tr>
          <slot v-else name="swiperData"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var swiperSetting = {}
import "swiper/swiper-bundle.min.css"
import "swiper/swiper-bundle.css"
import "swiper/swiper.min.css"
import Swiper, { Navigation, Pagination, Autoplay, EffectFade } from "swiper"

export default {
  components: {},

  props: {
    config: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // needRemoveChecked: []
    }
  },
  watch: {
    data: {
      handler(val) {
        this.$nextTick(() => {
          this.initSwiper()
        })
      },
      immediate: true
      // deep: true
    }
  },
  created() {},
  destroyed() {
    // 注销所有动作
    if (Object.getOwnPropertyNames(swiperSetting).length !== 0)
      swiperSetting.destroy(true, true)
  },
  methods: {
    //初始化
    initSwiper() {
      //如果没有数据则不加载new Swiper
      if (!this.data.length) return
      //如果后面有新增更新数据，则需要先销毁Swiper
      if (Object.getOwnPropertyNames(swiperSetting).length !== 0)
        swiperSetting.destroy(true, true)
      let that = this
      swiperSetting = new Swiper(".swiper-container", {
        direction: "vertical",
        slidesPerView: that.config.slidesPerView
          ? that.config.slidesPerView
          : 6,
        slidesPerGroup: 1,
        grabCursor: true,
        speed: 300,
        // loop: true, //可选选项，开启循环
        modules: [Autoplay],
        autoplay: {
          delay: 5000, //轮播切换的时间，单位是ms
          disableOnInteraction: false //鼠标放在轮播图上再离开是否取消轮播动画
        }
      })

      // 鼠标移入轮播图停止自动滚动，离开后继续自动轮播
      swiperSetting.el.onmouseover = function () {
        swiperSetting.autoplay.stop()
      }
      swiperSetting.el.onmouseout = function () {
        let result = that.data.some((item) => {
          return item.checked
        })
        if (!result) swiperSetting.autoplay.start()
      }
    },
    // getNeedChecked() {
    //   this.needRemoveChecked = this.alarmList.filter((item) => item.checked)
    // },
    handleClick(item) {
      //source 0,1红外相机，2事件上传
      item.checked = !item.checked
      this.$emit("swiperItemClick", item)
    }
  }
}
</script>
<style scoped lang="less">
.swiper-table {
  width: 100%;
  height: auto;
  color: #fff;

  .is-active {
    color: #23d9fb;
  }

  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 290px;

    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
  }

  &__header {
    height: 34px;

    th {
      line-height: 34px;
    }

    &__box {
      padding: 0 10px;
    }
  }

  &__data {
    height: 50px;

    &__box {
      overflow: hidden;
      height: 40px;
      padding-left: 10px;
      margin-top: 10px;
      background: #082044;
      line-height: 40px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__td:nth-child(1) {
      .swiper-table__data__box {
        border-left: 4px solid #00aeff;
      }
    }
  }

  table {
    width: 100%;
  }
}
</style>
