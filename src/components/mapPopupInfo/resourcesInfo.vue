<!-- 生态资源 -->
<template>
  <div class="resources-info">
    <div class="resources-info__box">
      <div class="resources-info__box__top">{{ dataDetail.species }}</div>
      <div class="resources-info__box__info">
        <div class="row">
          <span class="row__label">分布地点:</span>
          <span class="row__value">{{ dataDetail.distribution }}</span>
        </div>
        <div class="row">
          <span class="row__label">保护等级:</span>
          <span class="row__value">{{ dataDetail.protectionLevel }}</span>
        </div>
        <div class="row">
          <span class="row__label">数量:</span>
          <span class="row__value">{{ dataDetail.number }}</span>
        </div>
        <div class="row">
          <span class="row__label">介绍:</span>
          <span class="row__value">
            {{ dataDetail.introduce }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { biodiversity_details } from "@/api/mapPopupInfo"
export default {
  components: {},
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
          this.biodiversityDetails()
        }
      },
      immediate: true
    }
  },
  methods: {
    async biodiversityDetails() {
      const data = await biodiversity_details({ id: this.id })
      this.dataDetail = data
    }
  }
}
</script>

<style lang="less" scoped>
.resources-info {
  width: 300px;
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

    &__top {
      height: 40px;
      border-bottom: 1px solid rgba(0, 174, 255, 25%);
      margin: 0 11px;
      color: #fff;
      font-size: 18px;
      line-height: 40px;
    }

    &__info {
      max-height: 237px;
      padding: 0 11px;
      font-size: 14px;
      overflow-y: auto;

      .row {
        margin-top: 10px;

        &__label {
          margin-right: 10px;
          color: #7ecef4;
        }

        &__value {
          color: #d8d8d8;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
