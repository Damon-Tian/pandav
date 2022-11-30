/* 巡护管理页面 */
<template>
  <div>
    <info-block title="手持终端" line>
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
import { get_line_geojson, get_patrol_detail_geojson } from "@/api/line"
import mapUtil from "@/mixins/mapUtil"
const mapId = "巡护样线"
const mapId1 = "巡护路线"
export default {
  components: {
    infoBlock,
    stations,
    patrolType,
    patrolList
  },
  mixins: [mapUtil],
  data() {
    return {
      dateRange: [new Date(), new Date()]
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    }
  },
  watch: {
    currentArea() {
      this.currentPosition = this.currentArea
    },
    currentPosition() {
      this.removeMap()
      this.initMap()
      this.initPatrolMap()
    }
  },
  mounted() {
    this.initMap()
    this.initPatrolMap()
  },
  beforeDestroy() {
    this.removeMap()
  },
  methods: {
    //巡护样线
    async initMap() {
      const geoData = await get_line_geojson(this.$store.state.app.orgId)
      this.setLayer(2, mapId, geoData)
    },
    //巡护路线
    async initPatrolMap() {
      const geoData = await get_patrol_detail_geojson(
        this.$store.state.app.orgId
      )
      this.setLayer(2, mapId1, geoData)
    },
    removeMap() {
      this.removelayer(2, mapId)
      this.removelayer(2, mapId1)
    }
  }
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
