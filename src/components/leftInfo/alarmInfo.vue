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
          <div v-if="item.source == 2" class="alarm-info__title">
            {{ formatOrgId(item.orgId) }}-{{ item.putPerson }}上传事件
          </div>
          <div v-else class="alarm-info__title">
            红外相机({{ item.deviceSn }})抓拍到事件
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
import {
  get_patrol_by_report,
  get_patrol_detail_geojson_item,
  get_patrol_detail
} from "@/api/line"
import { get_device_by_devicesn, get_camera_geojson_item } from "@/api/device"
import { get_real_time_shoot } from "@/api/mapPopupInfo"
import { get_org } from "@/api/station"
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
      scrollIndex: 1,
      timmer1: null,
      orgIds: [],
      needRemoveChecked: []
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
    this.removeAll()
  },
  async mounted() {
    this.getList()
    this.timmer1 = setInterval(() => {
      this.getList()
    }, 10 * 60 * 1000)
    if (this.alarmList.length > 1) {
      this.handleAutoScroll()
    }
    const { records } = await get_org({ pageNumber: 1, pageSize: 999 })
    this.orgIds = records
  },
  methods: {
    async getList() {
      let { records } = await get_real_time_shoot({
        pageNumber: 1,
        pageSize: 10
      })
      console.log(records)
      records = records.map((item) => item.realtimeShootVos[0])
      console.log(records)
      records.forEach((item) => {
        const oldItem = this.alarmList.find(
          (alarm) => alarm.deviceSn == item.deviceSn
        )
        item.checked = oldItem ? oldItem.checked : false
      })
      this.alarmList = records
    },
    formatOrgId(orgId) {
      const org = this.orgIds.find((item) => item.id == orgId)
      return org ? org.name : ""
    },
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
      clearInterval(this.timmer1)
    },
    handleAutoScroll() {
      this.timmer = setInterval(() => {
        if (!this.needRemoveChecked.length) {
          if (this.alarmList.length + 1 === this.scrollIndex) {
            this.scrollIndex = 1
            this.$nextTick(() => {
              this.$refs.alarmBox.style.transition = "none"
            })
          } else {
            this.$refs.alarmBox.style.transition = "all 0.5s"
            this.scrollIndex++
          }
        }
      }, 5000)
    },
    handleMouseLeave() {
      if (!this.more) {
        this.handleAutoScroll()
      }
    },
    getNeedChecked() {
      this.needRemoveChecked = this.alarmList.filter((item) => item.checked)
    },
    removeAll() {
      this.needRemoveChecked.forEach((item) => {
        if (item.source == 2) {
          this.removelayer(2, item.deviceSn)
        } else {
          this.removelayer(1, item.deviceSn)
        }
      })
    },
    async handleClick(item) {
      //source 0,1红外相机，2事件上传
      item.checked = !item.checked

      if (item.source == 2) {
        // 巡护记录当前事件点位
        if (item.checked) {
          const patrolRecord = await get_patrol_by_report({
            reportNum: item.deviceSn
          })
          const patrolDetail = await get_patrol_detail({
            id: patrolRecord.patrolId
          })

          const geoData = [get_patrol_detail_geojson_item(patrolDetail)]
          if (!this.hasLayer("巡护路线")) {
            this.setLayer(2, item.deviceSn, geoData)
          }
          const currentReport = patrolDetail.reportDTOList.find(
            (report) => report.reportNum == item.deviceSn
          )
          const center = [currentReport.longitude, currentReport.latitude]
          //飞到定位点位
          this.flyTo({
            center: center,
            zoom: 18
          })
        } else {
          this.removelayer(2, item.deviceSn)
          this.reset()
        }
      } else {
        // 绘制红外相机点位
        if (item.checked) {
          const cameraDetail = await get_device_by_devicesn({
            deviceSn: item.deviceSn
          })
          const geoData = [get_camera_geojson_item(cameraDetail)]
          if (!this.hasLayer("红外相机")) {
            this.setLayer(1, item.deviceSn, geoData)
          }
          const center = geoData[0].geometry.coordinates
          this.flyTo({
            center: center,
            zoom: 20
          })
        } else {
          this.removelayer(1, item.deviceSn)
          this.reset()
        }
      }
      this.getNeedChecked()
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
