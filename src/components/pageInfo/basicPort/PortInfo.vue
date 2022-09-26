<template>
  <div>
    <info-block title="站点信息">
      <div class="info-content info-port">
        <div v-for="item in portList" :key="item.portList" class="port-block">
          <p class="port-name">
            {{ item.position }}
          </p>
          <div class="port-content">
            <p class="port-content__position">
              <span>管护站</span>
              <span>{{ item.numPosition }}</span>
            </p>
            <p class="port-content__num">
              <span>人员</span>
              <span>{{ item.numPerson }}</span>
            </p>
          </div>
        </div>
      </div>
    </info-block>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portList: [
        {
          position: "崇州站",
          numPosition: 5,
          numPerson: 19
        },
        {
          position: "大邑站",
          numPosition: 45,
          numPerson: 49
        },
        {
          position: "彭州站",
          numPosition: 15,
          numPerson: 139
        },
        {
          position: "都江堰站",
          numPosition: 25,
          numPerson: 59
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.info-port {
  display: grid;
  padding: 18px 24px 20px 20px;
  grid-gap: 20px;
  grid-template-columns: auto auto;

  .port-block {
    .port-name {
      color: #7ecef4;
      font-size: 14px;
      font-weight: 500;
    }

    .port-content {
      position: relative;
      display: flex;
      width: 183px;
      height: 64px;
      box-sizing: border-box;
      border: 1px solid #1286b1;
      margin-top: 11px;
      background: rgb(0 29 155 / 40%);
      box-shadow: 0 0 12px 0 rgb(0 175 255 / 40%) inset;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.1px;
        height: 26px;
        background-color: #0c1e6e;
        content: "";
        transform: translate(-50%, -50%);
      }

      & > p {
        display: flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
          font-size: 14px;

          &:last-child {
            margin-top: 9px;
            color: #00eaff;
            font-size: 24px;
          }
        }
      }
    }
  }
}

.port-detail {
  padding: 20px 10px 20px 20px;
}
</style>
