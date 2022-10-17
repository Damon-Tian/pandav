<template>
  <div class="p-nav">
    <div class="p-nav__icon" @click="requestFullScreen">
      大熊猫国家公园成都片区自然资源监测平台
    </div>
    <div class="p-nav__hrefs">
      <span
        v-for="item in hrefs"
        :key="item.id"
        :class="currentTab === item.id ? 'active' : ''"
        @click="currentTab = item.id"
      >
        {{ item.name }}
        <span v-if="currentTab === item.id" class="back-text">{{
          item.name
        }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: "home",
      hrefs: [
        {
          name: "综合概况",
          id: "home"
        },
        { name: "崇州站", id: "chongzhou" },
        { name: "大邑站", id: "dayi" },
        { name: "彭州站", id: "pengzhou" },
        { name: "都江堰站", id: "dujiangyan" }
      ]
    }
  },
  methods: {
    requestFullScreen() {
      const el = document.documentElement
      const fullScreen =
        el.requestFullscreen ||
        el.mozRequestFullScreen ||
        el.webkitRequestFullscreen ||
        el.msRequestFullScreen
      fullScreen()
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
    font-size: 36px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  &__hrefs {
    display: flex;
    height: 64px;
    align-items: center;

    span {
      position: relative;
      display: inline-block;
      padding: 70px 18px 48px;
      color: #00b4ff;
      cursor: pointer;
      font-size: 24px;

      &::before {
        position: absolute;
        bottom: 28%;
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
        position: relative;
        font-weight: 700;
        // text-shadow: 0px 1px 10px #231815;
        text-shadow: 0 1px 8px;

        .back-text {
          position: absolute;
          top: 0;
          left: 0%;
          text-shadow: 1px 1px 1px #231815;
          white-space: nowrap;
        }

        &::after {
          position: absolute;
          bottom: 30px;
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
