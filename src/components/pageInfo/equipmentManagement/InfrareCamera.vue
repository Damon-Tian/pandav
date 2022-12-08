<template>
  <info-block title="红外相机" class="Infrare-camera" line>
    <div slot="titleRight" class="title-right">
      <countTo :start-val="0" :end-val="statisc.total" :duration="3000" /><span
        class="title-right__unit"
        >台</span
      >
    </div>
    <div class="info-content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
          color: '#D8D8D8'
        }"
      >
        <el-table-column prop="areaName" width="80"> </el-table-column>
        <el-table-column prop="color">
          <template slot-scope="scope">
            <div
              :style="[
                { background: scope.row.color },
                { width: `${(scope.row.cameraCount / statisc.total) * 100}%` }
              ]"
              class="table-progress-bar"
            ></div>
          </template>
        </el-table-column>
        <el-table-column prop="cameraCount" label="设备数" width="70">
          <template slot-scope="scope">
            <span
              style="
                border-bottom: 1px solid #81bfff;
                color: #81bfff;
                font-size: 18px;
              "
            >
              <countTo
                :start-val="0"
                :end-val="scope.row.cameraCount"
                :duration="3000"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="newNum" label="新设备" width="70">
          <template slot-scope="scope">
            <span
              style="
                border-bottom: 1px solid #38ff59;
                color: #38ff59;
                font-size: 18px;
              "
            >
              <countTo
                :start-val="0"
                :end-val="scope.row.newNum"
                :duration="3000"
            /></span>
          </template>
        </el-table-column>
        <el-table-column prop="oldNum" label="旧设备" width="70">
          <template slot-scope="scope">
            <span
              style="
                border-bottom: 1px solid #fdff44;
                color: #fdff44;
                font-size: 18px;
              "
            >
              <countTo
                :start-val="0"
                :end-val="scope.row.oldNum"
                :duration="3000"
            /></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
import { get_infrared_camera } from "@/api/device"

export default {
  components: { infoBlock },
  data() {
    return {
      tableData: [],
      color: [
        "linear-gradient(90deg, #FF1B1B 2%, #FF8989 100%)",
        "linear-gradient(90deg, #FFCC00 0%, #FFEA96 100%)",
        "linear-gradient(90deg, #317AFF 0%, #88C6FF 100%)",
        "linear-gradient(90deg, #23DE69 0%, #93FFBB 100%)"
      ],
      statisc: {
        total: 0
      }
    }
  },
  mounted() {
    this.getInfraredCamera()
  },
  methods: {
    async getInfraredCamera() {
      const data = await get_infrared_camera()
      this.tableData = data
      this.statisc.total = this.tableData[0].cameraCount
      this.tableData = this.tableData.filter((item, index) => {
        return index !== 0
      })
      this.tableData.map((item, index) => {
        this.color.map((i, ind) => {
          if (index === ind) {
            item.color = i
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.Infrare-camera {
  .title-right {
    color: #00eaff;
    font-size: 30px;

    &__unit {
      color: #fff;
      font-size: 14px;
    }
  }

  .info-content {
    :deep(.el-table th) {
      padding-bottom: 10px !important;
      border: none;
      background-color: transparent;
    }

    padding: 10px 20px 0 0;

    :deep(.el-table tr) {
      background-color: transparent;
    }

    :deep(
        .el-table--enable-row-transition .el-table__body td,
        .el-table .cell
      ) {
      padding: 0;
      padding-bottom: 9.5px;
      border: none;
      background-color: transparent;
    }

    :deep(.el-table__row td:nth-child(1)) {
      padding-right: 12px;
      color: #7ecef4;
    }

    :deep(.el-table .cell) {
      padding: 0;
      text-align: right;
    }

    :deep(.el-table .el-table__cell) {
      padding: 0;
    }

    .el-table::before {
      //去除底部白线

      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
    }

    .el-table,
    .el-table__expanded-cell {
      background-color: transparent;
    }

    .table-progress-bar {
      width: 100%;
      height: 6px;
      border-radius: 2px;
    }
  }
}
</style>
