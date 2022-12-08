<template>
  <info-block title="事件提醒" class="event-remind">
    <div class="info-content">
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
import infoBlock from "../infoBlock.vue"
import SwiperTable from "@/components/swiperTable/index.vue"
import {
  get_patrol_by_report,
  get_patrol_detail_geojson_item,
  get_patrol_detail
} from "@/api/line"
import { get_device_by_devicesn, get_camera_geojson_item } from "@/api/device"
import mapUtil from "@/mixins/mapUtil"
export default {
  components: {
    infoBlock,
    SwiperTable
  },
  mixins: [mapUtil],
  props: {
    alarmList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      config: {
        columnWidth: [230, 156],
        swiperHeight: 280
      },
      needRemoveChecked: []
    }
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
.event-remind {
  .info-content {
    overflow: scroll;
    height: 320px;
    padding: 20px;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  :deep .swiper-table__data__box {
    margin-top: 5px !important;
  }
}
</style>
