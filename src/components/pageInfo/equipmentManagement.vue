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
    <camera />
    <Infrare-camera />
    <event-remind />
    <div style="display: none">
      <div ref="messageBox" class="message-box">
        <img src="../../assets/img/8461669345165_.pic.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import camera from "./equipmentManagement/camera.vue"
import InfrareCamera from "./equipmentManagement/InfrareCamera.vue"
import eventRemind from "./equipmentManagement/eventRemind.vue"
const mapId = ["红外相机", "摄像机", "生态设备"]
import {
  get_infrared_camera_geojson,
  get_ecological_equipment_geojson,
  get_video_camera_geojson
} from "@/api/device"
// import environment from "./environment.vue"
const tabs = ["设备管理", "生态设备"]
export default {
  components: { camera, InfrareCamera, eventRemind },
  data() {
    return {
      tabs,
      activeName: tabs[0]
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
  beforeDestroy() {
    this.removeMap()
  },
  mounted() {
    this.initMap()
  },
  methods: {
    async initMap() {
      const geoData1 = await get_infrared_camera_geojson()
      const geoData2 = await get_video_camera_geojson()
      const geoData3 = await get_ecological_equipment_geojson()
      const datas = [geoData1, geoData2, geoData3]
      mapId.forEach((id, index) => {
        const geoData = datas[index]
        const data = {
          imgUrl: geoData[0].img,
          id,
          pointArray: {
            type: "FeatureCollection",
            features: geoData
          }
        }
        console.log(data)
        this.$store.state.app.map.mapBox.point(data)
      })
    },
    removeMap() {
      mapId.forEach((id) => {
        this.$store.state.app.map.mapBox.removelayer(id)
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
