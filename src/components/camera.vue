<template>
  <div class="p-camer-wrap" :class="isCollapse ? 'camera-collapse' : ''">
    <span class="narrow-icon" @click="narrowClick">
      <img src="@/assets/img/p-leftbar-expand.png" alt="" />
      <!-- <img v-else src="@/assets/img/p-leftbar-expand.png" alt="" /> -->
    </span>
    <el-scrollbar style="height:932px" class="right-block-scroll">
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
    };
  },
  methods: {
    narrowClick() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang="less" scoped>
.p-camer-wrap {
  width: 620px;
  height: 932px;
  transition: all 0.5s;

  &.camera-collapse {
    width: 200px;
  }
  .narrow-icon {
    position: absolute;
    top: 45%;
    left: 7px;
    cursor: pointer;
    transition: all 0.5s ease;

    &.narrow-icon-collapse {
      overflow: hidden;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(8px, -50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent white;
        background-color: rgb(0, 174, 255);
      }
    }
  }
}
.right-block-scroll {
  border: 1px solid #00aeff;
  box-shadow: 0px 0px 25px 0px rgba(0, 175, 255, 0.4) inset;

  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .p-camera {
    width: 100%;
    border-radius: 2px;
    background-color: #001d9b;
    padding: 10px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 295px 295px;
    grid-auto-rows: 143px;
    grid-gap: 10px;

    .p-camera-block {
      width: 295px;
      display: block;
      box-sizing: border-box;
      border: 1px solid goldenrod;
      position: relative;

      .p-camera__name {
        height: 32px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        color: white;
        width: 100%;
        position: absolute;
        top: 0;
        background-color: rgba(0, 0, 0, 0.2);
        font-weight: 500;
      }
      img {
        position: absolute;
        right: 5px;
        bottom: 5px;
        cursor: pointer;
        padding: 5px;
      }
    }
  }
}
</style>
