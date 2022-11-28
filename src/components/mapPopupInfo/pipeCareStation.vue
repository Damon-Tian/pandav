<!-- 管护站 -->
<template>
  <div class="pipe-care-station">
    <div class="pipe-care-station__box">
      <div class="pipe-care-station__box__top">{{ dataDetail.name }}</div>
      <div class="pipe-care-station__box__info">
        <div class="row">
          <span class="row__label">建设时间：</span>
          <span class="row__value">{{ dataDetail.buildTime }}年</span>
        </div>
        <div class="row">
          <span class="row__label">在编人数：</span>
          <span class="row__value">{{ dataDetail.permanent }}人</span>
        </div>
        <div class="row">
          <span class="row__label">编外人数：</span>
          <span class="row__value">{{ dataDetail.unPermanent }}人</span>
        </div>
        <div class="row">
          <span class="row__label">占地面积：</span>
          <span class="row__value"> {{ dataDetail.floorArea }}平方米 </span>
        </div>
        <div class="row">
          <span class="row__label">建筑面积：</span>
          <span class="row__value"> {{ dataDetail.coveredArea }}平方米 </span>
        </div>
        <div class="row">
          <span class="row__label">规划管护面积：</span>
          <span class="row__value"> {{ dataDetail.protectArea }}公顷 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_org } from "@/api/mapPopupInfo"
export default {
  components: {},
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    dataDetail() {
      return this.$store.state.app.map.feature.properties
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.pipe-care-station {
  width: 300px;
  height: 260px;
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
      }
    }
  }
}
</style>
