<template>
  <div>
    <PortInfo />
    <DetailInfo v-if="detail" :data-detail="detail" />
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
      detail: null
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
      this.removeMap()
      this.initMap()
    },
    currentFeature() {
      // 基层站点详情
      if (this.currentFeature && this.currentFeature.properties.stationName) {
        this.detail = { ...this.currentFeature.properties }
      }
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
