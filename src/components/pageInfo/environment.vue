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
            :key="item.orgName"
            :class="currentPosition === item.orgName ? 'active' : ''"
            @click="positionClick(item)"
          >
            <span></span>
            {{ item.orgName }}
          </li>
        </div>
      </div>
    </infoBlock>
    <infoBlock>
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
              <span class="label-color">保护站：</span>
              {{ labelInfo.orgName }}
            </span>
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

          <!-- <div class="label-inline">
            <span>
              <span class="label-color">维护人：</span>
              {{ labelInfo.maintainPerson }}
            </span>
            <span>
              <span class="label-color">电话：</span>
              {{ labelInfo.tel }}
            </span>
          </div> -->

          <div>
            <span class="label-color">设备地点：</span>
            {{ labelInfo.deviceAddress }}
          </div>

          <div>
            <span class="label-color">经纬度：</span>
            {{ labelInfo.latitude }},{{ labelInfo.longitude }}
          </div>

          <!-- <div style="margin-top: 12px" class="get-more">更多信息></div> -->
        </div>
        <div class="env-second__form">
          <div v-for="item in formInfo" :key="item.content">
            <div v-if="!formRule.includes(item.label)" class="form-block">
              <span class="form-label">
                {{ item.label }}
              </span>
              <span>{{ item.content }}</span>
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
import { get_ecologicalequipment } from "@/api/environment"
import { DateFormat, time_to_sec } from "@/utils/index"
import { environmentList } from "@/utils/environment"
const mapId = "生态环境"
import mapUtil from "@/mixins/mapUtil"
let list = environmentList
export default {
  components: { infoBlock },
  mixins: [mapUtil],
  data() {
    return {
      currentPosition: "",
      positionList: [],
      labelInfo: {},
      formInfo: [],
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
      PM10List: []
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    },
    detail() {
      return this.$store.state.app.feature
    }
  },
  watch: {
    currentArea() {
      this.currentPosition = this.currentArea
    },
    currentPosition() {
      this.removeMap()
      this.initMap()
    }
  },
  mounted() {
    let newList = []
    for (let j = 0; j < list.length; j++) {
      newList.push([])
      for (let i in list[j]) {
        newList[j].push({
          label: i,
          content: list[j][i],
          id: j.toString() + "1"
        })
      }
    }
    list = newList
    this.getInfo()
  },
  beforeDestroy() {
    console.log(this)
    this.removeMap()
  },
  methods: {
    async getInfo() {
      const resData = await get_ecologicalequipment()
      this.positionList = resData.devices
      this.online = resData.online
      this.offline = resData.offline
      this.totalData = parseInt(resData.online) + parseInt(resData.offline)
      this.positionClick(resData.devices[0])
    },
    positionClick(item) {
      this.currentPosition = item.orgName
      this.labelInfo = item
      for (let i = 0; i < list.length; i++) {
        if (list[i][0].content === item.orgName) {
          this.chartX.push(list[i][4].content)
          this.PM10List.push(list[i][13].content)
          this.PM25List.push(list[i][14].content)
          if (
            time_to_sec(list[i][4].content) >
            time_to_sec(DateFormat(new Date().getTime(), "hh:mm:ss"))
          ) {
            this.formInfo = list[i - 1]
            this.initChart()
            this.initMap()
            return
          }
        }
      }
    },
    initChart() {
      const chart = document.querySelector(".env-second__chart-content")
      const envChart = new Charts(chart)

      const option1 = {
        title: {},
        xAxis: {
          boundaryGap: false,
          axisLabel: {
            formatter: function (v) {
              let date = v.value
              return date.substring(0, 5)
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
        // legend: {
        //   top: "20%",
        //   right: 0,
        //   data: ["PM10", "PM25"],
        //   textStyle: {
        //     fill: "white"
        //   },
        //   icon: "rect",
        //   iconWidth: 10,
        //   iconStyle: {
        //     borderRadius: 0
        //   }
        // },
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
      envChart.setOption(option1)
    },
    async initMap() {
      const geoData = await get_ecological_equipment_geojson()
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
  padding: 22px 20px;

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
        background-color: rgba(0, 108, 255, 20%);
        color: #7ecef4;
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
