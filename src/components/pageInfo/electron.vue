<template>
  <div class="electron">
    <info-block title="电子围栏">
      <div class="info-content">
        <div class="electron__row">
          <div class="electron__row__title">核心区域</div>
          <div class="electron__row__info">
            <div class="electron-area">
              <div class="area-title">实时人数</div>
              <div class="area-number">78</div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">累计人数</div>
              <div class="area-number" style="color: #00eaff">975</div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">信息发送条数</div>
              <div class="area-number" style="color: #d9ea16">865</div>
            </div>
          </div>
        </div>
        <div class="electron__row">
          <div class="electron__row__title">一般</div>
          <div
            class="electron__row__info"
            style="
              border: 1px solid #1286b1;
              background: rgba(0, 29, 155, 40%);
              box-shadow: 0 0 12px 0 rgba(0, 175, 255, 40%) inset;
            "
          >
            <div class="electron-area">
              <div class="area-title">实时人数</div>
              <div class="area-number">245</div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">累计人数</div>
              <div class="area-number" style="color: #00eaff">3726</div>
            </div>
            <div class="separated-line"></div>
            <div class="electron-area">
              <div class="area-title">信息发送条数</div>
              <div class="area-number" style="color: #d9ea16">1765</div>
            </div>
          </div>
        </div>
      </div>
    </info-block>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="less" scoped>
.electron {
  .info-content {
    padding: 18px 20px;
  }

  &__row {
    &__title {
      margin-bottom: 11px;
      color: #7ecef4;
      font-size: 14px;
    }

    &__info {
      display: flex;
      height: 74px;
      align-items: center;
      border: 1px solid #ff5b5a;
      margin-bottom: 20px;
      background: rgba(255, 91, 90, 22%);
      box-shadow: 0 0 12px 0 rgba(255, 91, 90, 40%) inset;

      .area-title {
        margin-bottom: 6px;
        color: #d8d8d8;
        font-size: 14px;
      }

      .area-number {
        color: #19e194;
        font-size: 24px;
      }

      .electron-area {
        width: 33.33%;
        text-align: center;
      }

      .separated-line {
        width: 1px;
        height: 26px;
        background: #666;
      }
    }
  }
}
</style>
