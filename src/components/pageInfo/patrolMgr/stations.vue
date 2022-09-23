/* 站点饼图，占比 */
<template>
  <div>
    <div class="btns">
      <div>
        人次
        <div class="btn">{{ getPersons }}人次</div>
      </div>
      <div>
        里程
        <div class="btn">{{ getKm }}km</div>
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
          <th align="left">站点</th>
          <th align="right">人次</th>
          <th align="right">里程</th>
        </tr>
        <tbody>
          <tr v-for="(item, i) in data" :key="item.station">
            <td width="10"></td>
            <td align="left">
              <div class="legend-name">
                <span class="legend-item" :style="'background:' + colorList[i]"></span>
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
import Charts from "@jiaminghi/charts";
let colorList = ["#71ED93", "#02FCFF", "#FFF960", "#33AEFF"];
export default {
  props: {
    data: {
      type: Array,
      default: () => [
        {
          person: 12,
          km: 675,
          station: "崇州站",
        },
        {
          person: 6,
          km: 487,
          station: "大邑站",
        },
        {
          person: 3,
          km: 353,
          station: "彭州站",
        },
        {
          person: 2,
          km: 232,
          station: "都江堰站",
        },
      ],
    },
    colorList: {
      type: Array,
      default: () => colorList,
    },
  },
  mounted() {
    this.initPie();
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
              value: item.person,
            })),
            outsideLabel: {
              show: false,
            },
            roseType: true,
            radius: [15, "85%"],
          },
        ],
      };
      const myCharts = new Charts(this.$refs.stationPie);
      myCharts.setOption(option);
    },
  },
  computed: {
    getPersons() {
      return this.data.reduce((a, b) => a + b.person, 0);
    },
    getKm() {
      return this.data.reduce((a, b) => a + b.km, 0);
    },
  },
};
</script>
<style scoped lang="less">
.btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 14px;
  font-weight: 500;
  color: #7ecef4;
  .btn {
    width: 200px;
    height: 36px;
    border: 1px solid #1aa1fd;
    background: linear-gradient(-90deg, #0b2240 0%, #0a3f74 100%);
    text-align: center;
    line-height: 36px;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 10px;
  }
}

.stations {
  display: flex;
  align-content: center;
  .stationPie {
    height: 120px;
    width: 120px;
    position: relative;
  }
  .bg {
    position: absolute;
    height: 32px;
    width: 32px;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
  table {

    border-left: 2px solid #00aeff;
    flex: 1;
    th {
      font-size: 14px;
      font-weight: 500;
      color: #7ecef4;
      line-height: 25px;
    }
    tbody tr td {
      font-size: 14px;
      font-weight: 500;
      color: #d8d8d8;
      line-height: 25px;
    }
  }
  .legend-name{
    display: flex;
    align-items: center;
  }
  .legend-item {
    display: inline-block;
    width: 8px;
    height: 8px;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
