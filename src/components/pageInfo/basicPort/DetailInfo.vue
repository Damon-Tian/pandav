<template>
  <info-block key="asd" title="详细信息">
    <div class="info-content port-detail">
      <div class="p-label-inline">
        <div class="p-label-info">
          <span>站点名称：</span>
          <span>{{ dataDetail.name }}</span>
        </div>
        <div class="p-label-info">
          <span>建设时间：</span>
          <span>{{ dataDetail.buildTime || "--" }}年</span>
        </div>
      </div>
      <div class="p-label-inline">
        <div class="p-label-info">
          <span>占地面积：</span>
          <span>{{ dataDetail.floorArea || "--" }}㎡</span>
        </div>
        <div class="p-label-info">
          <span>建筑面积：</span>
          <span>{{ dataDetail.coveredArea || "--" }}㎡</span>
        </div>
      </div>
      <div class="p-label-info">
        <span>规划管护面积： </span>
        <span>{{ dataDetail.protectArea || "--" }}公顷</span>
      </div>
      <div class="p-label-info" style="margin-bottom: 20px">
        <span>站点位置是否在大熊猫公园内： </span>
        <span>是</span>
      </div>
      <SwiperTable
        v-if="alarmList.length"
        :config="config"
        :data="alarmList"
        @swiperItemClick="swiperItemClick"
      />
    </div>
  </info-block>
</template>

<script>
import SwiperTable from "@/components/swiperTable/index.vue"
import {
  get_patrol_by_report,
  get_patrol_detail_geojson_item,
  get_patrol_detail
} from "@/api/line"
import { get_device_by_devicesn, get_camera_geojson_item } from "@/api/device"
import mapUtil from "@/mixins/mapUtil"
export default {
  components: { SwiperTable },
  mixins: [mapUtil],
  props: {
    dataDetail: {
      type: Object,
      default: () => {}
    },
    alarmList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      config: {
        header: ["事件名称", "时间"],
        headerHeight: 32,
        columnWidth: [230, 156],
        headerBGC: "rgba(0, 108, 255, 0.2)"
      },
      needRemoveChecked: []
    }
  },
  beforeDestroy() {
    console.log(this.needRemoveChecked)
    this.needRemoveChecked.forEach((item) => {
      this.removelayer(item.source == 2 ? 2 : 1, item.deviceSn)
    })
    this.reset()
  },
  methods: {
    getNeedChecked() {
      this.needRemoveChecked = this.alarmList.filter((item) => item.checked)
    },
    async swiperItemClick(item) {
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
          this.setLayer(2, item.deviceSn, geoData)
          const currentReport = patrolDetail.reportDTOList.find(
            (report) => report.reportNum == item.deviceSn
          )
          const center = [currentReport.longitude, currentReport.latitude]
          //飞到定位点位
          this.flyTo({
            center: center,
            zoom: 20
          })
        } else {
          this.removelayer(2, item.deviceSn)
          this.reset()
        }
      } else {
        // // 绘制红外相机点位
        if (item.checked) {
          const cameraDetail = await get_device_by_devicesn({
            deviceSn: item.deviceSn
          })
          const geoData = [get_camera_geojson_item(cameraDetail)]
          this.setLayer(1, item.deviceSn, geoData)
          const center = geoData[0].geometry.coordinates
          this.flyTo({
            center: center,
            zoom: 18
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
.port-detail {
  padding: 22px 10px 30px 20px;
}

.event-remind {
  &__content {
    overflow: scroll;
    height: 287px;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  &__item {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    border-left: 4px solid #00aeff;
    margin-bottom: 10px;
    background: #082044;
    color: #fff;
    font-size: 14px;

    &__left {
      overflow: hidden;
      width: 218px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
