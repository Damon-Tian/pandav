<template>
  <div
    v-if="isShow"
    class="alarm-info"
    :style="{
      left: isCollapse ? '264px' : '264px'
    }"
  >
    <div class="alarm-info__left">
      <img
        class="alarm-info__img"
        src="../../assets/img/alarmInfo/warning.png"
        alt=""
      />
      <div class="alarm-info__title">这里是巡护事件的报警信息...</div>
    </div>
    <i class="el-icon-close alarm-info__icon" @click="isShow = !isShow"></i>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    //左边tabs是否展开
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style lang="less" scoped>
.alarm-info {
  position: absolute;
  top: 37px;
  display: flex;
  width: 400px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid #ff3d3d;
  background: rgba(255, 50, 50, 30%);
  border-radius: 4px;
  color: #fffefe;

  &__left {
    display: flex;
    align-items: center;
  }

  &__title {
    margin-left: 11px;
  }

  &__icon {
    cursor: pointer;
  }
}
</style>
