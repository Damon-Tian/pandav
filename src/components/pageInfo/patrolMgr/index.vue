/* 巡护管理页面 */
<template>
  <div>
    <info-block>
      <div class="title">
        <div>巡护终端</div>
        <div>
          <span class="count">132</span>
          <span class="unit">个</span>
        </div>
      </div>
      <div class="info-content patrol-mgr">
        <el-date-picker
          v-model="dateRange"
          format="yyyy/M/d"
          type="daterange"
          prefix-icon="el"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
        />
        <stations />
      </div>
    </info-block>
    <patrol-type/>
    <patrol-find/>
  </div>
</template>

<script>
import infoBlock from "../infoBlock";
import stations from "./stations";
import patrolType from "./patrolType";
import patrolFind from "./patrolFind";
export default {
  data() {
    return {
      dateRange: [new Date(), new Date()],
    };
  },
  components: {
    infoBlock,
    stations,
    patrolType,
    patrolFind
  },
  methods: {},
};
</script>
<style scoped lang="less">
.title {
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  .count {
    font-size: 30px;
    font-weight: 500;
    color: #00eaff;
    line-height: 30px;
  }
  .unit {
    font-size: 14px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.patrol-mgr {
  padding: 10px;
}
</style>
