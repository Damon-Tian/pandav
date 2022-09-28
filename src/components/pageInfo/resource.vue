<template>
  <div class="info-resource">
    <info-block title="动物多样性">
      <div class="info-content">
        <div class="animal-top">
          <div class="ring-chart-block">
            <div class="active-ring-chart">
              <dv-active-ring-chart :config="plantConfig" class="plantClass" />
              <div class="active-ring-label">
                <li>
                  <span class="label-dot blue-dot"></span>
                  <span>一级</span>
                  <span>16种</span>
                </li>
                <li>
                  <span class="label-dot yellow-dot"></span>
                  <span>一级</span>
                  <span>16种</span>
                </li>
                <li>
                  <span class="label-dot green-dot"></span>
                  <span>一级</span>
                  <span>16种</span>
                </li>
              </div>
            </div>
            <div class="ring-chart-title">国家保护动物</div>
          </div>
        </div>
        <div class="animal-bottom">
          <li>
            <span>极危</span>
            <span class="animal-red">12</span>
          </li>
          <li>
            <span>濒危</span>
            <span class="animal-brown">12</span>
          </li>
          <li>
            <span>易危</span>
            <span class="animal-yellow">12</span>
          </li>
        </div>
      </div>
    </info-block>

    <info-block title="植物多样性">
      <div class="info-content">
        <div class="ring-chart-block">
          <div class="active-ring-chart">
            <dv-active-ring-chart :config="plantConfig" class="plantClass" />
            <div class="active-ring-label">
              <li>
                <span class="label-dot blue-dot"></span>
                <span>一级</span>
                <span>16种</span>
              </li>
              <li>
                <span class="label-dot yellow-dot"></span>
                <span>一级</span>
                <span>16种</span>
              </li>
              <li>
                <span class="label-dot green-dot"></span>
                <span>一级</span>
                <span>16种</span>
              </li>
            </div>
          </div>
          <div class="ring-chart-title">国家保护动物</div>
        </div>
      </div>
    </info-block>

    <info-block title="详细信息">
      <div class="detail-block">
        <div class="detail-tab">
          <span
            v-for="item in detailTabs"
            :key="item"
            :class="currentDetailTab === item ? 'active' : ''"
            @click="changeDetail(item)"
          >
            {{ item }}
          </span>
        </div>
        <div class="info-content detail-content">
          <div class="content-display">
            <div>
              <p>名称：国家保护动物</p>
              <p>野生种类：240种</p>
              <p>区域：成都站</p>
            </div>
            <div>
              <p>1级：16种</p>
              <p>2级：72种</p>
              <p>3级：23种</p>
            </div>
          </div>
          <div class="get-more">更多信息></div>
        </div>
      </div>
    </info-block>
  </div>
</template>

<script>
import infoBlock from "./infoBlock"
export default {
  components: { infoBlock },
  data() {
    return {
      currentDetailTab: "动物多样性",
      detailTabs: ["动物多样性", "植物多样性"],
      plantConfig: {
        radius: "40",
        activeRadius: "45%",
        color: ["#2DA1FE", "#FFBC1C", "#19E194"],
        data: [
          {
            name: "一级",
            value: 16
          },
          {
            name: "二级",
            value: 72
          },
          {
            name: "省级",
            value: 23
          }
        ],
        digitalFlopStyle: {
          fontSize: 20,
          fill: "#00EAFF"
        },
        showOriginValue: true,
        lineWidth: 15
      }
    }
  },
  methods: {
    changeDetail(tab) {
      this.currentDetailTab = tab
    }
  }
}
</script>

<style lang="less" scoped>
.animal-bottom {
  display: flex;
  padding: 0 20px 20px;

  li {
    position: relative;
    width: 124px;
    height: 64px;
    box-sizing: border-box;
    padding: 8px 0 0 10px;
    border: 1px solid #1286b1;
    background: rgba(0, 29, 155, 40%);
    box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;

    &:nth-child(2) {
      margin: 0 10px;
    }

    span {
      font-size: 14px;

      &:last-child {
        position: absolute;
        right: 13px;
        bottom: 3px;
        font-size: 30px;
      }
    }
  }

  .animal-red {
    color: #f53d3d;
  }

  .animal-brown {
    color: #f56e0c;
  }

  .animal-yellow {
    color: #dea423;
  }
}

.ring-chart-block {
  box-sizing: border-box;
  padding: 20px 16px 16px 20px;

  .ring-chart-title {
    padding-left: 3px;
  }

  .active-ring-chart {
    display: flex;
    height: 117px;
    align-items: center;
    justify-content: space-between;

    .active-ring-label {
      li {
        display: flex;
        align-items: center;

        &:nth-child(2) {
          margin: 20px 0;
        }

        span {
          display: inline-block;

          &:last-child {
            margin: 0 17px 0 50px;
          }
        }

        .label-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 20px;
          border-radius: 50%;
        }

        .blue-dot {
          background-color: #2da1fe;
        }

        .yellow-dot {
          background-color: #ffbc1c;
        }

        .green-dot {
          background-color: #19e194;
        }
      }
    }

    .plantClass {
      width: 205px;
      height: 205px;
      margin: 0 -50px;
    }
  }
}

.detail-block {
  margin-top: 14px;

  .detail-tab {
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: space-around;
    background: rgba(0, 0, 0, 36%);
    color: rgba(151, 151, 151, 100%);

    /* stylelint-disable-next-line no-descending-specificity */
    span {
      display: inline-block;
      width: 210px;
      height: 32px;
      cursor: pointer;
      letter-spacing: 2px;
      line-height: 32px;
      text-align: center;

      &.active {
        position: relative;
        width: 216px;
        height: 40px;
        background: #0b90c2;
        border-radius: 4px;
        color: white;
        line-height: 40px;
      }
    }
  }

  .detail-content {
    padding: 20px;
    padding-bottom: 10px;
    margin-top: 14px;

    .content-display {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      color: #d8d8d8;

      & > div {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 8px;
        border-left: 2px solid #34b2ff;

        &:nth-child(1) {
          flex-basis: 20%;
        }

        p {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
