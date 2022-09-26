<template>
  <div class="p-camer-wrap" :class="isCollapse ? 'camera-collapse' : ''">
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
.p-camer-wrap {
  position: relative;
  width: 620px;
  height: 932px;
  transition: all 0.5s;

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
        background-color: rgb(0 174 255);
        content: "";
        transform: translate(8px, -50%);
      }
    }
  }
}

.right-block-scroll {
  border: 1px solid #00aeff;
  box-shadow: 0 0 25px 0 rgb(0 175 255 / 40%) inset;

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

      .p-camera__name {
        position: absolute;
        top: 0;
        display: flex;
        width: 100%;
        height: 32px;
        align-items: center;
        padding-left: 10px;
        background-color: rgb(0 0 0 / 20%);
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
