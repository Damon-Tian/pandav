<template>
  <div
    v-if="alarmList.length"
    class="alarm-info"
    :class="{ 'alarm-info-scroll': more }"
    :style="{
      left: isCollapse ? '140px' : '264px'
    }"
  >
    <div
      style="position: relative; width: 100%"
      :style="{
        height: !more
          ? '40px'
          : alarmList.length > 5
          ? 200 + 'px'
          : alarmList.length * 40 + 'px'
      }"
    >
      <div
        ref="alarmBox"
        class="alarm-info__box"
        :style="{ '--y': -(scrollIndex - 1) * 40 + 'px' }"
      >
        <div
          v-for="(item, index) in scrollList"
          :key="index"
          class="alarm-info__left"
          :class="{ 'alarm-info__active-title': item.checked }"
          @mouseenter="handleStopAutoScroll"
          @mouseleave="handleMouseLeave"
          @click="handleClick(item)"
        >
          <img
            class="alarm-info__img"
            src="../../assets/img/svgIcon/报警.svg"
            alt=""
          />
          <div class="alarm-info__title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <i v-if="alarmList.length > 1" class="alarm-info__icon" @click="loadmore">
      <countTo :start-val="startVal" :end-val="endVal" :duration="1000" />
    </i>
  </div>
</template>

<script>
import mixins from "@/mixins"
import mapUtil from "@/mixins/mapUtil"
import { get_patrol_detail_geojson } from "@/api/line"
export default {
  components: {},
  mixins: [mixins, mapUtil],
  props: {
    //左边tabs是否展开
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: true,
      alarmList: [],
      startVal: 0,
      endVal: 0,
      more: false,
      timmer: null,
      scrollIndex: 1
    }
  },
  computed: {
    scrollList() {
      const list = this.more
        ? this.alarmList
        : this.alarmList.concat([this.alarmList[0]])
      return list
    },
    orgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    }
  },
  watch: {
    alarmList(newvalue, oldvalue) {
      this.startVal = oldvalue.length
      this.endVal = newvalue.length
    }
  },
  beforeDestroy() {
    this.handleStopAutoScroll()
  },
  mounted() {
    setTimeout(() => {
      const data = [
        {
          title: "红外相机(346F2403E097)抓拍到事件",
          type: "抓拍",
          id: 1
        },
        {
          title: "红外相机(346F2403E098)抓拍到事件点的",
          type: "抓拍",
          id: 2
        },
        {
          title: "红外相机(346F2403E099)抓拍到事件反反复复",
          type: "抓拍",
          id: 3
        },
        {
          title: "红外相机(346F2403E067)抓拍到事件",
          type: "抓拍",
          id: 4
        },
        {
          title: "红外相机(346F2403E057)抓拍到事件",
          type: "抓拍",
          id: 5
        },
        {
          title: "用户及时上传(346F2403E057)",
          type: "事件",
          id: 6
        }
      ]
      data.forEach((item) => {
        item.checked = false
      })
      this.alarmList = data
      if (this.alarmList.length > 1) {
        this.handleAutoScroll()
      }
    }, 2000)
  },
  methods: {
    loadmore() {
      this.more = !this.more
      if (this.more) {
        this.handleStopAutoScroll()
        this.scrollIndex = 1
      } else {
        this.handleAutoScroll()
      }
    },
    handleStopAutoScroll() {
      clearInterval(this.timmer)
    },
    handleAutoScroll() {
      this.timmer = setInterval(() => {
        if (this.alarmList.length + 1 === this.scrollIndex) {
          this.scrollIndex = 1
          this.$nextTick(() => {
            this.$refs.alarmBox.style.transition = "none"
          })
        } else {
          this.$refs.alarmBox.style.transition = "all 0.5s"
          this.scrollIndex++
        }
      }, 5000)
    },
    handleMouseLeave() {
      if (!this.more) {
        this.handleAutoScroll()
      }
    },
    async handleClick(item) {
      item.checked = !item.checked
      if (item.type == "抓拍") {
        //
      }
      if (item.type == "事件") {
        //
        if (item.checked) {
          const geoData = await get_patrol_detail_geojson(this.orgId, {
            pageSize: 1
          })
          this.setLayer(2, item.title, geoData)
          //飞到定位点位
          this.flyTo(geoData.slice(0, 1))
        } else {
          this.removelayer(2, item.title)
          this.reset()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.alarm-info {
  position: absolute;
  top: 37px;
  display: flex;
  overflow: hidden;
  width: 400px;
  padding: 0 10px;
  border: 1px solid #ff3d3d;
  background: rgba(255, 50, 50, 30%);
  border-radius: 4px;
  color: #fffefe;
  cursor: pointer;
  transition: all 0.5s;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  /* 滚动条上的滚动滑块 */
  &::-webkit-scrollbar-thumb {
    background: #3b60ab;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  &__left {
    display: flex;
    height: 40px;
    align-items: center;
    line-height: 40px;
  }

  &__box {
    position: relative;
    width: 100%;
    transform: translateY(var(--y));
  }

  &__title {
    margin-left: 11px;
    font-size: 14px;
  }

  &__active-title {
    color: #23d9fb;
  }

  &__img {
    width: 30px;
    height: 30px;
  }

  &__icon {
    position: sticky;
    top: 10px;
    right: 10px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #ff3d3d;
    border-radius: 50%;
    cursor: pointer;
    line-height: 20px;
    text-align: center;
  }
}

.alarm-info-scroll {
  overflow: auto;
}
</style>
