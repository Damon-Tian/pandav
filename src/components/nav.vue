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
export default {
  data() {
    return {
      hrefs: [
        {
          name: "综合概况",
          id: "chengdu",
          url: "/profile/tuceng/ArcGis/_alllayers/{z}/{y}/{x}.png",
          view: {
            center: [103.37200312027926, 30.671440838957167],
            zoom: 9.838592817487967,
            pitch: 58.69748625766818,
            bearing: 0,
            duration: 12000,
            essential: true
          }
        },
        {
          name: "崇州站",
          id: "chongzhou",
          url: "http://3888z2k945.wicp.vip:6150/file/xiongmao/chongzhou/ArcGis/_alllayers/{z}/{y}/{x}.png",
          view: {
            bearing: 0,
            center: [103.45711202800089, 30.522769602585484],
            duration: 12000,
            essential: true,
            pitch: 53.51769981743894,
            zoom: 10.310552966704606
          }
        },
        {
          name: "大邑站",
          id: "dayi",
          url: "http://3888z2k945.wicp.vip:6150/file/xiongmao/dayi/ArcGis/_alllayers/{z}/{y}/{x}.png",
          view: {
            bearing: 0,
            center: [103.42625254689449, 30.492047976346925],
            duration: 12000,
            essential: true,
            pitch: 53.51769095010108,
            zoom: 10.531624037345626
          }
        },
        {
          name: "彭州站",
          id: "pengzhou",
          url: "http://3888z2k945.wicp.vip:6150/file/xiongmao/pengzhou/ArcGis/_alllayers/{z}/{y}/{x}.png",
          view: {
            bearing: 0,
            center: [103.8764645196427, 31.03717774580734],
            duration: 12000,
            essential: true,
            pitch: 53.93684150325133,
            zoom: 10.39665090798298
          }
        },
        {
          name: "都江堰站",
          id: "dujiangyan",
          url: "http://3888z2k945.wicp.vip:6150/file/xiongmao/dujiangyan/ArcGis/_alllayers/{z}/{y}/{x}.png",
          view: {
            bearing: 0,
            center: [103.60124114271571, 30.925828475655365],
            duration: 12000,
            essential: true,
            pitch: 55.289572892161736,
            zoom: 10.784372529307735
          }
        }
      ]
    }
  },
  computed: {
    currentArea() {
      return this.$store.state.app.currentArea
    }
  },
  methods: {
    requestFullScreen() {
      const docElm = document.documentElement
      if (docElm.requestFullscreen) {
        //W3C
        docElm.requestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        //FireFox
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        //Chrome等
        docElm.webkitRequestFullScreen()
      } else if (docElm.msRequestFullscreen) {
        //IE11
        docElm.msRequestFullscreen()
      }
    },
    handleClick(item) {
      this.$store.commit("app/SET_CURRENTAREA", item.id)
      this.$store.state.app.map.mapBox.fly(item.view)
      this.$store.state.app.map.mapBox.addlayer(item.url, item.id)
    },
    reset() {
      const currentItem = this.hrefs.find((item) => item.id == this.currentArea)
      this.$store.state.app.map.mapBox.fly(currentItem.view)
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
