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
            :class="currentPosition === item.name ? 'active' : ''"
            v-for="item in positionList"
            :key="item.name"
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
          <div class="form-block" v-for="item in formInfo" :key="item.name">
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
  methods: {
    positionClick(item) {
      this.currentPosition = item.name
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
  }
}
</script>

<style lang="less" scoped>
.env-first__top {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .top-circle {
    width: 106px;
    height: 106px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url("../../assets/img/info-icon__circle.png");
  }
  .top-data {
    width: 140px;
    p {
      position: relative;
      span {
        &:last-child {
          display: inline-block;
          margin-left: 30px;
        }
      }
      &::before {
        content: "";
        background-color: #00ff12;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 10px;
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
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto;

  li {
    cursor: pointer;
    width: 200px;
    height: 44px;
    background: rgba(0, 108, 255, 0.2);
    border: 1px solid #006cff;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    &.active {
      background: rgba(35, 217, 251, 0.25);
      span {
        color: #01d4f9;
        background: url("../../assets/img/icon-info__position-active.png");
      }
    }
    span {
      width: 24px;
      height: 24px;
      display: inline-block;
      margin-right: 10px;
      background: url("../../assets/img/icon-info__position.png");
    }
  }
}

.env-second {
  padding: 22px 20px;

  &__label-info {
    line-height: 32px;
    letter-spacing: 2px;
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
    margin-top: 20px;

    .form-block {
      .form-label {
        color: #7ecef4;
        width: 78px;
        background-color: rgba(0, 108, 255, 0.2);
      }

      span {
        line-height: 32px;
        width: 116px;
        padding-left: 9px;
        box-sizing: border-box;
        height: 32px;
        display: inline-block;
        background: rgba(1, 212, 249, 0.2);
        border: 1px solid #006cff;
      }
    }
  }
  &__chart {
    width: 100%;

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 22px;

      & > span {
        font-size: 16px;
        color: #ffffff;
        line-height: 30px;
      }
    }

    .chart-title__legend {
      span {
        &::before {
          content: "";
          display: inline-block;
          width: 16px;
          height: 8px;
          margin: 0 10px;
          position: relative;
          top: -2px;
        }
        &:first-child {
          margin-right: 20px;
          &::before {
            background-color: #22ffcc;
          }
        }
        &:last-child::before {
          background-color: #229aff;
        }
      }
    }

    &-content {
      margin: -30px 0 -25px;
      height: 250px;
      width: 110%;
    }
  }
}
</style>
