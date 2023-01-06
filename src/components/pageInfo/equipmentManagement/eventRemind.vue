<template>
  <info-block class="event-remind">
    <div slot="title">
      <div class="tabs">
        <div
          v-for="item in tabs"
          :key="item"
          class="tab"
          :class="{ 'active-tab': item === currentTab }"
          @click="currentTab = item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div v-if="currentTab == '事件列表'" class="info-content">
      <SwiperTable
        v-if="alarmList.length"
        :config="config"
        :data="alarmList"
        @swiperItemClick="swiperItemClick"
      />
    </div>
    <div v-if="currentTab == '设备列表'" class="info-content">
      <device-list />
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
import SwiperTable from "@/components/swiperTable/index.vue"
import deviceList from "./deviceList.vue"
import { get_device_by_devicesn, get_camera_geojson_item } from "@/api/device"
import mapUtil from "@/mixins/mapUtil"
export default {
  components: {
    infoBlock,
    SwiperTable,
    deviceList
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
      needRemoveChecked: [],
      tabs: ["事件列表", "设备列表"],
      currentTab: "事件列表"
    }
  },
  methods: {
    async swiperItemClick(item) {
      // // 绘制红外相机点位
      if (item.checked) {
        const cameraDetail = await get_device_by_devicesn({
          deviceSn: item.deviceSn
        })
        const geoData = [get_camera_geojson_item(cameraDetail)]
        const center = geoData[0].geometry.coordinates
        this.flyTo({
          center: center,
          zoom: 19
        })
      } else {
        this.reset()
      }
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
    font-size: 13px;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  :deep .swiper-table__data__box {
    margin-top: 5px !important;
  }

  .tabs {
    display: flex;
    margin-bottom: 10px;
  }

  .tab {
    padding-bottom: 5px;
    color: #d6d5d5;
    cursor: pointer;
    font-size: 18px;

    & + .tab {
      margin-left: 20px;
    }
  }

  .active-tab {
    border-bottom: 1px solid #00aeff;
    color: #fff;
  }
}
</style>
