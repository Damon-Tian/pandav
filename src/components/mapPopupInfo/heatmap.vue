<!-- 设备 -->
<template>
  <div class="camera-info">
    <div class="camera-info__box">
      <div class="camera-info__box__top">人员热力图信息</div>
      <div class="camera-info__box__info">
        <div class="row">
          <span class="row__label">时间：</span>
          <span class="row__value">{{
            formatTime(dataDetail.properties.time)
          }}</span>
        </div>
        <div class="row">
          <span class="row__label">人数：</span>
          <span class="row__value">{{ dataDetail.properties.personNum }}</span>
        </div>
        <div class="row">
          <span class="row__label">经度：</span>
          <span class="row__value">{{
            dataDetail.geometry.coordinates[0]
          }}</span>
        </div>
        <div class="row">
          <span class="row__label">纬度：</span>
          <span class="row__value">
            {{ dataDetail.geometry.coordinates[1] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dataDetail() {
      return this.$store.state.app.map.feature
    }
  },
  methods: {
    formatTime(val) {
      const y = val.slice(0, 4)
      const m = val.slice(4, 6)
      const d = val.slice(6, 8)
      const h = val.slice(8, 10)
      return `${y}-${m}-${d} ${h}点`
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
    padding-bottom: 10px;
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
        margin-top: 14px;

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

          img {
            width: 124px;
            height: 72px;
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
