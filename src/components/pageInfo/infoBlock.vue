<template>
  <div class="p-info-block">
    <div v-if="title" class="info-block__title" :class="line ? 'hasLine' : ''">
      <div class="info-block__title__left">{{ title }}</div>
      <slot class="info-block__title__right" name="titleRight"></slot>
    </div>
    <slot v-else name="title" class="info-block__title" />
    <div v-if="line" class="info-block__line"></div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    line: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.p-info-block {
  position: relative;
  top: -2px;
  width: 470px;
  box-sizing: border-box;
  padding: 10px 0 0;
  border: 20px solid;
  margin-bottom: 8px;
  border-image: url("../../assets/img/p-info-back.png") 20 fill;

  .info-block__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: white;
    font-size: 18px;

    &.hasLine {
      position: relative;
      top: -8px;
    }
  }

  .info-block__line {
    position: relative;
    width: 100%;
    height: 11px;
    margin: -20px 0 10px;
    background: url("../../assets/img/p-info-block-header-line.png") no-repeat;
  }
}

.info-content {
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 60%);
  color: #d8d8d8;
}
</style>
