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
  </div>
</template>

<script>
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
      ]
    }
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
</style>
