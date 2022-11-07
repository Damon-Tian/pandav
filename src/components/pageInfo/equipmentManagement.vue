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
    <div class="message-box">
      <div>
        <div class="title"></div>
      </div>
    </div>
  </div>
</template>

<script>
import camera from "./equipmentManagement/camera.vue"
import InfrareCamera from "./equipmentManagement/InfrareCamera.vue"
import eventRemind from "./equipmentManagement/eventRemind.vue"
const mapId = "自然资源"
const mapIcon = require("@/assets/img/p-leftbar-env-active.png")
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
  beforeDestroy() {
    this.removeMap()
  },
  mounted() {
    this.initMap()
  },
  methods: {
    async initMap() {
      const geoData = this.getData()
      const data = {
        imgUrl: mapIcon,
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
          id: "1",
          type: "Feature",
          properties: {
            text: "动物点1"
          }, //其中必须包含id字段，用于高亮点钟图标
          geometry: {
            type: "Point",
            coordinates: [103.681065, 30.644377]
          }
        },
        {
          id: "2",
          type: "Feature",
          properties: {
            text: "动物点2"
          },
          geometry: {
            type: "Point",
            coordinates: [103.681165, 30.645377]
          }
        }
      ])
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

  .message-box {
    width: 300px;
    height: 144px;
    padding: 20px;
    border: 1px solid #00aeff;
    background: rgba(0, 29, 155, 60%);
    border-radius: 4px;
    box-shadow: 0 0 25px 0 rgba(0, 175, 255, 40%);

    & > div {
      padding: 10px;
      background: rgba(0, 0, 0, 60%);

      .title {
        padding-bottom: 10px;
        border-bottom: 1px solid #00aeff;
        margin-bottom: 10px;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
}
</style>
