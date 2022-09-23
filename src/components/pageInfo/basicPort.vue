<template>
  <div>
    <info-block title="站点信息">
      <div class="info-content info-port">
        <div class="port-block">
          <p class="port-name">崇州站</p>
          <div class="port-content">
            <p class="port-content__position">
              <span>管护站</span>
              <span>5</span>
            </p>
            <p class="port-content__num">
              <span>人员</span>
              <span>45</span>
            </p>
          </div>
        </div>
      </div>
    </info-block>

    <info-block title="详细信息"></info-block>
  </div>
</template>

<script>
import infoBlock from "./infoBlock"
export default {
  components: { infoBlock }
}
</script>
<style lang="less" scoped>
.info-port {
  padding: 18px 24px 20px 20px;

  .port-block {
    .port-name {
      font-size: 14px;
      font-weight: 500;
      color: #7ecef4;
    }
    .port-content {
      margin-top: 11px;
      width: 183px;
      height: 64px;
      background: rgba(0, 29, 155, 0.4);
      border: 1px solid #1286b1;
      box-shadow: 0px 0px 12px 0px rgba(0, 175, 255, 0.4) inset;
      display: flex;
      position: relative;

      &::after {
        content: "";
        width: 0.1px;
        height: 26px;
        background-color: #0c1e6e;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      & > p {
        width: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        span {
          font-size: 14px;
          &:last-child {
            font-size: 24px;
            color: #00eaff;
            margin-top: 9px;
          }
        }
      }
    }
  }
}
</style>
