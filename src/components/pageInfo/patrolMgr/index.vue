/* 巡护管理页面 */
<template>
  <div>
    <info-block title="巡护终端" line>
      <div slot="titleRight" class="title">
        <span class="count">132</span>
        <span class="unit">个</span>
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
    <patrol-type />
    <patrol-list />
  </div>
</template>

<script>
import infoBlock from "../infoBlock"
import stations from "./stations"
import patrolType from "./patrolType"
import patrolList from "./patrolList"
export default {
  components: {
    infoBlock,
    stations,
    patrolType,
    patrolList
  },
  data() {
    return {
      dateRange: [new Date(), new Date()]
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.title {
  // display: flex;
  // justify-content: space-between;
  // margin-bottom: 10px;
  // color: white;
  // font-size: 18px;

  .count {
    color: #00eaff;
    font-size: 30px;
    font-weight: 500;
    line-height: 30px;
  }

  .unit {
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 14px;
  }
}

.patrol-mgr {
  padding: 10px;
}
</style>
