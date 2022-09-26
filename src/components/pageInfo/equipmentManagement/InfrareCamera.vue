<template>
  <info-block title="红外相机" class="Infrare-camera">
    <div slot="titleRight" class="title-right">
      376<span class="title-right__unit">台</span>
    </div>
    <div class="info-content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
          color: '#D8D8D8'
        }"
      >
        <el-table-column prop="name" width="80"> </el-table-column>
        <el-table-column prop="color,width">
          <template slot-scope="scope">
            <div
              :style="[
                { background: scope.row.color },
                { width: scope.row.width }
              ]"
              class="table-progress-bar"
            ></div>
          </template>
        </el-table-column>
        <el-table-column prop="equipment" label="设备数" width="70">
          <template slot-scope="scope">
            <span
              style="
                border-bottom: 1px solid #81bfff;
                color: #81bfff;
                font-size: 18px;
              "
              >{{ scope.row.equipment }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="newEquipment" label="新设备" width="70">
          <template slot-scope="scope">
            <span
              style="
                border-bottom: 1px solid #38ff59;
                color: #38ff59;
                font-size: 18px;
              "
              >{{ scope.row.newEquipment }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="oldEquipment" label="旧设备" width="70">
          <template slot-scope="scope">
            <span
              style="
                border-bottom: 1px solid #fdff44;
                color: #fdff44;
                font-size: 18px;
              "
              >{{ scope.row.oldEquipment }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
export default {
  components: { infoBlock },
  data() {
    return {
      tableData: [
        {
          name: "崇州站",
          color: "linear-gradient(90deg, #FF1B1B 2%, #FF8989 100%)",
          equipment: 156,
          newEquipment: 28,
          oldEquipment: 128,
          width: "100%"
        },
        {
          name: "大邑站",
          color: "linear-gradient(90deg, #FFCC00 0%, #FFEA96 100%)",
          equipment: 74,
          newEquipment: 22,
          oldEquipment: 52,
          width: "60%"
        },
        {
          name: "彭州站",
          color: "linear-gradient(90deg, #317AFF 0%, #88C6FF 100%)",
          equipment: 94,
          newEquipment: 12,
          oldEquipment: 82,
          width: "40%"
        },
        {
          name: "都江堰站",
          color: "linear-gradient(90deg, #23DE69 0%, #93FFBB 100%)",
          equipment: 71,
          newEquipment: 7,
          oldEquipment: 64,
          width: "20%"
        }
      ]
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
      margin-left: 10px;
      color: #fff;
      font-size: 14px;
    }
  }

  .info-content {
    padding-top: 14px;
    padding-right: 21px;

    :deep(.el-table th) {
      padding-bottom: 10px !important;
      border: none;
      background-color: transparent;
    }

    :deep(.el-table tr) {
      background-color: transparent;
    }

    :deep(.el-table--enable-row-transition .el-table__body td, .el-table
        .cell) {
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
