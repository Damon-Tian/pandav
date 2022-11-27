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
import { get_line_geojson, get_patrol_detail_geojson } from "@/api/line"
const mapId = "巡护管理"
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
    }
  },
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    this.removeMap()
  },
  methods: {
    async initMap() {
      const geoData = await get_line_geojson()
      const data = {
        id: mapId,
        geojson: {
          features: geoData,
          type: "FeatureCollection"
        }
      }
      const option = {
        lineColor: geoData[0].properties.color || "#F4BD1A",
        lineWidth: 4,
        arrow: false
      }
      this.$store.state.app.map.mapBox.line(data, option)
    },
    removeMap() {
      this.$store.state.app.map.mapBox.removelayer(mapId)
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
