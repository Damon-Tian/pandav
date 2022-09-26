<template>
  <div class="p-info-block">
    <div class="info-block__title">
      <div v-if="title" class="info-block__title__left">{{ title }}</div>
      <slot class="info-block__title__right" name="titleRight"></slot>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
.p-info-block {
  width: 470px;
  box-sizing: border-box;
  padding: 10px 0 0;
  border: 20px solid;
  border-image: url("../../assets/img/p-info-back.png") 22 fill;

  .info-block__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: white;
    font-size: 18px;
  }
}

.info-content {
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 60%);
  color: #d8d8d8;
}
</style>
