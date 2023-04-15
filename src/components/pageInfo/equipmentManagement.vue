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
  get_infrared_camera_geojson_new,
  get_video_camera_geojson_new,
  get_vidicon,
  get_event_by_orgId
} from "@/api/device"
import { get_org } from "@/api/station"
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
      orgIds: [],
      geoData2: [],
      geoData1: [],
      list1: [],
      list2: []
    }
  },
  computed: {
    orgId() {
      return this.$store.getters["app/GET_AREA_ID"]
    }
  },
  watch: {
    orgId() {
      this.removeMap()
      this.initMap()
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
      this.geoData2 = await get_video_camera_geojson_new(this.orgId)
      this.list2 = [...new Set(this.geoData2.map((item) => item.img))]
      if (this.list2.length > 1) {
        this.$store.commit("app/SET_VIDEO_CAMERA_ICON", this.list2)
        this.list2.forEach((item, i) => {
          this.setLayer(
            1,
            "设备管理" + i,
            this.geoData2.filter((item) => item.img == this.list2[i])
          )
        })
      } else {
        this.setLayer(1, "设备管理", this.geoData2)
      }
      console.log(this.$store.state.app.map.mapBox, "map")
      // this.geoData1 = await get_infrared_camera_geojson_new(this.orgId)
      // this.list1 = [...new Set(this.geoData1.map((item) => item.img))]
      // if (this.list1.length > 1) {
      //   this.$store.commit("app/SET_INFRARED_CAMERA_ICON", this.list1)
      //   this.list1.forEach((item, i) => {
      //     this.setLayer(
      //       1,
      //       mapId[0] + i,
      //       this.geoData1.filter((item) => item.img == this.list1[i])
      //     )
      //   })
      // } else {
      //   this.setLayer(1, mapId[0], this.geoData1)
      // }
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
      // if (this.list1.length > 1) {
      //   this.list1.forEach((item, i) => {
      //     this.removelayer(1, mapId[0] + i)
      //   })
      // } else {
      //   this.removelayer(1, mapId[0])
      // }
      if (this.list2.length > 1) {
        this.list2.forEach((item, i) => {
          this.removelayer(1, "设备管理" + i)
        })
      } else {
        this.removelayer(1, "设备管理")
      }
      this.$store.commit("app/SET_VIDEO_CAMERA_ICON", [])
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
