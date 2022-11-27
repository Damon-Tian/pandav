<!-- 设备 -->
<template>
  <div class="camera-info">
    <div class="camera-info__box">
      <div class="camera-info__box__top">{{ dataDetail.deviceName }}</div>
      <div class="camera-info__box__info">
        <div class="row">
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
        <div class="row">
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
        <div class="row">
          <div class="row__label">
            {{ type == "video_camera" ? "在线监控" : "实时抓拍" }}：
          </div>
          <div v-if="type == 'video_camera'" class="row__video">
            <videoPlayer :video-url="dataDetail.deviceOnlineUrl" />
          </div>
          <div v-else class="row__img">
            <img
              v-if="imgUrl.length"
              :src="imgUrl[0]"
              alt=""
              class="content__box"
            />
            <videoPlayer
              v-if="videoUrl.length"
              :video-url="videoUrl[0]"
              class="content__box"
            />
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
export default {
  components: {
    videoPlayer
  },
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
      imgUrl: [],
      videoUrl: [],
      realTimeShoot: []
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
      if (this.type !== "video_camera") {
        const data = await get_real_time_shoot({
          pageSize: 99999,
          pageNumber: 1,
          searchParam: this.dataDetail.deviceSn
        })
        this.realTimeShoot = data.records
        if (!this.realTimeShoot.length) return
        this.realTimeShoot.map((item) => {
          item.url = item.path.split(",")
          if (item.url[0].indexOf("mp4") > -1) {
            item.fileType = 2
          } else {
            item.fileType = 1
          }
        })
        this.imgUrl = this.realTimeShoot.find((item) => item.fileType === 1).url
        this.videoUrl = this.realTimeShoot.find(
          (item) => item.fileType === 2
        ).url
      }
    }
  }
}
</script>

<style lang="less" scoped>
.camera-info {
  width: 350px;
  height: 334px;
  padding: 12px;
  border: 1px solid #00aeff;
  background: rgba(0, 29, 155, 60%);
  border-radius: 4px;
  box-shadow: 0 0 25px 0 rgba(0, 175, 255, 40%) inset;

  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  /* 滚动条上的滚动滑块 */
  ::-webkit-scrollbar-thumb {
    background: #3b60ab;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  &__box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 60%);
    overflow-y: auto;

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
