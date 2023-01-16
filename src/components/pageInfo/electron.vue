<template>
  <div class="electron">
    <info-block title="电子围栏">
      <div slot="titleRight" style="font-size: 12px">
        热力图数据采集时间：{{ collectTime }}
      </div>
      <div class="info-content">
        <div class="electron__row">
          <div class="electron__row__title">核心区域</div>
          <div
            class="electron__row__info"
            style="
              border: none;
              background-color: transparent;
              box-shadow: none;
            "
          >
            <div class="electron__row__info__left">
              <div class="electron-area">
                <div class="area-title">上一时段</div>
                <div class="area-number">
                  <countTo
                    :start-val="0"
                    :end-val="fenceData.personCountPrev.coreNum"
                    :duration="3000"
                  />
                </div>
              </div>
              <div class="separated-line"></div>
              <div class="electron-area">
                <div class="area-title">当前时段</div>
                <div class="area-number" style="color: #00eaff">
                  <countTo
                    :start-val="0"
                    :end-val="fenceData.personCountNow.coreNum"
                    :duration="3000"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="separated-line"></div> -->
            <div class="electron__row__info__right">
              <div class="electron-area">
                <div class="area-title">短信通知人次</div>
                <div class="area-number" style="color: #d9ea16">
                  <countTo
                    :start-val="0"
                    :end-val="fenceData.numOfCoreAreas"
                    :duration="3000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="electron__row">
          <div class="electron__row__title">一般区域</div>
          <!-- border: 1px solid #1286b1;
              background: rgba(0, 29, 155, 40%);
              box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset; -->
          <div
            class="electron__row__info"
            style="
              border: none;
              background-color: transparent;
              box-shadow: none;
            "
          >
            <div
              class="electron__row__info__left"
              style="
                border: 1px solid #1286b1;
                background: rgba(0, 29, 155, 40%);
                box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;
              "
            >
              <div class="electron-area">
                <div class="area-title">上一时段</div>
                <div class="area-number">
                  <countTo
                    :start-val="0"
                    :end-val="fenceData.personCountPrev.generalNum"
                    :duration="3000"
                  />
                </div>
              </div>
              <div class="separated-line"></div>
              <div class="electron-area">
                <div class="area-title">当前时段</div>
                <div class="area-number" style="color: #00eaff">
                  <countTo
                    :start-val="0"
                    :end-val="fenceData.personCountNow.generalNum"
                    :duration="3000"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="separated-line"></div> -->
            <div
              class="electron__row__info__right"
              style="
                border: 1px solid #1286b1;
                background: rgba(0, 29, 155, 40%);
                box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;
              "
            >
              <div class="electron-area">
                <div class="area-title">短信通知人次</div>
                <div class="area-number" style="color: #d9ea16">
                  <countTo
                    :start-val="0"
                    :end-val="fenceData.numOfGeneralAreas"
                    :duration="1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </info-block>
    <info-block title="统计">
      <div slot="titleRight" class="icon" @click="exportUserCount">
        <img src="../../assets/icons/export.svg" title="导出统计数据" />
      </div>

      <div class="info-content">
        <el-date-picker
          v-model="timerange"
          size="small"
          format="yyyy/MM/dd"
          value-format="yyyyMMdd"
          type="daterange"
          style="width: 100%; margin-bottom: 20px"
          @change="getPersonHis"
        />
        <div class="statistic">
          <div class="electron__row">
            <div class="electron__row__title">核心区域</div>
            <div class="electron__row__info">
              <div class="electron-area">
                <div class="area-title">累计人数</div>
                <div class="area-number">
                  <countTo
                    :start-val="0"
                    :end-val="statistic.coreNum"
                    :duration="3000"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="electron__row">
            <div class="electron__row__title">一般区域</div>
            <div
              class="electron__row__info"
              style="
                border: 1px solid #1286b1;
                background: rgba(0, 29, 155, 40%);
                box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;
              "
            >
              <div class="electron-area">
                <div class="area-title">累计人数</div>
                <div class="area-number">
                  <countTo
                    :start-val="0"
                    :end-val="statistic.generalNum"
                    :duration="3000"
                  />
                </div>
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
  get_elec_person_geojson,
  get_electronic_person_his,
  export_Area_user_count
} from "@/api/elec"
import { formatTime, DateFormat, downloadBlob } from "@/utils"
const mapId = "人员热力图"
const mapId1 = "人员轨迹图"
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
      },
      timerange: [
        DateFormat(new Date(), "yyyy") + "0101",
        DateFormat(new Date(), "yyyyMMdd")
      ],
      statistic: {
        coreNum: 0,
        generalNum: 0
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
    },
    orgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    }
  },

  watch: {
    orgId() {
      this.initHeatMap()
      this.initPersonMap()
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
    this.getPersonHis()
  },
  methods: {
    async exportUserCount() {
      const params = {}
      if (this.timerange && this.timerange.length) {
        params.startTime = this.timerange[0]
        params.endTime = this.timerange[1]
      }
      const data = await export_Area_user_count(params)
      downloadBlob(data)
    },
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
      const geoData = await get_elec_heatmap_geojson(this.orgId)
      this.setLayer(4, mapId, geoData)
    },
    async initPersonMap() {
      const geoData = await get_elec_person_geojson(this.orgId)
      this.setLayer(2, mapId1, geoData)
    },
    async getPersonHis() {
      const params = {}
      if (this.timerange && this.timerange.length) {
        params.startTime = this.timerange[0]
        params.endTime = this.timerange[1]
      }
      const data = await get_electronic_person_his(params)
      const core = data.find((item) => item.areaType == "core")
      const general = data.find((item) => item.areaType == "general")
      this.statistic.coreNum = core && core.count
      this.statistic.generalNum = general && general.count
    },
    removeMap() {
      this.removelayer(4, mapId)
      this.removelayer(2, mapId1)
    }
  }
}
</script>

<style lang="less" scoped>
.electron {
  .info-content {
    padding: 18px 20px;
  }

  .statistic {
    display: flex;

    & > div {
      flex: 1;
      text-align: center;
    }

    & > div:last-child {
      margin-left: 20px;
    }

    & .electron__row__info {
      .electron-area {
        width: 100%;
      }
    }
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

      &__left {
        display: flex;
        width: 59%;
        height: 100%;
        align-items: center;
        border: 1px solid #ff5b5a;
        margin-right: 7px;
        background: rgba(255, 91, 90, 22%);
        box-shadow: 0 0 12px 0 rgba(255, 91, 90, 40%) inset;

        .electron-area {
          width: 50% !important;
        }
      }

      &__right {
        display: flex;
        width: 39%;
        height: 100%;
        align-items: center;
        border: 1px solid #ff5b5a;
        background: rgba(255, 91, 90, 22%);
        box-shadow: 0 0 12px 0 rgba(255, 91, 90, 40%) inset;

        .electron-area {
          width: 100% !important;
        }
      }

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

.icon {
  overflow: hidden;
  width: 26px;
  height: 26px;
  cursor: pointer;

  img {
    position: relative;
    width: 26px;
    height: 26px;
  }

  &:hover {
    img {
      left: -26px;
      filter: drop-shadow(#00eaff 26px 0);
    }
  }
}
</style>
