<template>
  <div class="p-nav">
    <div class="p-nav__icon">
      大熊猫国家公园成都片区自然资源监测平台
    </div>
    <div class="p-nav__hrefs">
      <span
        v-for="item in hrefs"
        :key="item.id"
        :class="item.active ? 'active' : ''"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hrefs: [
        { name: "综合概况", id: "home", active: true },
        { name: "崇州站", id: "chongzhou" },
        { name: "大邑站", id: "dayi" },
        { name: "彭州站", id: "pengzhou" },
        { name: "都江堰站", id: "dujiangyan" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.p-nav {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  background-image: url("../assets/img/p-header-back.png");
  background-size: 100% 100%;

  &__icon {
    font-size: 2rem;
    height: 86px;
    display: flex;
    align-items: center;
    letter-spacing: 6px;
    font-weight: 700;
    color: white;
    position: relative;
    left: 20px;
  }

  &__hrefs {
    height: 64px;
    display: flex;
    align-items: center;

    span {
      position: relative;
      color: #00b4ff;
      font-size: 22px;
      display: inline-block;
      padding: 48px;
      letter-spacing: 2px;

      &:first-child::before {
        display: none;
      }

      &::before {
        position: absolute;
        left: 0;
        content: "";
        width: 1px;
        height: 18px;
        top: 50%;
        background-color: #00b4ff;
        transform: translate(0, -50%) rotate(30deg);
      }
      &.active {
        // text-shadow: 0px 1px 10px #231815;
        text-shadow: 0px 1px 10px;
        font-weight: 700;

        &::after {
          content: "";
          position: absolute;
          bottom: 23px;
          width: 100%;
          height: 6px;
          background-image: url("../assets/img/p-nav-active.png");
          left: 50%;
          transform: translateX(-50%);
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
