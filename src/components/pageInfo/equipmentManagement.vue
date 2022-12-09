<template>
  <div class="equipment-management">
    <!-- <div class="tabs">
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
    <div v-if="activeName == '设备管理'">
      
    </div>

    <environment v-else /> -->
    <camera :vidicon-data="vidiconData" />
    <Infrare-camera />
    <event-remind :alarm-list="alarmList" />
  </div>
</template>

<script>
import camera from "./equipmentManagement/camera.vue"
import InfrareCamera from "./equipmentManagement/InfrareCamera.vue"
import eventRemind from "./equipmentManagement/eventRemind.vue"
const mapId = ["红外相机", "摄像机"]
import {
  get_infrared_camera_geojson,
  get_ecological_equipment_geojson,
  get_video_camera_geojson,
  get_vidicon,
  get_event_by_orgId
} from "@/api/device"
import { get_org } from "@/api/mapPopupInfo"
import mapUtil from "@/mixins/mapUtil"
const tabs = ["设备管理", "生态设备"]
export default {
  components: { camera, InfrareCamera, eventRemind },
  mixins: [mapUtil],
  data() {
    return {
      tabs,
      activeName: tabs[0],
      vidiconData: {},
      alarmList: [],
      orgIds: []
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
      this.initMap()
    },
    orgId() {
      this.getVidicon()
      this.getEventByOrgId()
    }
  },
  beforeDestroy() {
    this.removeMap()
    this.reset()
  },
  async mounted() {
    this.initMap()
    this.getVidicon()
    this.getEventByOrgId()
    const { records } = await get_org({ pageNumber: 1, pageSize: 999 })
    this.orgIds = records
  },
  methods: {
    async initMap() {
      const geoData1 = await get_infrared_camera_geojson()
      const geoData2 = await get_video_camera_geojson()
      const datas = [geoData1, geoData2]
      mapId.forEach((id, index) => {
        this.setLayer(1, id, datas[index])
      })
    },
    formatOrgId(orgId) {
      const org = this.orgIds.find((item) => item.id == orgId)
      return org ? org.name : ""
    },
    async getVidicon() {
      const data = await get_vidicon({ orgId: this.orgId })
      this.vidiconData = data
    },
    async getEventByOrgId() {
      const data = await get_event_by_orgId({
        orgId: this.orgId,
        pageSize: 100,
        includePatrol: 1
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
      mapId.forEach((id) => {
        this.removelayer(1, id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.equipment-management {
  .tabs {
    display: flex;
    overflow: hidden;
    align-items: center;
    border: 1px solid #0b90c2;
    margin: 0 5px;
    margin-bottom: 10px;
    border-radius: 4px;

    .tab {
      height: 40px;
      flex: 1;
      background: transparent;
      color: #979797;
      font-size: 16px;
      font-weight: 500;
      line-height: 40px;
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    }

    .active-tab {
      background: #0b90c2;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
