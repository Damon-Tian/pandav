<template>
  <div class="electron">
    <info-block title="电子围栏">
      <div slot="titleRight" style="font-size: 12px">
        数据采集时间：{{ collectTime }}
      </div>
      <div class="info-content">
        <div class="electron__row">
          <div class="electron__row__title">核心区域</div>
          <div class="electron__row__info">
            <div class="electron-area">
              <div class="area-title">上一时段</div>
              <div class="area-number">
                {{ fenceData.personCountPrev.coreNum }}
              </div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">当前时段</div>
              <div class="area-number" style="color: #00eaff">
                {{ fenceData.personCountNow.coreNum }}
              </div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">短信通知人次</div>
              <div class="area-number" style="color: #d9ea16">
                {{ fenceData.numOfCoreAreas }}
              </div>
            </div>
          </div>
        </div>
        <div class="electron__row">
          <div class="electron__row__title">一般</div>
          <div
            class="electron__row__info"
            style="
              border: 1px solid #1286b1;
              background: rgba(0, 29, 155, 40%);
              box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;
            "
          >
            <div class="electron-area">
              <div class="area-title">上一时段</div>
              <div class="area-number">
                {{ fenceData.personCountPrev.generalNum }}
              </div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">当前时段</div>
              <div class="area-number" style="color: #00eaff">
                {{ fenceData.personCountNow.generalNum }}
              </div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">短信通知人次</div>
              <div class="area-number" style="color: #d9ea16">
                {{ fenceData.numOfGeneralAreas }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </info-block>
  </div>
</template>

<script>
import {
  get_electronic_fence_count,
  get_targeted_sms_data,
  get_elec_heatmap_geojson,
  get_elec_person_geojson
} from "@/api/elec"
import { formatTime } from "@/utils"
const mapId = "人员热力图"
const mapId1 = "人员轨迹"
import mapUtil from "@/mixins/mapUtil"
export default {
  components: {},
  mixins: [mapUtil],
  data() {
    return {
      fenceData: {
        numOfCoreAreas: 0,
        numOfGeneralAreas: 0,
        totalNum: 0,
        collectTime: "",
        personCountNow: {
          generalNum: 0,
          coreNum: 0
        },
        personCountPrev: {
          generalNum: 0,
          coreNum: 0
        }
      }
    }
  },
  computed: {
    collectTime() {
      let time = ""
      if (this.fenceData.collectTime) {
        time = formatTime(this.fenceData.collectTime)
      }
      return time
    }
  },
  beforeDestroy() {
    this.removeMap()
  },
  mounted() {
    this.getElectronicFenceCount()
    this.getTargetedSmsData()
    this.initHeatMap()
    this.initPersonMap()
  },
  methods: {
    //热力图接口
    async getElectronicFenceCount() {
      const data = await get_electronic_fence_count()
      this.fenceData.personCountPrev = data.personCountPrev
      this.fenceData.personCountNow = data.personCountNow
      this.fenceData.collectTime = data.collectTime
    },
    //靶向短信接口
    async getTargetedSmsData() {
      const data = await get_targeted_sms_data()
      this.fenceData.totalNum = data.totalNum
      this.fenceData.numOfCoreAreas = data.numOfCoreAreas
      this.fenceData.numOfGeneralAreas = data.numOfGeneralAreas
    },
    async initHeatMap() {
      const geoData = await get_elec_heatmap_geojson()
      this.setLayer(4, mapId, geoData)
    },
    async initPersonMap() {
      const geoData = await get_elec_person_geojson()
      this.setLayer(2, mapId1, geoData)
    },
    removeMap() {
      this.removeMap(4, mapId)
      this.removeMap(2, mapId1)
    }
  }
}
</script>

<style lang="less" scoped>
.electron {
  .info-content {
    padding: 18px 20px;
  }

  &__row {
    &__title {
      margin-bottom: 11px;
      color: #7ecef4;
      font-size: 14px;
    }

    &__info {
      display: flex;
      height: 74px;
      align-items: center;
      border: 1px solid #ff5b5a;
      margin-bottom: 20px;
      background: rgba(255, 91, 90, 22%);
      box-shadow: 0 0 12px 0 rgba(255, 91, 90, 40%) inset;

      .area-title {
        margin-bottom: 6px;
        color: #d8d8d8;
        font-size: 14px;
      }

      .area-number {
        color: #19e194;
        font-size: 24px;
      }

      .electron-area {
        width: 33.33%;
        text-align: center;
      }

      .separated-line {
        width: 1px;
        height: 26px;
        background: #666;
      }
    }
  }
}
</style>
