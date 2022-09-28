<template>
  <div class="p-nav">
    <div class="p-nav__icon">大熊猫国家公园成都片区自然资源监测平台</div>
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
        {
          name: "综合概况",
          id: "home",
          active: true
        },
        { name: "崇州站", id: "chongzhou" },
        { name: "大邑站", id: "dayi" },
        { name: "彭州站", id: "pengzhou" },
        { name: "都江堰站", id: "dujiangyan" }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.p-nav {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  background-image: url("../assets/img/p-header-back.png");
  background-size: 100% 100%;
  font-size: 20px;

  &__icon {
    position: relative;
    left: 20px;
    display: flex;
    height: 86px;
    align-items: center;
    color: white;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 6px;
  }

  &__hrefs {
    display: flex;
    height: 64px;
    align-items: center;

    span {
      position: relative;
      display: inline-block;
      padding: 48px;
      color: #00b4ff;
      font-size: 22px;
      letter-spacing: 2px;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 1px;
        height: 18px;
        background-color: #00b4ff;
        content: "";
        transform: translate(0, -50%) rotate(30deg);
      }

      &:first-child::before {
        display: none;
      }

      &.active {
        font-weight: 700;
        // text-shadow: 0px 1px 10px #231815;
        text-shadow: 0 1px 10px;

        &::after {
          position: absolute;
          bottom: 23px;
          left: 50%;
          width: 100%;
          height: 6px;
          background-image: url("../assets/img/p-nav-active.png");
          background-repeat: no-repeat;
          background-size: contain;
          content: "";
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
