<template>
  <div>
    <PortInfo />
    <DetailInfo />
  </div>
</template>

<script>
import PortInfo from "./PortInfo.vue"
import DetailInfo from "./DetailInfo.vue"
const mapId = "基层站点"
import { get_station_geojson } from "@/api/station"
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
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    this.removeMap()
  },
  methods: {
    async initMap() {
      const geoData = await get_station_geojson()
      const data = {
        imgUrl: geoData[0].img,
        id: mapId,
        color: "#fff",
        pointArray: {
          type: "FeatureCollection",
          features: geoData
        }
      }
      this.$store.state.app.map.mapBox.point(data)
    },
    removeMap() {
      this.$store.state.app.map.mapBox.removelayer(mapId)
    }
  }
}
</script>
