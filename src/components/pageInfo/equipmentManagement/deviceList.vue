/* 设备列表 */
<template>
  <div ref="deviceList" class="device-list">
    <table>
      <tr class="header">
        <th align="left" width="170">
          <div class="th-cell">
            <div>设备名称</div>
            <el-popover
              placement="bottom"
              :width="170"
              popper-class="device-popper"
              trigger="click"
              :visible-arrow="false"
            >
              <template #reference>
                <div class="el-icon-caret-bottom"></div>
              </template>
              <el-input
                v-model="filters.equipmentName"
                size="small"
                placeholder="请输入设备名称"
              ></el-input>
              <div class="operate">
                <el-link
                  :disabled="!filters.equipmentName"
                  size="mini"
                  :underline="false"
                  @click="filterChange"
                  >筛选</el-link
                >
                <el-link
                  size="mini"
                  :underline="false"
                  @click="
                    filters.equipmentName = ''
                    filterChange()
                  "
                  >重置</el-link
                >
              </div>
            </el-popover>
          </div>
        </th>
        <th align="left" width="90">
          <div class="th-cell">
            <div>设备类型</div>
            <el-popover
              placement="bottom"
              :width="60"
              popper-class="device-popper"
              trigger="click"
              :visible-arrow="false"
            >
              <template #reference>
                <div class="el-icon-caret-bottom"></div>
              </template>
              <el-checkbox-group
                v-model="filters.equipmentType"
                class="checkbox-group"
              >
                <el-checkbox label="infrared_camera">红外相机</el-checkbox>
                <el-checkbox label="video_camera">摄像机</el-checkbox>
              </el-checkbox-group>
              <div class="operate">
                <el-link
                  :disabled="
                    !(filters.equipmentType && filters.equipmentType.length)
                  "
                  size="mini"
                  :underline="false"
                  @click="filterChange"
                  >筛选</el-link
                >
                <el-link
                  size="mini"
                  :underline="false"
                  @click="
                    filters.equipmentType = []
                    filterChange()
                  "
                  >重置</el-link
                >
              </div>
            </el-popover>
          </div>
        </th>
        <th align="left" width="100">
          <div class="th-cell">
            <div>所属机构</div>
            <el-popover
              placement="bottom"
              popper-class="device-popper"
              trigger="click"
              :visible-arrow="false"
            >
              <template #reference>
                <div class="el-icon-caret-bottom"></div>
              </template>
              <div class="tree-container">
                <el-tree
                  ref="tree"
                  :data="orgIdssTree"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="filters.orgIds"
                  :check-strictly="true"
                  :props="defaultProps"
                  accordion
                  @check-change="handleCheckChange"
                >
                </el-tree>
              </div>
              <div class="operate">
                <el-link
                  :disabled="!(filters.orgIds && filters.orgIds.length)"
                  size="mini"
                  :underline="false"
                  @click="filterChange"
                  >筛选</el-link
                >
                <el-link
                  size="mini"
                  :underline="false"
                  @click="
                    filters.orgIds = []
                    filterChange()
                    $refs.tree.setCheckedKeys([])
                  "
                  >重置</el-link
                >
              </div>
            </el-popover>
          </div>
        </th>
        <th width="60" align="left">
          <div class="th-cell">
            <div>状态</div>
            <el-popover
              placement="bottom"
              :width="60"
              popper-class="device-popper"
              trigger="click"
              :visible-arrow="false"
            >
              <template #reference>
                <div class="el-icon-caret-bottom"></div>
              </template>
              <el-checkbox-group
                v-model="filters.status"
                class="checkbox-group"
              >
                <el-checkbox :label="0">正常</el-checkbox>
                <el-checkbox :label="1">异常</el-checkbox>
              </el-checkbox-group>
              <div class="operate">
                <el-link
                  :disabled="!(filters.status && filters.status.length)"
                  size="mini"
                  :underline="false"
                  @click="filterChange"
                  >筛选</el-link
                >
                <el-link
                  size="mini"
                  :underline="false"
                  @click="
                    filters.status = []
                    filterChange()
                  "
                  >重置</el-link
                >
              </div>
            </el-popover>
          </div>
        </th>
      </tr>
    </table>
    <div style="overflow: auto; height: calc(100% - 50px)">
      <table>
        <tbody>
          <tr
            v-for="(item, index) in tableData"
            :key="item.deviceSn + index"
            :class="{ active: currentDevice.deviceSn === item.deviceSn }"
            @click="handleClick(item)"
          >
            <td :title="item.equipmentName">
              <div class="name">
                {{ item.equipmentName }}
              </div>
            </td>
            <td>
              {{
                item.equipmentType == "infrared_camera" ? "红外相机" : "摄像机"
              }}
            </td>
            <td>{{ formatOrg(item.orgId) }}</td>
            <td>
              <span
                :class="{
                  error: item.status === 1,
                  success: item.status === 0
                }"
              >
                {{ item.status === 1 ? "异常" : "正常" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  get_device_list_new,
  get_device_by_devicesn,
  get_camera_geojson_item
} from "@/api/device"
import { get_org } from "@/api/station"
import { formatOrgName, transListToTreeData } from "@/utils"
import mapUtil from "@/mixins/mapUtil"
const mapId = ["红外相机", "摄像机"]

export default {
  mixins: [mapUtil],
  data() {
    return {
      tableData: [],
      currentDevice: {},
      filters: {
        equipmentName: "",
        equipmentType: ["infrared_camera", "video_camera"],
        orgIds: [],
        status: []
      },
      orgIdss: [],
      orgIdssTree: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    }
  },
  computed: {
    videoCameraIcon() {
      return this.$store.state.app.videoCameraIcon
    }
  },
  mounted() {
    this.filterChange()
    this.getOrg()
  },
  methods: {
    async filterChange() {
      console.log(this.videoCameraIcon, "图标列表")
      if (this.videoCameraIcon && this.videoCameraIcon.length > 0) {
        this.videoCameraIcon.forEach((item, i) => {
          this.removelayer(1, "设备管理" + i)
        })
        this.$store.commit("app/SET_VIDEO_CAMERA_ICON", [])
      } else {
        this.removelayer(1, "设备管理")
      }
      const params = {
        pageNumber: 1,
        pageSize: 9999
      }
      for (const key in this.filters) {
        const value = this.filters[key]
        if (value && value.length) {
          params[key] = value
        }
      }
      const data = await get_device_list_new(params)
      this.tableData = data
      const geoJson = []
      this.tableData.forEach((item) => {
        if (item.equipmentType == "infrared_camera") {
          item.equipmentName = item.deviceAddress
        }
        const json = get_camera_geojson_item(item)
        geoJson.push(json)
      })

      const list = [...new Set(geoJson.map((item) => item.img))]
      if (list.length > 1) {
        this.$store.commit("app/SET_VIDEO_CAMERA_ICON", list)
        list.forEach((item, i) => {
          this.setLayer(
            1,
            "设备管理" + i,
            geoJson.filter((item) => item.img == list[i])
          )
        })
      } else {
        this.setLayer(1, "设备管理", geoJson)
      }
    },
    async getOrg() {
      const { records } = await get_org({
        pageNumber: 1,
        pageSize: 9999
      })
      this.orgIdss = Object.freeze(records)
      this.orgIdssTree = transListToTreeData(records, 0)
    },
    formatOrg(orgIds) {
      const org = this.orgIdss.find((item) => item.id == orgIds)
      const name = org && org.name
      return formatOrgName(name)
    },
    handleCheckChange() {
      const keys = this.$refs.tree.getCheckedKeys()
      this.filters.orgIds = keys
    },
    async handleClick(item) {
      if (item.deviceSn == this.currentDevice.deviceSn) {
        this.currentDevice = {}
        this.reset()
      } else {
        this.currentDevice = item
        const cameraDetail = await get_device_by_devicesn({
          deviceSn: item.deviceSn
        })
        const geoData = [get_camera_geojson_item(cameraDetail)]
        const center = geoData[0].geometry.coordinates
        this.flyToDetailZoom(center, geoData[0])
      }
    }
  }
}
</script>
<style scoped lang="less">
.device-list {
  overflow: auto;
  height: 100%;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;

    th,
    td {
      padding-left: 5px;
      vertical-align: middle;
    }

    .header {
      height: 32px;
      border: 1px solid #006cff;
      background: rgba(0, 108, 255, 20%);
      color: #7ecef4;
      font-size: 14px;
      font-weight: 500;

      th .th-cell {
        display: flex;
        justify-content: space-between;
      }

      th {
        border: 1px solid #006cff;
        border-right: none;

        &:last-child {
          border-right: 1px solid #006cff;
        }
      }
    }

    tbody tr {
      height: 40px;
      background: #082044;
      color: #fff;
      font-size: 14px;
      font-weight: 500;

      & td:first-child {
        padding-left: 10px;
        border-left: 4px solid #006cff;
      }
    }

    tbody .active {
      background: #0b90c2;
    }
  }

  .name {
    overflow: hidden;
    width: 110px;
    color: #00e4ff;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .error {
    &::before {
      background-color: #f00;
    }
  }

  .success {
    &::before {
      background-color: #16d0ff;
    }
  }

  .success,
  .error {
    color: #fff;

    &::before {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 5px;
      border-radius: 50%;
      content: "";
    }
  }
}
</style>

<style lang="less">
.checkbox-group {
  display: flex;
  flex-direction: column;
}

.tree-container {
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  /* 滚动条上的滚动滑块 */
  &::-webkit-scrollbar-thumb {
    background: #eee;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}

.operate {
  margin-top: 10px;
  text-align: right;

  a {
    margin-left: 10px;
  }
}

.device-popper {
  border: none;
}
</style>
