<template>
  <div
    v-if="alarmList.length"
    class="alarm-info"
    :style="{
      left: isCollapse ? '140px' : '264px',
      height: !more ? '40px' : alarmList.length * 40 + 'px'
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
        @mouseenter="handleStopAutoScroll"
        @mouseleave="handleMouseLeave"
      >
        <img
          class="alarm-info__img"
          src="../../assets/img/alarmInfo/warning.png"
          alt=""
        />
        <div
          class="alarm-info__title"
          @click="goRealtimeCapture('346F2403E097')"
        >
          {{ item.title }}
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
export default {
  components: {},
  mixins: [mixins],
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
      return this.more
        ? this.alarmList
        : this.alarmList.concat([this.alarmList[0]])
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
      this.alarmList = [
        {
          title: "红外相机(346F2403E097)抓拍到事件",
          id: 1
        },
        {
          title: "红外相机(346F2403E098)抓拍到事件点的",
          id: 2
        },
        {
          title: "红外相机(346F2403E099)抓拍到事件反反复复",
          id: 3
        },
        {
          title: "红外相机(346F2403E067)抓拍到事件",
          id: 4
        },
        {
          title: "红外相机(346F2403E057)抓拍到事件",
          id: 5
        }
      ]
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
  }

  &__icon {
    position: absolute;
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
</style>
