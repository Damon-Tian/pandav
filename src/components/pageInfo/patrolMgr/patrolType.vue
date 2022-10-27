/* 巡护方式 */
<template>
  <info-block class="patrol-type">
    <div class="title">
      <div>巡护方式</div>
      <el-date-picker
        v-model="date"
        size="small"
        format="yyyy/M/d"
        type="date"
      />
    </div>
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="tab"
        :class="{ 'active-tab': tab == activeName }"
        @click="activeName = tab"
      >
        {{ tab }}
      </div>
    </div>
    <div class="card-list">
      <div
        v-for="item in data"
        :key="item.name"
        class="card"
        :class="{ 'active-card': activeLocation == item.name }"
        @click="handleLocation(item)"
      >
        <img
          v-if="activeLocation == item.name"
          src="../../../assets/img/location_active.png"
        />
        <img v-else src="../../../assets/img/location.png" />
        <div>{{ item.name }}</div>
      </div>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock"
const tabs = ["样线巡护", "日常巡护"]
export default {
  components: {
    infoBlock
  },
  data() {
    return {
      date: new Date(),
      tabs,
      activeName: tabs[0],
      data: [
        {
          name: "崇州站"
        },
        {
          name: "大邑站"
        },
        {
          name: "彭州站"
        },
        {
          name: "都江堰站"
        }
      ],
      activeLocation: "崇州站"
    }
  },
  methods: {
    handleLocation(item) {
      this.activeLocation = item.name
      //
    }
  }
}
</script>
<style scoped lang="less">
.patrol-type {
  padding: 10px 10px 0;

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: white;
    font-size: 18px;
  }

  :deep .el-date-editor input {
    background-color: #020b30 !important;
  }

  .tabs {
    display: flex;
    align-items: center;

    .tab {
      height: 32px;
      flex: 1;
      background: rgba(0, 0, 0, 36%);
      color: #979797;
      font-size: 16px;
      font-weight: 500;
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
      color: #fff;
      font-size: 16px;
      line-height: 40px;
    }
  }

  .card-list {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .card {
      display: flex;
      width: 90px;
      height: 76px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #006cff;
      background: rgba(0, 108, 255, 20%);
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      font-weight: 500;

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
      background: rgba(35, 217, 251, 35%);
      border-radius: 4px;
      color: #01d4f9;
    }
  }
}
</style>
