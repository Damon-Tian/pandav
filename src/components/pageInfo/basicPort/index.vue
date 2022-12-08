<template>
  <div>
    <PortInfo :port-data="portData" />
    <DetailInfo v-if="detail" :data-detail="detail" :alarm-list="alarmList" />
  </div>
</template>

<script>
import PortInfo from "./PortInfo.vue"
import DetailInfo from "./DetailInfo.vue"
const mapId = "基层站点"
import { get_event_by_orgId } from "@/api/device"
import { get_station_geojson } from "@/api/station"
import { get_org } from "@/api/mapPopupInfo"
import mapUtil from "@/mixins/mapUtil"
import { get_person_info } from "@/api/station"
export default {
  components: { DetailInfo, PortInfo },
  mixins: [mapUtil],
  data() {
    return {
      detail: null,
      portData: [],
      alarmList: [],
      orgIds: []
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    },
    currentFeature() {
      return this.$store.state.app.map.feature
    },
    orgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    }
  },
  watch: {
    currentArea() {
      this.removeMap()
      this.initMap()
    },
    currentFeature() {
      // 基层站点详情
      if (this.currentFeature && this.currentFeature.properties.stationName) {
        this.detail = { ...this.currentFeature.properties }
        this.getEventByOrgId()
      }
    },
    orgId() {
      this.getEventByOrgId()
    }
  },
  async mounted() {
    this.initMap()
    this.getPersonInfo()
    const { records } = await get_org({ pageNumber: 1, pageSize: 999 })
    this.orgIds = records
  },
  beforeDestroy() {
    this.removeMap()
  },
  methods: {
    formatOrgId(orgId) {
      const org = this.orgIds.find((item) => item.id == orgId)
      return org ? org.name : ""
    },
    async initMap() {
      const geoData = await get_station_geojson()
      this.setLayer(3, mapId, geoData)
    },
    async getPersonInfo() {
      const data = await get_person_info()
      this.portData = data
      this.portData = this.portData.filter((item, index) => {
        return index !== 0
      })
    },
    async getEventByOrgId() {
      const data = await get_event_by_orgId({
        orgId: this.orgId,
        pageSize: 100,
        includePatrol: 0
      })
      this.alarmList = data
      this.alarmList.map((i) => {
        this.$set(i, "checked", false)
        i.data = []
        if (i.source == 2) {
          i.data[0] = `${this.formatOrgId(i.orgId)}-${i.putPerson}上传事件`
        } else {
          i.data[0] = `红外相机(${i.deviceSn})抓拍到事件`
        }
        i.data[1] = i.getTime
      })
    },
    removeMap() {
      this.removelayer(3, mapId)
    }
  }
}
</script>
