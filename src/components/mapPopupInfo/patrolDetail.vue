<!-- 设备 -->
<template>
  <div class="camera-info">
    <div class="camera-info__box">
      <div class="camera-info__box__top">{{ dataDetail.patrolName }}</div>
      <div class="camera-info__box__info">
        <div class="row">
          <span class="row__label">所属机构：</span>
          <span class="row__value">{{ dataDetail.totalOrg }}</span>
        </div>
        <div v-if="dataDetail.patrolName == '样线巡护'" class="row">
          <span class="row__label">样线名称：</span>
          <span class="row__value">{{ dataDetail.line || "--" }}</span>
        </div>
        <div class="row">
          <span class="row__label">巡护编号：</span>
          <span class="row__value">{{ dataDetail.patrolNum || "--" }}</span>
        </div>
        <div class="row">
          <span class="row__label">巡护里程：</span>
          <span class="row__value">{{ dataDetail.route || "--" }} KM</span>
        </div>
        <div class="row">
          <span class="row__label">巡护时长：</span>
          <span class="row__value">{{
            dataDetail.dateSum ? chngeTime(dataDetail.dateSum) : "--"
          }}</span>
        </div>
        <div class="row">
          <span class="row__label">开始巡护时间：</span>
          <span class="row__value"> {{ dataDetail.startTime || "--" }}</span>
        </div>
        <div class="row">
          <span class="row__label">结束巡护时间：</span>
          <span class="row__value"> {{ dataDetail.endTime || "" }} </span>
        </div>

        <div class="row">
          <span class="row__label">巡护人员：</span>
          <span class="row__value">
            {{ dataDetail.join }}
          </span>
        </div>
        <div class="row">
          <span class="row__label">巡护情况记录：</span>
          <span class="row__value"> {{ dataDetail.situation || "--" }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_patrol_detail } from "@/api/line"
import { chngeTime } from "@/utils"
import mixins from "@/mixins"
export default {
  mixins: [mixins],
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      dataDetail: {}
    }
  },
  watch: {
    id: {
      handler: function () {
        if (this.id) {
          this.getDetail()
        }
      },
      immediate: true
    }
  },
  methods: {
    async getDetail() {
      this.dataDetail = await get_patrol_detail({ id: this.id })
    },
    chngeTime
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
