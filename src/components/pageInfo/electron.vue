<template>
  <div class="electron">
    <info-block title="电子围栏">
      <div class="info-content">
        <div class="electron__row">
          <div class="electron__row__title">核心区域</div>
          <div class="electron__row__info">
            <div class="electron-area">
              <div class="area-title">实时人数</div>
              <div class="area-number">{{ fenceData.coreNum }}</div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">累计人数</div>
              <div class="area-number" style="color: #00eaff">
                {{ Number(fenceData.coreNum) * 3 }}
              </div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">信息发送条数</div>
              <div class="area-number" style="color: #d9ea16">
                {{ fenceData.numOfCoreAreas }}
              </div>
            </div>
          </div>
        </div>
        <div class="electron__row">
          <div class="electron__row__title">一般</div>
          <div
            class="electron__row__info"
            style="
              border: 1px solid #1286b1;
              background: rgba(0, 29, 155, 40%);
              box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;
            "
          >
            <div class="electron-area">
              <div class="area-title">实时人数</div>
              <div class="area-number">{{ fenceData.generalNum }}</div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">累计人数</div>
              <div class="area-number" style="color: #00eaff">
                {{ Number(fenceData.generalNum) * 3 }}
              </div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">信息发送条数</div>
              <div class="area-number" style="color: #d9ea16">
                {{ fenceData.numOfGeneralAreas }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </info-block>
  </div>
</template>

<script>
import {
  get_electronic_fence_count,
  get_targeted_sms_data,
  get_elec_heatmap_geojson
} from "@/api/elec"

const mapId = "人员热力图"
export default {
  components: {},
  data() {
    return {
      fenceData: {
        numOfCoreAreas: 0,
        numOfGeneralAreas: 0,
        totalNum: 0,
        coreNum: 0,
        count: 0,
        generalNum: 0
      }
    }
  },
  beforeDestroy() {
    this.removeMap()
  },
  mounted() {
    this.getElectronicFenceCount()
    this.getTargetedSmsData()
    this.initMap()
  },
  methods: {
    //热力图接口
    async getElectronicFenceCount() {
      const data = await get_electronic_fence_count()
      this.fenceData.coreNum = data.coreNum
      this.fenceData.count = data.count
      this.fenceData.generalNum = data.generalNum
    },
    //靶向短信接口
    async getTargetedSmsData() {
      const data = await get_targeted_sms_data()
      this.fenceData.totalNum = data.totalNum
      this.fenceData.numOfCoreAreas = data.numOfCoreAreas
      this.fenceData.numOfGeneralAreas = data.numOfGeneralAreas
    },
    async initMap() {
      const geoData = await get_elec_heatmap_geojson()
      const data = {
        id: mapId,
        magName: "mag",
        data: {
          type: "FeatureCollection",
          crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
          },
          features: geoData
        }
      }
      this.$store.state.app.map.mapBox.addHeatmap(data)
    },
    removeMap() {
      this.$store.state.app.map.mapBox.removelayer(mapId)
    }
  }
}
</script>

<style lang="less" scoped>
.electron {
  .info-content {
    padding: 18px 20px;
  }

  &__row {
    &__title {
      margin-bottom: 11px;
      color: #7ecef4;
      font-size: 14px;
    }

    &__info {
      display: flex;
      height: 74px;
      align-items: center;
      border: 1px solid #ff5b5a;
      margin-bottom: 20px;
      background: rgba(255, 91, 90, 22%);
      box-shadow: 0 0 12px 0 rgba(255, 91, 90, 40%) inset;

      .area-title {
        margin-bottom: 6px;
        color: #d8d8d8;
        font-size: 14px;
      }

      .area-number {
        color: #19e194;
        font-size: 24px;
      }

      .electron-area {
        width: 33.33%;
        text-align: center;
      }

      .separated-line {
        width: 1px;
        height: 26px;
        background: #666;
      }
    }
  }
}
</style>
