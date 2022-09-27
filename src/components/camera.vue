<template>
  <div class="p-camera-wrap" :class="isCollapse ? 'camera-collapse' : ''">
    <div class="weather-time">
      <div class="weather-time__timeinfo">2022 年 8 月 6 日 16 : 40 星期六</div>
      <div class="weather-time__weatherinfo">
        <img src="../assets/img/weather-cloudy.png" alt="" />
        <span class="weather-time__weatherinfo__text">多云 32℃</span>
      </div>
    </div>
    <span class="narrow-icon" @click="narrowClick">
      <img src="@/assets/img/p-leftbar-expand.png" alt="" />
      <!-- <img v-else src="@/assets/img/p-leftbar-expand.png" alt="" /> -->
    </span>
    <el-scrollbar style="height: 932px" class="right-block-scroll">
      <div class="p-camera">
        <div v-for="i in 20" :key="i" class="p-camera-block">
          <span class="p-camera__name"> {{ i }} 这里是摄像头名称 </span>
          <img
            src="@/assets/img/icon-expand.png"
            alt=""
            class="p-camera__expand"
          />
          <span
            style="
              position: absolute;
              top: 60%;
              left: 50%;
              color: #c0c4cc;
              font-size: 28px;
              text-shadow: 1px 1px 1px;
              transform: translate(-50%, -50%);
            "
            >暂无</span
          >
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    narrowClick() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.p-camera-wrap {
  position: relative;
  width: 620px;
  height: 932px;
  transition: all 0.5s;

  .weather-time {
    position: absolute;
    top: -46px;
    right: 0;
    display: flex;
    height: 35px;
    align-items: center;
    padding: 0 21px;
    background: rgba(0, 0, 0, 60%);
    border-radius: 4px;
    color: #fff;
    font-size: 16px;

    &__timeinfo {
      margin-right: 64px;
      white-space: nowrap;
    }

    &__weatherinfo {
      display: flex;
      align-items: center;
      white-space: nowrap;

      &__text {
        margin-left: 11px;
      }
    }
  }

  &.camera-collapse {
    width: 200px;
  }

  .narrow-icon {
    position: absolute;
    top: 45%;
    left: -12px;
    cursor: pointer;
    transition: all 0.5s ease;

    &.narrow-icon-collapse {
      overflow: hidden;

      &::after {
        position: absolute;
        top: 50%;
        right: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent white;
        background-color: rgb(0, 174, 255);
        content: "";
        transform: translate(8px, -50%);
      }
    }
  }
}

.right-block-scroll {
  border: 1px solid #00aeff;
  border-radius: 2px;
  box-shadow: 0 0 25px 0 rgba(0, 175, 255, 40%) inset;

  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }

  .p-camera {
    display: grid;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background-color: #001d9b;
    border-radius: 2px;
    grid-auto-rows: 143px;
    grid-gap: 10px;
    grid-template-columns: 295px 295px;

    .p-camera-block {
      position: relative;
      display: block;
      width: 295px;
      box-sizing: border-box;
      border: 1px solid goldenrod;
      background-color: #cfd3da;

      .p-camera__name {
        position: absolute;
        top: 0;
        display: flex;
        width: 100%;
        height: 32px;
        align-items: center;
        padding-left: 10px;
        background-color: rgba(0, 0, 0, 20%);
        color: white;
        font-weight: 500;
      }

      img {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
