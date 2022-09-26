<template>
  <div>
    <infoBlock>
      <div class="info-content">
        <div class="env-first__top">
          <div class="top-circle">
            <span>4</span>
            <span>总数</span>
          </div>
          <div class="top-data">
            <p>
              <span>在线设备</span>
              <span>4台</span>
            </p>
            <p>
              <span>在线设备</span>
              <span>4台</span>
            </p>
          </div>
        </div>
        <div class="env-first__bottom">
          <li
            v-for="item in positionList"
            :key="item.name"
            :class="currentPosition === item.name ? 'active' : ''"
            @click="positionClick(item)"
          >
            <span></span>
            {{ item.name }}
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
              {{ labelInfo.name }}
            </span>
            <span>
              <span class="label-color">设备编号：</span>
              {{ labelInfo.mark }}
            </span>
          </div>

          <div class="label-inline">
            <span>
              <span class="label-color">管护站：</span>
              {{ labelInfo.maintainPosition }}
            </span>
            <span>
              <span class="label-color">运行状态：</span>
              {{ labelInfo.status }}
            </span>
          </div>

          <div class="label-inline">
            <span>
              <span class="label-color">维护人：</span>
              {{ labelInfo.maintainPerson }}
            </span>
            <span>
              <span class="label-color">电话：</span>
              {{ labelInfo.tel }}
            </span>
          </div>

          <div>
            <span class="label-color">设备地点：</span>
            {{ labelInfo.equipPosition }}
          </div>

          <div>
            <span class="label-color">经纬度：</span>
            {{ labelInfo.jwd }}
          </div>

          <div class="get-more">更多信息></div>
        </div>
        <div class="env-second__form">
          <div v-for="item in formInfo" :key="item.name" class="form-block">
            <span class="form-label">
              {{ item.label }}
            </span>
            <span>{{ item.content }}</span>
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

export default {
  components: { infoBlock },
  data() {
    return {
      currentPosition: "",
      positionList: [
        { name: "鸡冠山巴栗坪保护站" },
        { name: "公园外喂猴处" },
        { name: "公园内猴子坡" },
        { name: "宝山村回龙沟猴区" }
      ],
      labelInfo: {
        name: "动环设备",
        mark: "003123",
        maintainPosition: "回龙沟",
        status: "正常",
        maintainPerson: "周于",
        tel: 13981777981,
        equipPosition: "宝山村回龙沟猴区",
        jwd: "103.321323, 123.13123"
      },
      formInfo: [
        { label: "温度", content: "30.6度" },
        { label: "温度", content: "54.8%RH" },
        { label: "风向", content: "0.23" },
        { label: "风向", content: "0.99m/s" },
        { label: "噪声", content: "52.1dB" },
        { label: "噪声", content: "120.0hPa" },
        { label: "PM2.5", content: "11.8ug/m" },
        { label: "PM2.5", content: "13,4ug.m" }
      ]
    }
  },
  mounted() {
    console.log(1)

    let chart = document.querySelector(".env-second__chart-content")
    const envChart = new Charts(chart)

    const option1 = {
      title: {},
      xAxis: {
        boundaryGap: false,
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
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
          data: [100, 2230, 1900, 2100, 3500, 4200, 3985],
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
          data: [2000, 900, 1230, 2500, 1100, 2985, 3200],
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
  methods: {
    positionClick(item) {
      this.currentPosition = item.name
    }
  }
}
</script>

<style lang="less" scoped>
.env-first__top {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .top-circle {
    display: flex;
    width: 106px;
    height: 106px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url("../../assets/img/info-icon__circle.png");
  }

  .top-data {
    width: 140px;

    p {
      position: relative;

      &:first-child {
        margin-bottom: 20px;
      }

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
    background: rgb(0 108 255 / 20%);
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
      background: rgb(35 217 251 / 25%);
      /* stylelint-disable-next-line no-descending-specificity */
      span {
        background: url("../../assets/img/icon-info__position-active.png");
        color: #01d4f9;
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
    margin-top: 20px;
    font-size: 14px;
    letter-spacing: 1px;

    .form-block {
      .form-label {
        width: 78px;
        background-color: rgb(0 108 255 / 20%);
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
        background: rgb(1 212 249 / 20%);
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
      margin: -30px 0 -25px;
    }
  }
}
</style>
