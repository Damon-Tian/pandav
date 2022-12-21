<!--
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-04 16:53:50
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-14 09:49:18
 * @FilePath: \pandav\src\components\camera.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="p-camera-wrap" :class="isCollapse ? 'camera-collapse' : ''">
    <span class="narrow-icon" @click="narrowClick">
      <img src="@/assets/img/p-leftbar-expand.png" alt="" />
      <!-- <img v-else src="@/assets/img/p-leftbar-expand.png" alt="" /> -->
    </span>

    <div
      style="
        display: flex;
        overflow: hidden;
        height: 100vh;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <video-player
        v-for="(item, index) in list"
        :key="item"
        style="width: 100%; flex: 1"
        :video-url="formatUrl(item)"
        :class="{ 'camera-space': index === 1 }"
        @fullscreen="handleFullscreen"
      />
    </div>
  </div>
</template>

<script>
import videoPlayer from "@/components/videoPlayer/videoPlayer"
import { get_video_list } from "@/api/device"
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      isCollapse: false,
      videoList: [],
      startIndex: 0,
      list: [],
      step: 3,
      timer: null
    }
  },
  mounted() {
    this.getVideoList()
  },
  methods: {
    narrowClick() {
      this.isCollapse = !this.isCollapse
      this.$store.commit("app/SET_RIGHT_COLLAPSE", this.isCollapse)
      this.$nextTick(() => {
        setTimeout(() => {
          this.$store.state.app.map.mapBox.resize()
        }, 500)
      })
    },
    async getVideoList() {
      this.videoList = await get_video_list()
      this.getList()
      this.handleAutoPlay()
    },
    getList() {
      let urls = []
      if (this.startIndex <= this.videoList.length - this.step) {
        urls = this.videoList.slice(
          this.startIndex,
          this.startIndex + this.step
        )
        this.startIndex += this.step
      } else {
        urls = this.videoList
          .slice(this.startIndex, this.videoList.length)
          .concat(
            this.videoList.slice(
              0,
              this.step - (this.videoList.length - this.startIndex)
            )
          )
        this.startIndex = this.videoList.length - this.startIndex
      }
      this.list = urls
    },
    setVideoUrl(url) {
      this.$set(this.list, 0, url)
    },
    formatUrl(url) {
      if (!url) return
      return url.replace(/^\s+|\s+$/g, "")
    },
    handleAutoPlay() {
      this.timer = setInterval(() => {
        this.getList()
      }, 5 * 60 * 1000)
    },
    handleFullscreen(isFullscreen) {
      if (isFullscreen) {
        clearInterval(this.timer)
      } else {
        this.handleAutoPlay()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.p-camera-wrap {
  position: relative;
  height: 932px;
  transition: all 0.5s;

  &.camera-collapse {
    width: 0;
  }

  .narrow-icon {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: -12px;
    cursor: pointer;
    transition: all 0.5s ease;

    &.narrow-icon-collapse {
      overflow: hidden;

      &::after {
        position: absolute;
        top: 50%;
        right: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent white;
        background-color: rgb(0, 174, 255);
        content: "";
        transform: translate(8px, -50%);
      }
    }
  }

  .camera-space {
    margin: 2px 0;
  }
}
</style>
