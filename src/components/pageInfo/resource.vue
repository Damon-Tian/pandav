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
      currentDetailTab: "",
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
          fontSize: 26
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
  padding: 0 20px 20px;
  display: flex;

  li {
    width: 124px;
    height: 64px;
    background: rgba(0, 29, 155, 0.4);
    border: 1px solid #1286b1;
    box-shadow: 0px 0px 12px 0px rgba(0, 175, 255, 0.4) inset;
    box-sizing: border-box;
    padding: 8px 0 0 10px;
    position: relative;

    &:nth-child(2) {
      margin: 0 10px;
    }
    span {
      font-size: 14px;

      &:last-child {
        font-size: 30px;
        position: absolute;
        bottom: 3px;
        right: 13px;
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
  padding: 20px 16px 16px 20px;
  box-sizing: border-box;

  .ring-chart-title {
    padding-left: 3px;
  }

  .active-ring-chart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 117px;

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
          border-radius: 50%;
          margin-right: 20px;
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
    background: rgba(0, 0, 0, 0.36);
    color: rgba(151, 151, 151, 1);
    justify-content: space-around;
    height: 32px;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      line-height: 32px;
      text-align: center;
      letter-spacing: 2px;
      height: 32px;
      width: 210px;
      cursor: pointer;

      &.active {
        height: 40px;
        line-height: 40px;
        background: #0b90c2;
        border-radius: 4px;
        color: white;
        width: 216px;
        position: relative;
      }
    }
  }
  .detail-content {
    margin-top: 14px;
    padding: 20px;

    .content-display {
      display: flex;
      justify-content: space-between;
      color: #d8d8d8;
      position: relative;

      & > div {
        position: relative;
        border-left: 2px solid #34b2ff;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding-left: 8px;
        flex: 1;
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
