<template>
  <div class="info-resource">
    <info-block title="动物多样性">
      <div slot="titleRight" class="attr">
        <span class="attr"
          >目：
          <countTo
            :start-val="0"
            :end-val="currentAreaStatistic.animal.mu"
            :duration="3000"
          />
        </span>
        <span class="attr"
          >科：
          <countTo
            :start-val="0"
            :end-val="currentAreaStatistic.animal.ke"
            :duration="3000"
          />
        </span>
        <span class="attr"
          >种：
          <countTo
            :start-val="0"
            :end-val="currentAreaStatistic.animal.zhong"
            :duration="3000"
          />
        </span>
      </div>
      <div class="info-content">
        <div class="animal-top">
          <div class="ring-chart-block">
            <div class="active-ring-chart">
              <dv-active-ring-chart :config="animalConfig" class="plantClass" />
              <div class="active-ring-label">
                <div class="ring-chart-title">国家保护动物</div>
                <li v-for="(item, index) in animalConfig.data" :key="item.name">
                  <span
                    class="label-dot"
                    :style="'background:' + animalConfig.color[index]"
                  ></span>
                  <span>{{ item.name }}</span>
                  <span
                    ><countTo
                      :start-val="0"
                      :end-val="item.value"
                      :duration="3000"
                    />种</span
                  >
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </info-block>

    <info-block title="植物多样性">
      <div slot="titleRight" class="attr">
        <span class="attr"
          >科：
          <countTo
            :start-val="0"
            :end-val="currentAreaStatistic.plant.ke"
            :duration="3000"
          />
        </span>
        <span class="attr"
          >属：
          <countTo
            :start-val="0"
            :end-val="currentAreaStatistic.plant.shu"
            :duration="3000"
          />
        </span>
        <span class="attr"
          >种：
          <countTo
            :start-val="0"
            :end-val="currentAreaStatistic.plant.zhong"
            :duration="3000"
          />
        </span>
      </div>
      <div class="info-content">
        <div class="ring-chart-block">
          <div class="active-ring-chart">
            <dv-active-ring-chart :config="plantConfig" class="plantClass" />
            <div class="active-ring-label">
              <div class="ring-chart-title">国家保护植物</div>
              <li v-for="(item, index) in plantConfig.data" :key="item.name">
                <span
                  class="label-dot"
                  :style="'background:' + plantConfig.color[index]"
                ></span>
                <span>{{ item.name }}</span>
                <span>
                  <countTo
                    :start-val="0"
                    :end-val="item.value"
                    :duration="3000"
                  />种</span
                >
              </li>
            </div>
          </div>
        </div>
      </div>
    </info-block>

    <info-block title="代表物种">
      <div class="detail-block">
        <div class="detail-tab">
          <span
            v-for="item in detailTabs"
            :key="item"
            :class="currentDetailTab === item ? 'active' : ''"
            @click="changeDetail(item)"
          >
            {{ item }}
          </span>
        </div>
        <div class="detail-box">
          <div class="detail-content">
            <div
              v-for="item in currentBioList"
              :key="item.id"
              class="detail-item"
              @click="handleClick(item)"
            >
              <img :src="item.picUrl" alt="" />
              <div class="tip">
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </info-block>
  </div>
</template>

<script>
import { get_bio_point_list, get_bio_geosjon } from "@/api/animal"
import mapUtil from "@/mixins/mapUtil"
import { deepClone } from "@/utils"
const mapId = "自然资源"
const baseConfig = {
  radius: "40",
  activeRadius: "45%",
  color: ["#2DA1FE", "#FFBC1C", "#19E194", "#FF4444"],

  digitalFlopStyle: {
    fontSize: 20,
    fill: "#00EAFF"
  },
  showOriginValue: true,
  lineWidth: 15
}
export default {
  mixins: [mapUtil],
  data() {
    return {
      InfoId: null,
      currentDetailTab: "动物多样性",
      detailTabs: ["动物多样性", "植物多样性"],
      animalConfig: {
        ...baseConfig,
        data: [
          {
            name: "一级",
            value: 0
          },
          {
            name: "二级",
            value: 0
          }
        ]
      },
      plantConfig: {
        ...baseConfig,
        data: [
          {
            name: "一级",
            value: 0
          },
          {
            name: "二级",
            value: 0
          }
        ]
      },
      bioList: [],
      currentSelect: 1,
      statistic: {
        chengdu: {
          plant: {
            ke: 325,
            shu: 1358,
            zhong: 3629,
            level1: 9,
            level2: 23
          },
          animal: {
            mu: 40,
            ke: 127,
            zhong: 551,
            level1: 14,
            level2: 64
          }
        },
        dujiangyan: {
          plant: {
            ke: 250,
            shu: 1045,
            zhong: 2792,
            level1: 4,
            level2: 8
          },
          animal: {
            mu: 31,
            ke: 96,
            zhong: 415,
            level1: 10,
            level2: 40
          }
        },
        pengzhou: {
          plant: {
            ke: 166,
            shu: 716,
            zhong: 1760,
            level1: 7,
            level2: 15
          },
          animal: {
            mu: 27,
            ke: 98,
            zhong: 424,
            level1: 11,
            level2: 37
          }
        },
        chongzhou: {
          plant: {
            ke: 184,
            shu: 623,
            zhong: 1526,
            level1: 3,
            level2: 9
          },
          animal: {
            mu: 26,
            ke: 90,
            zhong: 322,
            level1: 9,
            level2: 31
          }
        },
        dayi: {
          plant: {
            ke: 230,
            shu: 929,
            zhong: 2063,
            level1: 5,
            level2: 8
          },
          animal: {
            mu: 29,
            ke: 89,
            zhong: 367,
            level1: 8,
            level2: 37
          }
        }
      },
      currentAreaStatistic: {
        plant: {
          ke: 0,
          shu: 0,
          zhong: 0,
          level1: 0,
          level2: 0
        },
        animal: {
          mu: 0,
          ke: 0,
          zhong: 0,
          level1: 0,
          level2: 0
        }
      },
      imgUrlList: [],
      geoData: [],
      mapIds: [],
      filterGeoData: []
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    },
    currentBioList() {
      this.bioList.forEach((item) => {
        item.picUrl = item.picUrl.split(",")[0]
        item.flag = false
      })
      // 展示图片前去重
      const list = this.bioList.reduce(
        (pre, next) =>
          pre.some((v) => v.name == next.name) ? pre : [...pre, next],
        []
      )
      return this.currentDetailTab == "动物多样性"
        ? list.filter((item) => item.kingdom == 0)
        : list.filter((item) => item.kingdom == 1)
    }
  },
  watch: {
    currentArea: {
      handler: function () {
        // this.removeMap()
        // this.initMap()
        this.getStatistic()
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.removeMap()
  },
  async mounted() {
    const data = await get_bio_point_list({
      pageNumber: 1,
      pageSize: 999
    })
    this.bioList = data
    this.initMap()
  },
  methods: {
    changeDetail(tab) {
      this.currentDetailTab = tab
    },
    getStatistic() {
      this.currentAreaStatistic = this.statistic[this.currentArea]
      this.plantConfig = {
        ...baseConfig,
        data: [
          {
            name: "一级",
            value: this.currentAreaStatistic.plant.level1
          },
          {
            name: "二级",
            value: this.currentAreaStatistic.plant.level2
          }
        ]
      }
      this.animalConfig = {
        ...baseConfig,
        data: [
          {
            name: "一级",
            value: this.currentAreaStatistic.animal.level1
          },
          {
            name: "二级",
            value: this.currentAreaStatistic.animal.level2
          }
        ]
      }
    },
    initMap() {
      const cloneData = deepClone(this.bioList)
      this.geoData = get_bio_geosjon(cloneData)
      this.imgUrlList = [...new Set(this.geoData.map((item) => item.img))]
      if (this.imgUrlList.length > 1) {
        this.imgUrlList.forEach((item, i) => {
          this.mapIds.push(mapId + i)
          this.setLayer(
            1,
            mapId + i,
            this.geoData.filter((item) => item.img == this.imgUrlList[i])
          )
        })
      } else {
        this.setLayer(1, mapId, this.geoData)
      }
    },
    removeMap() {
      if (this.imgUrlList.length > 1) {
        this.imgUrlList.forEach((item, i) => {
          this.removelayer(1, mapId + i)
        })
      }
      this.removelayer(1, mapId)
    },
    async handleClick(item) {
      item.flag = !item.flag
      if (item.flag) {
        this.removeMap()
        const data = await get_bio_point_list({
          pageNumber: 1,
          pageSize: 999,
          name: item.name
        })
        this.filterGeoData = get_bio_geosjon(data)
        this.setLayer(1, mapId, this.filterGeoData)
      } else {
        this.initMap()
      }

      // item.flag = !item.flag
      // // 获取地图点位要素
      // let features = this.$store.state.app.map.mapBox.map.queryRenderedFeatures(
      //   { layers: this.mapIds }
      // )
      // console.log(this.mapIds)
      // // 筛选某条数据
      // let filteredFeatures = features.filter(function (feature) {
      //   return feature.properties.name === item.name
      // })
      // // 获取其他同一批次的其他点位的要素
      // let otherFeatures = features.filter(function (feature) {
      //   return feature.properties.name !== item.name
      // })
      // let idList = filteredFeatures.map((item) => item.id)
      // if (item.flag) {
      //   // 隐藏其他同一批次的其他点位 id在idList之中才保留
      //   this.mapIds.forEach((item) => {
      //     if (idList.length > 0) {
      //       this.$store.state.app.map.mapBox.map.setFilter(item, [
      //         "in",
      //         "id",
      //         ...idList
      //       ])
      //     }
      //   })
      // } else {
      //   this.initMap()
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.attr {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
}

.animal-bottom {
  display: flex;
  padding: 0 20px 20px;

  li {
    position: relative;
    width: 124px;
    height: 64px;
    box-sizing: border-box;
    padding: 8px 0 0 10px;
    border: 1px solid #1286b1;
    background: rgba(0, 29, 155, 40%);
    box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;

    &:nth-child(2) {
      margin: 0 10px;
    }

    span {
      font-size: 14px;

      &:last-child {
        position: absolute;
        right: 13px;
        bottom: 3px;
        font-size: 30px;
      }
    }
  }

  .animal-red {
    color: #f53d3d;
  }

  .animal-brown {
    color: #f56e0c;
  }

  .animal-yellow {
    color: #dea423;
  }
}

.ring-chart-block {
  box-sizing: border-box;
  padding: 20px 16px 16px 20px;

  .ring-chart-title {
    padding-left: 3px;
    color: #fff;
    font-weight: 600;
  }

  .active-ring-chart {
    display: flex;
    height: 117px;
    align-items: center;
    justify-content: space-between;

    .active-ring-label {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;

      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        span {
          display: inline-block;

          &:last-child {
            margin: 0 17px 0 50px;
          }
        }

        .label-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 20px;
          border-radius: 50%;
        }
      }
    }

    .plantClass {
      width: 205px;
      height: 205px;
      margin: 0 -50px;
    }
  }
}

.detail-block {
  margin-top: 14px;

  .detail-tab {
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: space-around;
    background: rgba(0, 0, 0, 36%);
    color: rgba(151, 151, 151, 100%);

    /* stylelint-disable-next-line no-descending-specificity */
    span {
      display: inline-block;
      width: 210px;
      height: 32px;
      cursor: pointer;
      letter-spacing: 2px;
      line-height: 32px;
      text-align: center;

      &.active {
        position: relative;
        width: 216px;
        height: 40px;
        background: #0b90c2;
        border-radius: 4px;
        color: white;
        line-height: 40px;
      }
    }
  }

  .detail-box {
    overflow: hidden;
    max-height: 345px;

    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    /* 滚动条上的滚动滑块 */
    &::-webkit-scrollbar-thumb {
      background: #3b60ab;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    &:hover {
      overflow-y: auto;
    }

    .detail-content {
      display: flex;
      flex-wrap: wrap;

      .detail-item {
        position: relative;
        width: calc(50% - 10px);
        height: 120px;
        margin-top: 10px;
        background-color: rgba(0, 0, 0, 60%);

        img {
          height: 100%;
          object-fit: contain;
        }

        .tip {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 40%);
          line-height: 30px;

          span {
            margin-left: 10px;
            color: #fff;
          }
        }
      }

      & .detail-item:nth-child(2n) {
        margin-left: 15px;
      }
    }
  }
}
</style>
