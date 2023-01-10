<!-- 设备 -->
<template>
  <div class="camera-info">
    <div class="camera-info__box">
      <div class="camera-info__box__top">{{ dataDetail.deviceName }}</div>
      <div class="camera-info__box__info">
        <div
          v-if="type == 'video_camera' || type == 'infrared_camera'"
          class="row"
        >
          <span class="row__label">设备编号：</span>
          <span class="row__value">{{ dataDetail.deviceSn }}</span>
        </div>
        <div class="row">
          <span class="row__label">地点：</span>
          <span class="row__value">{{ dataDetail.deviceAddress }}</span>
        </div>
        <div class="row">
          <span class="row__label">经度：</span>
          <span class="row__value">{{ dataDetail.longitude }}</span>
        </div>
        <div class="row">
          <span class="row__label">纬度：</span>
          <span class="row__value">
            {{ dataDetail.latitude }}
          </span>
        </div>
        <div v-if="dataDetail.deploymentTime" class="row">
          <span class="row__label">布设时间：</span>
          <span class="row__value">
            {{ dataDetail.deploymentTime }}
          </span>
        </div>
        <div v-if="type == 'infrared_camera'" class="row">
          <span class="row__label">剩余电量：</span>
          <span class="row__value">
            {{ dataDetail.remainingElectricity }}
          </span>
        </div>
        <div class="row">
          <span class="row__label">状态：</span>
          <span class="row__value">
            {{ dataDetail.deviceStatus ? "异常" : "正常" }}
          </span>
        </div>
        <div v-if="type == 'infrared_camera'" class="row">
          <div class="row__label">
            实时抓拍：
            <span
              v-if="capture && capture.length"
              style="color: #fff; cursor: pointer"
              @click="goRealtimeCapture(dataDetail.deviceSn)"
              >查看更多></span
            >
            <span v-else style="color: #fff"> 暂无</span>
          </div>
          <div class="row__img">
            <div v-for="item in capture" :key="item.id">
              <videoPlayer
                v-if="item.path.indexOf('.mp4') !== -1"
                :video-url="item.path"
                :autoplay="false"
                class="content__box"
              />
              <img v-else :src="item.path" alt="" class="content__box" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_device_by_id } from "@/api/device"
import { get_real_time_shoot } from "@/api/mapPopupInfo"
import videoPlayer from "../videoPlayer/videoPlayer.vue"
import mixins from "@/mixins"
export default {
  components: {
    videoPlayer
  },
  mixins: [mixins],
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: "video_camera"
    }
  },
  data() {
    return {
      dataDetail: {},
      capture: []
    }
  },
  watch: {
    id: {
      handler: function () {
        if (this.id) {
          this.getDeviceDetail()
        }
      },
      immediate: true
    }
  },
  methods: {
    async getDeviceDetail() {
      this.dataDetail = await get_device_by_id(this.id)
      if (this.type == "video_camera" && this.dataDetail.deviceOnlineUrl) {
        this.$emit("onlineUrl", this.dataDetail.deviceOnlineUrl)
      }
      if (this.type == "infrared_camera") {
        const { records } = await get_real_time_shoot({
          deviceSn: this.dataDetail.deviceSn,
          pageSize: 2,
          pageNumber: 1
        })
        this.capture = records.map((item) => item.realtimeShootVos[0])
      }
    }
  }
}
</script>

<style lang="less" scoped>
.camera-info {
  width: 350px;
  max-height: 334px;
  padding: 12px;
  border: 1px solid #00aeff;
  background: rgba(0, 29, 155, 60%);
  border-radius: 4px;
  box-shadow: 0 0 25px 0 rgba(0, 175, 255, 40%) inset;
  overflow-y: auto;

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

  &__box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 10px;
    background: rgba(0, 0, 0, 60%);

    &__top {
      height: 40px;
      border-bottom: 1px solid rgba(0, 174, 255, 25%);
      margin: 0 11px;
      color: #fff;
      font-size: 18px;
      line-height: 40px;
    }

    &__info {
      padding: 0 11px;
      font-size: 14px;

      .row {
        margin-top: 10px;

        &__label {
          margin-right: 10px;
          color: #7ecef4;
        }

        &__value {
          color: #d8d8d8;
        }

        &__img {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 10px;

          .content__box {
            width: 152px !important;
            height: 85px !important;
            margin-bottom: 10px;
          }
        }

        &__video {
          width: 100%;
          height: 139px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
