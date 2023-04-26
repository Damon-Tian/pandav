<template>
  <div class="p-nav">
    <div class="p-nav__icon" @click="requestFullScreen">
      大熊猫国家公园成都片区自然资源监测平台
    </div>
    <div class="p-nav__hrefs">
      <span
        v-for="item in hrefs"
        :key="item.id"
        :class="currentArea === item.id ? 'active' : ''"
        @click="handleClick(item)"
      >
        {{ item.name }}
        <span v-if="currentArea === item.id" class="back-text">{{
          item.name
        }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import mapUtil from "@/mixins/mapUtil"
export default {
  mixins: [mapUtil],
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    },
    currentTab() {
      return this.$store.state.app.currentTab
    }
  },
  watch: {
    currentTab(value) {
      const item = this.hrefs.find((item) => item.id == this.currentArea)
      if (value == 3 || value == 5) {
        this.$store.state.app.map.mapBox.fly(item.view)
        this.$store.state.app.map.mapBox.addlayer(
          "/map/xiongmao/ArcGis/_alllayers/{z}/{y}/{x}.png",
          "chengdu"
        )
      } else {
        this.$store.state.app.map.mapBox.fly(item.view)
        this.$store.state.app.map.mapBox.addlayer(item.url, item.id)
      }
    }
  },
  methods: {
    requestFullScreen() {
      const docElm = document.documentElement
      const isFullScreen = document.fullscreenElement
      if (isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
      } else {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullscreen) {
          docElm.webkitRequestFullscreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      }
    },
    handleClick(item) {
      this.$store.commit("app/SET_CURRENTAREA", item.id)
      if (this.currentTab == 3 || this.currentTab == 5) {
        this.$store.state.app.map.mapBox.fly(item.view)
        this.$store.state.app.map.mapBox.addlayer(
          "/map/xiongmao/ArcGis/_alllayers/{z}/{y}/{x}.png",
          "chengdu"
        )
      } else {
        this.$store.state.app.map.mapBox.fly(item.view)
        this.$store.state.app.map.mapBox.addlayer(item.url, item.id)
      }
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
    cursor: pointer;
    font-size: 2vw;
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
      font-size: 1.3vw;

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
