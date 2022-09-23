/* 巡护方式 */
<template>
  <info-block class="patrol-type">
    <div class="title">
      <div>巡护方式</div>
      <el-date-picker v-model="date" size="small" format="yyyy/M/d" type="date" />
    </div>
    <div class="tabs">
      <div
        class="tab"
        v-for="tab in tabs"
        :key="tab"
        :class="{ 'active-tab': tab == activeName }"
        @click="activeName = tab"
      >
        {{ tab }}
      </div>
    </div>
    <div class="card-list">
      <div
        class="card"
        v-for="item in data"
        :key="item.name"
        @click="handleLocation(item)"
        :class="{ 'active-card': activeLocation == item.name }"
      >
        <img
          src="../../../assets/img/location_active.png"
          v-if="activeLocation == item.name"
        />
        <img src="../../../assets/img/location.png" v-else />
        <div>{{ item.name }}</div>
      </div>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock";
const tabs = ["样线巡护", "日常巡护"];
export default {
  data() {
    return {
      date: new Date(),
      tabs,
      activeName: tabs[0],
      data: [
        {
          name: "崇州站",
        },
        {
          name: "大邑站",
        },
        {
          name: "彭州站",
        },
        {
          name: "都江堰站",
        },
      ],
      activeLocation: "崇州站",
    };
  },
  components: {
    infoBlock,
  },
  methods: {
    handleLocation(item) {
      this.activeLocation = item.name;
      //
    },
  },
};
</script>
<style scoped lang="less">
.patrol-type {
  padding: 10px 10px 0 10px;
  .title {
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  :deep .el-date-editor input {
    background-color: #020b30 !important;
  }
  .tabs {
    display: flex;
    align-items: center;
    .tab {
      flex: 1;
      height: 32px;
      background: rgba(0, 0, 0, 0.36);
      font-size: 16px;
      font-weight: 500;
      color: #979797;
      line-height: 32px;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
    .active-tab {
      height: 40px;
      background: #0b90c2;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      line-height: 40px;
    }
  }
  .card-list {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .card {
      width: 90px;
      height: 76px;
      border: 1px solid #006cff;
      background: rgba(0, 108, 255, 0.2);
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & img {
        width: 24px;
        height: 24px;
        margin-bottom: 10px;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .active-card {
      background: rgba(35, 217, 251, 0.35);
      border-radius: 4px;
      color: #01d4f9;
    }
  }
}
</style>
