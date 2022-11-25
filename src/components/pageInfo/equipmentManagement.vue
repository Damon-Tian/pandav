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
const mapId = "设备管理"
const mapIcon = require("../../assets/img/selectedInfo/patrol.png")
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
    },
    currentFeature() {
      return this.$store.state.app.map.feature
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
    currentFeature() {
      this.detail()
    }
  },
  beforeDestroy() {
    this.removeMap()
    this.$store.state.app.map.mapBox.removePoup()
  },
  mounted() {
    this.initMap()
  },
  methods: {
    async initMap() {
      const geoData = await this.getData()
      const data = {
        imgUrl: geoData[0].img,
        id: mapId,
        textName: mapId,
        pointArray: {
          type: "FeatureCollection",
          features: geoData
        }
      }
      this.$store.state.app.map.mapBox.point(data)
    },
    removeMap() {
      this.$store.state.app.map.mapBox.removelayer(mapId)
    },
    getData() {
      const params = {}
      //接口请求
      return Promise.resolve([
        {
          type: "Feature",
          img: mapIcon,
          properties: {}, //其中必须包含id字段，用于高亮点钟图标
          geometry: {
            type: "Point",
            coordinates: [103.32057700807803, 30.64175829877989]
          }
        },
        {
          type: "Feature",
          img: mapIcon,
          properties: {}, //其中必须包含id字段，用于高亮点钟图标
          geometry: {
            type: "Point",
            coordinates: [103.30359827926577, 30.6077411052311]
          }
        }
      ])
    },
    detail() {
      const dom = this.$refs.messageBox
      this.$store.state.app.map.mapBox.poup({
        center: this.currentFeature.geometry.coordinates,
        centent: dom
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
