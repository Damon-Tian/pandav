/* 站点饼图，占比 */
<template>
  <div>
    <div class="bg">
      <div class="stations-btns">
        <div>
          人次
          <div class="stations-btn">
            <countTo
              :start-val="0"
              :end-val="totalData.personNum"
              :duration="3000"
            />人次
          </div>
        </div>
        <div>
          巡护次数
          <div class="stations-btn">
            <countTo
              :start-val="0"
              :end-val="totalData.patrolNum"
              :duration="3000"
            />次
          </div>
        </div>
        <div>
          里程
          <div class="stations-btn">
            <countTo
              :start-val="0"
              :end-val="Number(totalData.mileage / 1000)"
              :duration="3000"
            />km
          </div>
        </div>
      </div>
      <div class="stations">
        <div class="stationPie">
          <div ref="stationPie" style="height: 100%"></div>
          <div class="bg"></div>
        </div>
        <table>
          <tr>
            <th width="10"></th>
            <th align="left" style="width: 130px">站点</th>
            <th align="right" style="width: 50px">人次</th>
            <th align="right">里程</th>
          </tr>
          <tbody>
            <tr v-for="(item, i) in data" :key="item.station">
              <td width="10"></td>
              <td align="left">
                <div class="legend-name">
                  <span
                    class="legend-item"
                    :style="'background:' + colorList[i]"
                  ></span>
                  {{ item.areaName }}
                </div>
              </td>
              <td align="right">
                <countTo
                  :start-val="0"
                  :end-val="item.personNum"
                  :duration="3000"
                />
              </td>
              <td align="right">
                <countTo
                  :start-val="0"
                  :end-val="Number(item.mileage)"
                  :duration="3000"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="bg" style="padding: 10px; margin-top: 10px">
      <SwiperTable
        v-if="alarmList.length"
        :config="config"
        :data="alarmList"
        @swiperItemClick="swiperItemClick"
      />
    </div>

    <!-- <patrolList class="bg" style="padding: 0 10px" /> -->
  </div>
</template>

<script>
// import patrolList from "./patrolList"
import Charts from "@jiaminghi/charts"
import SwiperTable from "@/components/swiperTable/index.vue"
import { get_patrol_detail, get_patrol_detail_geojson_item } from "@/api/line"
import mapUtil from "@/mixins/mapUtil"
let colorList = ["#71ED93", "#02FCFF", "#FFF960", "#33AEFF"]
export default {
  components: {
    SwiperTable
    // patrolList
  },
  mixins: [mapUtil],
  props: {
    alarmList: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    colorList: {
      type: Array,
      default: () => colorList
    },
    totalData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      myCharts: null,
      option: {},
      isShowCharts: false,
      config: {
        header: ["巡护记录", "巡护类型", "巡护机构"],
        headerHeight: 32,
        columnWidth: [155, 135, 118],
        swiperHeight: 470,
        headerBGC: "rgba(0, 108, 255, 0.2)",
        headerBorder: "none",
        slidesPerView: 9
      }
    }
  },
  computed: {
    // getPersons() {
    //   return this.data.reduce((a, b) => a + b.person, 0)
    // },
    // getKm() {
    //   return this.data.reduce((a, b) => a + b.km, 0)
    // }
  },
  watch: {
    data: {
      handler() {
        this.isShowCharts = !this.data.every((item) => {
          return !item.personNum
        })
        if (this.isShowCharts) {
          this.initPie()
        }
      },
      deep: true,
      immediate: true
    }
  },
  destroyed() {
    this.alarmList.forEach((item) => {
      if (item.checked) {
        this.removelayer(2, item.patrolNum)
      }
    })
    this.reset()
  },
  mounted() {},
  methods: {
    initPie() {
      //初始化pie 丁格尔图
      if (!this.myCharts) {
        this.myCharts = new Charts(this.$refs.stationPie)
      }
      this.option = {
        color: colorList,
        series: [
          {
            type: "pie",
            data: this.data.map((item) => ({
              name: item.areaName,
              value: item.personNum ? item.personNum : 0
            })),
            outsideLabel: {
              show: false
            },
            roseType: true,
            radius: [15, "85%"]
          }
        ]
      }
      this.myCharts.setOption(this.option)
    },

    async swiperItemClick(item) {
      if (item.checked) {
        const data = await get_patrol_detail({ id: item.id })
        const geoData = [get_patrol_detail_geojson_item(data)]
        this.setLayer(2, item.patrolNum, geoData)
        this.flyTo({
          center: [Number(data.startLon), Number(data.startLat)],
          zoom: 20
        })
      } else {
        this.removelayer(2, item.patrolNum)
        this.reset()
      }
    }
  }
}
</script>
<style scoped lang="less">
.bg {
  padding: 10px;
  background: rgba(0, 0, 0, 60%);
}

:deep .swiper-table .swiper-container {
  height: 470px;
}

:deep .swiper-table__data__td:nth-child(1) .swiper-table__data__box {
  border-left: none;
}

:deep .swiper-table__header {
  color: #7ecef4;
}

:deep .swiper-table .is-active {
  color: #fff;

  .swiper-table__data__box {
    background-color: #0b90c2;
  }
}

.stations-btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: #7ecef4;
  font-size: 14px;
  font-weight: 500;

  .stations-btn {
    width: 130px;
    height: 36px;
    border: 1px solid #1aa1fd;
    margin-top: 10px;
    background: linear-gradient(-90deg, #0b2240 0%, #0a3f74 100%);
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    line-height: 36px;
    text-align: center;
  }
}

.stations {
  display: flex;
  align-content: center;

  .stationPie {
    position: relative;
    width: 142px;
    height: 120px;
  }

  .bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  table {
    flex: 1;
    border-left: 2px solid #00aeff;

    th {
      color: #7ecef4;
      font-size: 14px;
      font-weight: 500;
      line-height: 25px;
    }

    tbody tr td {
      color: #d8d8d8;
      font-size: 14px;
      font-weight: 500;
      line-height: 25px;
    }
  }

  .legend-name {
    display: flex;
    align-items: center;
    color: #02fcff;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: #02fcff;
  }

  .legend-item {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid #0b90c2;
    margin-right: 5px;
  }
}
</style>
