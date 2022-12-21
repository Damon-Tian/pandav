<template>
  <div>
    <infoBlock>
      <div class="info-content">
        <div class="env-first__top">
          <div class="top-circle">
            <span>{{ totalData }}</span>
            <span>总数</span>
          </div>
          <div class="top-data">
            <p>
              <span>在线设备</span>
              <span>{{ online }} 台</span>
            </p>
            <p>
              <span>离线设备</span>
              <span>{{ offline }} 台</span>
            </p>
          </div>
        </div>
        <div class="env-first__bottom">
          <li
            v-for="item in positionList"
            :key="item.fkOrgId"
            :class="currentPosition === item.fkOrgId ? 'active' : ''"
            @click="positionClick(item)"
          >
            <span></span>
            {{ item.orgName.replace("大熊猫国家公园", "") }}
          </li>
        </div>
      </div>
    </infoBlock>
    <infoBlock v-if="labelInfo">
      <div class="env-second info-content">
        <div class="env-second__label-info">
          <div class="label-inline">
            <span>
              <span class="label-color">名称：</span>
              {{ labelInfo.deviceName }}
            </span>
            <span>
              <span class="label-color">设备编号：</span>
              {{ labelInfo.deviceSn }}
            </span>
          </div>

          <div class="label-inline">
            <span>
              <span class="label-color">运行状态：</span>
              <span v-show="labelInfo.deviceStatus === 0" style="color: #3ac268"
                >正常</span
              >
              <span v-show="labelInfo.deviceStatus === 1" style="color: #f82d2d"
                >异常</span
              >
            </span>
          </div>

          <div>
            <span class="label-color">设备地点：</span>
            {{ labelInfo.orgName }}
          </div>
          <div>
            <span class="label-color">设备地点：</span>
            {{ labelInfo.deviceAddress }}
          </div>

          <div>
            <span class="label-color">经纬度：</span>
            {{ labelInfo.latitude?.toString().slice(0, 10) }},{{
              labelInfo.longitude?.toString().slice(0, 10)
            }}
          </div>

          <!-- <div style="margin-top: 12px" class="get-more">更多信息></div> -->
        </div>
        <div class="env-second__form">
          <div v-for="item in formInfo" :key="item">
            <div class="form-block">
              <span class="form-label">
                {{ item }}
              </span>
              <span>{{ currentStatisc[item] }}</span>
            </div>
          </div>
        </div>
        <div class="env-second__chart">
          <div class="env-second__chart-title">
            <span>空气质量小时变化</span>
            <div class="chart-title__legend">
              <span>PM10</span>
              <span>PM2.5</span>
            </div>
          </div>
          <div class="env-second__chart-content"></div>
        </div>
      </div>
    </infoBlock>
  </div>
</template>

<script>
import Charts from "@jiaminghi/charts"
import infoBlock from "./infoBlock"
import { get_ecological_equipment_geojson } from "@/api/device"
import {
  get_ecologicalequipment,
  get_env_detail,
  get_env_trend
} from "@/api/environment"
const mapId = "生态环境"
import mapUtil from "@/mixins/mapUtil"

export default {
  components: { infoBlock },
  mixins: [mapUtil],
  data() {
    return {
      currentPosition: "",
      positionList: [],
      labelInfo: null,
      formInfo: [
        "温度",
        "湿度",
        "气压",
        "噪声",
        "风速",
        "风向",
        "pm2.5",
        "pm10"
      ],
      currentStatisc: {},
      formRule: [
        "保护站",
        "设备地点",
        "设备编号",
        "设备名称",
        "时间",
        "经度",
        "纬度"
      ],
      environmentInfo: [],
      totalData: "",
      online: "",
      offline: "",
      chartData: [],
      chartX: [],
      PM25List: [],
      PM10List: [],
      clock: "",
      envChart: null
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    },
    detail() {
      return this.$store.state.app.map.feature
    },
    currentOrgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    }
  },
  watch: {
    currentPosition() {
      // this.removeMap()
      // this.initMap()
    },
    detail() {
      if (this.detail.properties?.id) {
        const currentDevice = this.positionList.find(
          (item) => item.fkOrgId == this.detail.properties.orgId
        )
        this.positionClick(currentDevice)
      }
    }
  },
  mounted() {
    this.getInfo()
  },
  beforeDestroy() {
    this.removeMap()
  },
  methods: {
    async getInfo() {
      const resData = await get_ecologicalequipment()
      this.positionList = resData.devices
      this.online = resData.online
      this.offline = resData.offline
      this.totalData = parseInt(resData.online) + parseInt(resData.offline)

      const defaultDevice = this.positionList.find(
        (item) => item.fkOrgId == this.currentOrgId
      )
      if (defaultDevice) {
        this.positionClick(defaultDevice)
      } else {
        this.initMap()
      }
    },
    positionClick(item) {
      if (item.fkOrgId !== this.currentPosition) {
        this.currentPosition = item.fkOrgId
        this.labelInfo = item
        this.getCurrentStatisc()
      } else {
        this.currentPosition = ""
        this.labelInfo = null
        this.envChart = null
      }
      this.initMap()
    },
    async getEnvDetail() {
      const params = {
        pageNumber: 1,
        pageSize: 1
      }
      params.orgIds = [this.labelInfo.fkOrgId]
      const { records } = await get_env_detail(params)
      const {
        temperature,
        humidity,
        pressure,
        noise,
        windSpeed,
        windDirection,
        pm25,
        pm10
      } = records[0]
      this.currentStatisc = {
        温度: temperature,
        湿度: humidity,
        气压: pressure,
        噪声: noise,
        风速: windSpeed,
        风向: windDirection,
        "pm2.5": pm25,
        pm10: pm10
      }
    },
    async getCurrentStatisc() {
      this.getEnvDetail()
      const trends = await get_env_trend({
        orgId: this.labelInfo.fkOrgId
      })
      const PM10 = trends.find((item) => item.type == "PM10")
      const PM25 = trends.find((item) => item.type == "空气指数")
      if (!PM10) return
      this.chartX = PM10.trendInfoVOS.map((item) => item.time + ":00")
      this.PM10List = PM10.trendInfoVOS.map((item) => Number(item.value))
      this.PM25List = PM25.trendInfoVOS.map((item) => Number(item.value))
      this.$nextTick(() => {
        this.initChart()
      })
    },
    initChart() {
      if (!this.envChart) {
        const chart = document.querySelector(".env-second__chart-content")
        this.envChart = new Charts(chart)
      }
      let that = this
      const option1 = {
        title: {},
        xAxis: {
          boundaryGap: false,
          axisLabel: {
            formatter: function (v) {
              if (that.chartX.length > 10) {
                if (v.index % 2 === 0) {
                  return v.value
                } else {
                  return ""
                }
              } else {
                return v.value
              }
            },
            style: {
              fill: "white"
            }
          },
          axisLine: {
            style: {
              stroke: "rgba(178, 231, 255, 1)"
            }
          },
          data: this.chartX
        },
        yAxis: {
          data: "value",
          axisLabel: {
            style: {
              fill: "white"
            }
          },
          axisLine: {
            style: {
              stroke: "rgba(178, 231, 255, 1)"
            }
          },
          splitLine: {
            style: {
              stroke: "rgba(178, 231, 255, 0.2)"
            }
          }
        },
        color: ["#22FFCC", "#0066D2"],
        series: [
          {
            name: "PM10",
            data: this.PM10List,
            type: "line",
            smooth: true,
            lineStyle: {
              lineWidth: 2
            },
            linePoint: {
              show: false
            },
            lineArea: {
              show: true
            }
          },
          {
            name: "PM25",
            data: this.PM25List,
            type: "line",
            smooth: true,
            lineStyle: {
              lineWidth: 2
            },
            linePoint: {
              show: false
            },
            lineArea: {
              show: true
            }
          }
        ]
      }
      this.envChart.setOption(option1)
    },
    async initMap() {
      this.removelayer(1, mapId)
      let geoData = await get_ecological_equipment_geojson()
      if (this.currentPosition) {
        geoData = geoData.filter(
          (item) => item.properties.orgId == this.currentPosition
        )
      }
      this.setLayer(1, mapId, geoData)
    },
    removeMap() {
      this.removelayer(1, mapId)
    }
  }
}
</script>

<style lang="less" scoped>
.env-first__top {
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;

  .top-circle {
    display: flex;
    width: 106px;
    height: 106px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url("../../assets/img/info-icon__circle.png");

    span {
      position: relative;
      top: -2px;
      font-size: 14px;

      &:first-child {
        color: #00eaff;
        font-size: 36px;
      }
    }
  }

  .top-data {
    width: 150px;
    letter-spacing: 1px;

    p {
      position: relative;

      &:first-child {
        margin-bottom: 20px;
      }

      /* stylelint-disable-next-line no-descending-specificity */
      span {
        &:last-child {
          display: inline-block;
          margin-left: 30px;
        }
      }

      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 10px;
        background-color: #00ff12;
        border-radius: 50%;
        content: "";
      }

      &:nth-child(1) {
        &::before {
          background-color: #00ff12;
        }
      }

      &:nth-child(2) {
        &::before {
          background-color: #f82d2d;
        }
      }
    }
  }
}

.env-first__bottom {
  display: grid;
  padding: 10px;
  color: white;
  grid-gap: 10px;
  grid-template-columns: auto auto;

  li {
    display: inline-flex;
    width: 200px;
    height: 44px;
    box-sizing: border-box;
    align-items: center;
    padding: 10px;
    border: 1px solid #006cff;
    background: rgba(0, 108, 255, 20%);
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    /* stylelint-disable-next-line no-descending-specificity */
    span {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 10px;
      background: url("../../assets/img/icon-info__position.png");
    }

    &.active {
      background: rgba(36, 218, 250, 25%);
      color: #01d4f9;

      /* stylelint-disable-next-line no-descending-specificity */
      span {
        background: url("../../assets/img/icon-info__position-active.png");
      }
    }
  }
}

.env-second {
  padding: 12px 10px;

  &__label-info {
    letter-spacing: 2px;
    line-height: 32px;

    .label-color {
      color: #7ecef4;
      font-weight: 500;
    }

    .label-inline {
      display: flex;
      justify-content: space-between;

      & > * {
        width: 50%;
      }
    }
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    letter-spacing: 1px;

    .form-block {
      .form-label {
        width: 78px;
        align-items: center;
        background-color: rgba(0, 108, 255, 20%);
        color: #7ecef4;
        line-height: 32px;
      }

      /* stylelint-disable-next-line no-descending-specificity */
      span {
        display: inline-block;
        width: 116px;
        height: 32px;
        box-sizing: border-box;
        padding-left: 9px;
        border: 1px solid #006cff;
        background: rgba(1, 212, 249, 20%);
        line-height: 32px;
      }
    }
  }

  &__chart {
    width: 100%;

    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 22px;

      /* stylelint-disable-next-line no-descending-specificity */
      & > span {
        color: #fff;
        font-size: 16px;
        line-height: 30px;
      }
    }

    .chart-title__legend {
      /* stylelint-disable-next-line no-descending-specificity */
      span {
        &::before {
          position: relative;
          top: -2px;
          display: inline-block;
          width: 16px;
          height: 8px;
          margin: 0 10px;
          content: "";
        }

        /* stylelint-disable-next-line no-descending-specificity */
        &:first-child {
          margin-right: 20px;

          &::before {
            background-color: #2fc;
          }
        }

        &:last-child::before {
          background-color: #229aff;
        }
      }
    }

    &-content {
      width: 110%;
      height: 250px;
      margin: -30px 0 -45px;
    }
  }
}
</style>
