/* 巡护管理页面 */
<template>
  <div>
    <info-block title="手持终端" line>
      <div slot="titleRight" class="title">
        <span class="count">
          <countTo :start-val="0" :end-val="statistic.count" :duration="3000" />
        </span>
        <span class="unit">个</span>
      </div>
      <div>
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
      <stations />
    </info-block>
  </div>
</template>

<script>
import infoBlock from "../infoBlock"
import stations from "./stations"
import { get_line_geojson, get_patrol_detail_geojson } from "@/api/line"
import mapUtil from "@/mixins/mapUtil"
const mapId = "巡护样线"
const mapId1 = "巡护路线"
const tabs = ["全部", "样线巡护", "日常巡护"]
export default {
  components: {
    infoBlock,
    stations
  },
  mixins: [mapUtil],
  data() {
    return {
      dateRange: [new Date(), new Date()],
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
      statistic: {
        count: 123
      }
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

.tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #0b90c2;
  margin-top: 10px;
  background: rgb(0, 0, 0);

  .tab {
    height: 32px;
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 32px;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .active-tab {
    background: #0b90c2;
    font-size: 16px;
  }
}
</style>
