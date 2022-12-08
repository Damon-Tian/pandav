<template>
  <info-block title="摄像机" class="camera" line>
    <div slot="titleRight" class="title-right">
      <countTo
        :start-val="0"
        :end-val="vidiconData.count"
        :duration="3000"
      /><span class="title-right__unit">个</span>
    </div>
    <div class="info-content">
      <div class="info-content__state" style="margin-right: 52px">
        <div class="info-content__state__title">正常运行</div>
        <div class="info-content__state__info">
          <div class="info-content__state__info__cameraimg">
            <img
              src="../../../assets/img/equipmentManagement/camera-normal.png"
              alt=""
            />
          </div>
          <div class="info-content__state__info__rectangularimg">
            <img
              src="../../../assets/img/equipmentManagement/rectangular-normal.png"
              alt=""
            />
            <div class="info-content__state__info__rectangularimg__text">
              <countTo
                :start-val="0"
                :end-val="vidiconData.normalNum"
                :duration="3000"
              />个
            </div>
          </div>
        </div>
      </div>
      <div class="info-content__state">
        <div class="info-content__state__title">异常设备</div>
        <div
          class="info-content__state__info"
          style="background-color: rgba(255, 0, 0, 13%)"
        >
          <div class="info-content__state__info__cameraimg">
            <img
              src="../../../assets/img/equipmentManagement/camera-abnormal.png"
              alt=""
            />
          </div>
          <div class="info-content__state__info__rectangularimg">
            <img
              src="../../../assets/img/equipmentManagement/rectangular-abnormal.png"
              alt=""
            />
            <div class="info-content__state__info__rectangularimg__text">
              <countTo
                :start-val="0"
                :end-val="vidiconData.unusualNum"
                :duration="3000"
              />个
            </div>
          </div>
        </div>
      </div>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
export default {
  components: { infoBlock },
  props: {
    vidiconData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // statisc: {
      //   normal: 0,
      //   error: 0,
      //   total: 0
      // }
    }
  },
  mounted() {
    // this.statisc = {
    //   normal: 1725,
    //   error: 134,
    //   total: 1859
    // }
  }
}
</script>

<style lang="less" scoped>
.camera {
  .title-right {
    color: #00eaff;
    font-size: 30px;

    &__unit {
      color: #fff;
      font-size: 14px;
    }
  }

  .info-content {
    display: flex;
    padding: 14px 47px 20px;

    &__state {
      &__title {
        margin-bottom: 12px;
        color: #7ecef4;
      }

      &__info {
        display: flex;
        width: 140px;
        justify-content: space-between;
        background-color: rgba(0, 108, 255, 13%);

        &__cameraimg {
          margin-top: 10px;
        }

        &__rectangularimg {
          position: relative;

          &__text {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 18px;
            transform: translateX(-50%) translateY(-50%);
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
