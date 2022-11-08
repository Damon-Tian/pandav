<template>
  <div>
    <PortInfo />
    <DetailInfo />
  </div>
</template>

<script>
import PortInfo from "./PortInfo.vue"
import DetailInfo from "./DetailInfo.vue"
const mapId = "自然资源"
const mapIcon = require("@/assets/img/p-leftbar-env-active.png")
export default {
  components: { DetailInfo, PortInfo },
  data() {
    return {
      currentPosition: ""
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
  async initMap() {
    const geoData = this.getData()
    const data = {
      id: mapId,
      fillColor: " rgba(11,159,251,0.4)",
      opacity: 0.4,
      width: 2,
      lineColor: "#0B9FFB",
      polygon: {
        type: "FeatureCollection",
        features: geoData
      }
    }
    this.$store.state.app.map.mapBox.Polygon(data)
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
        properties: {
          name: "电子围栏1"
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [103.432937, 30.878296],
                [103.532937, 30.978296],
                [103.632937, 30.778296],

                [103.432937, 30.878296]
              ]
            ]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "电子围栏2"
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [103.513296, 30.589647],
                [103.522574, 30.599069],
                [103.531795, 30.608084],
                [103.561156, 30.616818],
                [103.588869, 30.629464],
                [103.513296, 30.589647]
              ]
            ]
          ]
        }
      }
    ])
  }
}
</script>
