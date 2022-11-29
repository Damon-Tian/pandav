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
import mapUtil from "@/mixins/mapUtil"
export default {
  components: { DetailInfo, PortInfo },
  mixins: [mapUtil],
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
      this.setLayer(1, mapId, geoData)
    },
    removeMap() {
      this.removelayer(1, mapId)
    }
  }
}
</script>
