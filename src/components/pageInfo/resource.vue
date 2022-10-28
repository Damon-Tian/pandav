<template>
  <div class="info-resource">
    <info-block title="动物多样性">
      <div slot="titleRight" class="attr">
        <span class="attr">科：6</span>
        <span class="attr">属：6</span>
        <span class="attr">种：6</span>
      </div>
      <div class="info-content">
        <div class="animal-top">
          <div class="ring-chart-block">
            <div class="active-ring-chart">
              <dv-active-ring-chart :config="animalConfig" class="plantClass" />
              <div class="active-ring-label">
                <li v-for="(item, index) in animalConfig.data" :key="item.name">
                  <span
                    class="label-dot"
                    :style="'background:' + animalConfig.color[index]"
                  ></span>
                  <span>{{ item.name }}</span>
                  <span>{{ item.value }}种</span>
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
      <div slot="titleRight" class="attr">
        <span class="attr">科：6</span>
        <span class="attr">属：6</span>
        <span class="attr">种：6</span>
      </div>
      <div class="info-content">
        <div class="ring-chart-block">
          <div class="active-ring-chart">
            <dv-active-ring-chart :config="plantConfig" class="plantClass" />
            <div class="active-ring-label">
              <li v-for="(item, index) in plantConfig.data" :key="item.name">
                <span
                  class="label-dot"
                  :style="'background:' + plantConfig.color[index]"
                ></span>
                <span>{{ item.name }}</span>
                <span>{{ item.value }}种</span>
              </li>
            </div>
          </div>
          <div class="ring-chart-title">国家保护植物</div>
        </div>
      </div>
    </info-block>

    <info-block title="代表物种">
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
          <span
            v-for="(item, index) in animalList"
            :key="index"
            class="item"
            :class="{ 'active-item': currentSelect == index }"
            @click="currentSelect = index"
            >{{ item }}<span class="split">|</span>
          </span>
        </div>
      </div>
    </info-block>
  </div>
</template>

<script>
import infoBlock from "./infoBlock"
const baseConfig = {
  radius: "40",
  activeRadius: "45%",
  color: ["#2DA1FE", "#FFBC1C", "#19E194", "#FF4444"],

  digitalFlopStyle: {
    fontSize: 20,
    fill: "#00EAFF"
  },
  showOriginValue: true,
  lineWidth: 15
}
export default {
  components: { infoBlock },
  data() {
    return {
      currentDetailTab: "动物多样性",
      detailTabs: ["动物多样性", "植物多样性"],
      animalConfig: {
        ...baseConfig,
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
            name: "三有",
            value: 23
          },
          {
            name: "其他",
            value: 23
          }
        ]
      },
      plantConfig: {
        ...baseConfig,
        data: [
          {
            name: "一级",
            value: 20
          },
          {
            name: "二级",
            value: 80
          },
          {
            name: "三有",
            value: 26
          },
          {
            name: "其他",
            value: 24
          }
        ]
      },
      animalList: [
        "大熊猫",
        "牦牛",
        "羚羊",
        "梅花鹿",
        "娃娃鱼",
        "娃娃鱼",
        "金丝猴",
        "牦牛",
        "羚羊",
        "梅花鹿",
        "娃娃鱼",
        "娃娃鱼",
        "金丝猴",
        "牦牛",
        "羚羊",
        "梅花鹿",
        "娃娃鱼",
        "娃娃鱼",
        "金丝猴",
        "牦牛",
        "羚羊",
        "梅花鹿",
        "大熊猫",
        "娃娃鱼"
      ],
      currentSelect: 0
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
.attr {
  margin-right: 10px;
  font-size: 16px;
  font-weight: 500;
}

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
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;

      li {
        display: flex;
        align-items: center;

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
    overflow: auto;
    height: 150px;
    padding-top: 10px;
    padding-left: 10px;
    color: #fff;
    font-size: 16px;

    .item {
      display: inline-block;
      margin: 5px 0;

      & > span {
        color: #fff;
      }

      &:hover {
        cursor: pointer;
      }
    }

    .active-item {
      color: #0b90c2;
    }

    .split {
      margin: 0 5px;
    }
  }
}
</style>
