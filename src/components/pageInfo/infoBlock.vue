<template>
  <div class="p-info-block">
    <div class="info-block__title">
      <div class="info-block__title__left" v-if="title">{{ title }}</div>
      <slot class="info-block__title__right" name="titleRight"></slot>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: ["title"]
}
</script>

<style lang="less" scoped>
.p-info-block {
  width: 470px;
  padding: 10px 0 0;
  box-sizing: border-box;
  // background: url("../../assets/img/p-info-back.png") no-repeat;
  // background-size: 100% 100%;
  border: 20px solid;
  border-image: url("../../assets/img/p-info-back.png") 22 fill;

  .info-block__title {
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between   ;
  }
}

.info-content {
  background-color: rgba(0, 0, 0, 0.6);
  color: #d8d8d8;
  box-sizing: border-box;
}
</style>
