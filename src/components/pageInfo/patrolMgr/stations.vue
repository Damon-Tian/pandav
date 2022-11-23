/* 站点饼图，占比 */
<template>
  <div>
    <div class="stations-btns">
      <div>
        人次
        <div class="stations-btn">{{ getPersons }}人次</div>
      </div>
      <div>
        里程
        <div class="stations-btn">{{ getKm }}km</div>
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
                {{ item.station }}
              </div>
            </td>
            <td align="right">{{ item.person }}</td>
            <td align="right">{{ item.km }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Charts from "@jiaminghi/charts"
let colorList = ["#71ED93", "#02FCFF", "#FFF960", "#33AEFF"]
export default {
  props: {
    data: {
      type: Array,
      default: () => [
        {
          person: 12,
          km: 675,
          station: "崇州站"
        },
        {
          person: 6,
          km: 487,
          station: "大邑站"
        },
        {
          person: 3,
          km: 353,
          station: "彭州站"
        },
        {
          person: 2,
          km: 232,
          station: "都江堰站"
        }
      ]
    },
    colorList: {
      type: Array,
      default: () => colorList
    }
  },
  computed: {
    getPersons() {
      return this.data.reduce((a, b) => a + b.person, 0)
    },
    getKm() {
      return this.data.reduce((a, b) => a + b.km, 0)
    }
  },
  mounted() {
    this.initPie()
  },
  methods: {
    initPie() {
      //初始化pie 丁格尔图
      const option = {
        color: colorList,
        series: [
          {
            type: "pie",
            data: this.data.map((item) => ({
              name: item.station,
              value: item.person
            })),
            outsideLabel: {
              show: false
            },
            roseType: true,
            radius: [15, "85%"]
          }
        ]
      }
      const myCharts = new Charts(this.$refs.stationPie)
      myCharts.setOption(option)
    }
  }
}
</script>
<style scoped lang="less">
.stations-btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: #7ecef4;
  font-size: 14px;
  font-weight: 500;

  .stations-btn {
    width: 198px;
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
  }

  .legend-item {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 5px;
    vertical-align: middle;
  }
}
</style>
