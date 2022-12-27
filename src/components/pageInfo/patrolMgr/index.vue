/* 巡护管理页面 */
<template>
  <div>
    <info-block title="巡护终端" line>
      <div slot="titleRight" class="title">
        <span class="count">
          <countTo :start-val="0" :end-val="statistic.count" :duration="3000" />
        </span>
        <span class="unit">个</span>
      </div>
      <div>
        <el-date-picker
          v-model="dateRange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          prefix-icon="el"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          style="width: 100%"
          :picker-options="pickerOptions"
          @change="getInit"
        />
      </div>
      <div class="tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab"
          :class="{ 'active-tab': tab.value == activeName }"
          @click="tabsClick(tab)"
        >
          {{ tab.label }}
        </div>
      </div>
      <stations
        :data="stationsData"
        :active-name="activeName"
        :total-data="totalData"
        :alarm-list="alarmList"
      />
    </info-block>
  </div>
</template>

<script>
import infoBlock from "../infoBlock"
import stations from "./stations"
import {
  get_line_geojson,
  get_patrol_detail_geojson,
  get_patrol_info,
  get_patrol_by_orgid,
  get_device_handheld_terminal_count
} from "@/api/line"
import mapUtil from "@/mixins/mapUtil"
import { get_org } from "@/api/mapPopupInfo"
import { DateFormat } from "@/utils"
const mapId = "巡护样线"
const mapId1 = "巡护路线"
const tabs = [
  { value: "", label: "全部" },
  { value: "TRANSECT", label: "样线巡护" },
  { value: "DAILY", label: "日常巡护" },
  { value: "OTHER", label: "其他巡护" }
]
let pickerMinDate = ""
export default {
  components: {
    infoBlock,
    stations
  },
  mixins: [mapUtil],
  data() {
    return {
      dateRange: [
        DateFormat(
          new Date(new Date().getFullYear() + "-01-01 00:00:00").getTime()
        ),
        DateFormat(
          new Date(new Date().getFullYear() + "-12-31 23:59:59").getTime()
        )
      ],
      tabs,
      activeName: "",
      statistic: {
        count: 0
      },
      orgIds: [],
      stationsData: [],
      totalData: {
        personNum: 0,
        mileage: 0,
        patrolNum: 0
      },
      alarmList: [],
      patrolTypeList: [
        { value: "DAILY", label: "日常巡护" },
        { value: "TRANSECT", label: "样线巡护" },
        { value: "OTHER", label: "其它" }
      ],
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          pickerMinDate = minDate.getTime()
          if (maxDate) {
            pickerMinDate = ""
          }
        },
        disabledDate(time) {
          // var year = new Date().getFullYear()
          if (pickerMinDate) {
            let year = new Date(pickerMinDate).getFullYear()
            return (
              time.getTime() > new Date(year + "-12-31").getTime() ||
              time.getTime() < new Date(year - 1 + "-12-31").getTime()
            )
          } else {
            return false
          }
        }
      }
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    },
    orgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    }
  },
  watch: {
    currentArea() {
      this.currentPosition = this.currentArea
    },
    currentPosition() {
      this.removeMap()
      // this.initMap()
      this.initPatrolMap()
    },
    orgId() {
      this.getInit()
    }
  },
  async mounted() {
    // this.initMap()
    await this.getOrgIds()
    this.initPatrolMap()
    this.getDeviceHandheldTerminalCount()
    this.getInit()
  },
  beforeDestroy() {
    // this.removeMap()
  },
  methods: {
    async getDeviceHandheldTerminalCount() {
      const data = await get_device_handheld_terminal_count()
      this.statistic.count = data
    },
    formatOrgId(orgId) {
      const org = this.orgIds.find((item) => item.id == orgId)
      return org ? org.name : ""
    },
    formatPatrolType(PatrolType) {
      const patrol = this.patrolTypeList.find(
        (item) => item.value == PatrolType
      )
      return patrol ? patrol.label : ""
    },
    //巡护样线
    async initMap() {
      // const geoData = await get_line_geojson(this.$store.state.app.orgId)
      // this.setLayer(2, mapId, geoData)
    },
    //巡护路线
    async initPatrolMap() {
      // const geoData = await get_patrol_detail_geojson(
      //   this.$store.state.app.orgId
      // )
      // this.setLayer(2, mapId1, geoData)
    },
    tabsClick(tab) {
      this.activeName = tab.value
      this.totalData = {
        personNum: 0,
        mileage: 0,
        patrolNum: this.activeName == "TRANSECT" ? "0-0" : 0
      }
      this.stationsData.map((item) => {
        item.patrolNum = this.activeName == "TRANSECT" ? "0-0" : 0
      })
      this.getInit()
    },
    //巡护统计信息接口
    async getPatrolInfo(params) {
      const data = await get_patrol_info(params)
      this.stationsData = data
      this.totalData = data[0]
      this.stationsData = this.stationsData.filter((item, index) => {
        return index !== 0
      })
    },
    async getOrgIds() {
      const { records } = await get_org({ pageNumber: 1, pageSize: 999 })
      this.orgIds = records
    },
    getInit() {
      const params = {
        patrolType: this.activeName
      }
      if (this.dateRange && this.dateRange.length) {
        params.startTime = this.dateRange[0]
        params.endTime = this.dateRange[1]
      }
      this.getPatrolInfo(params)
      this.getPatrolByOrgid({
        endTime: params?.endTime,
        orgId: this.orgId,
        pageSize: 100,
        patrolType: params.patrolType,
        startTime: params?.startTime
      })
    },
    async getPatrolByOrgid(params) {
      const data = await get_patrol_by_orgid(params)

      this.alarmList = data
      this.alarmList.map((i) => {
        this.$set(i, "checked", false)
        i.data = []
        i.data[0] = i.patrolNum
        i.data[1] = this.formatPatrolType(i.type)
        i.data[2] = this.formatOrgId(i.totalOrgId).replace("大熊猫国家公园", "")
      })
    },
    removeMap() {
      // this.removelayer(2, mapId1)
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
