<template>
  <div style="width: 330px; height: 200px">
    <!-- <easy-player :video-url="videoUrl" :live="true" style="height:100px"></easy-player> -->
    <iframe
      ref="player"
      :src="`/test.html?videoUrl=${videoUrl}&title=${title}&autoplay=${autoplay}`"
      scrolling="”no”"
      frameborder="0"
      style="width: 100%; height: 100%"
      width="100%"
      height="100%"
    />
  </div>
</template>

<script>
export default {
  props: {
    channel: {
      type: Number,
      default: 1
    },
    videoUrl: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      title: "",
      player: null
    }
  },
  watch: {
    videoUrl() {
      this.cancelContentMenu()
    }
  },
  // components: { EasyPlayer },
  mounted() {
    this.getVideoList()
    this.cancelContentMenu()
  },
  beforeDestroy() {
    this.player && this.player.removeEventListener("fullscreenchange", () => {})
  },
  methods: {
    async getVideoList() {},
    cancelContentMenu() {
      const player =
        this.$refs.player.contentWindow || this.$refs.player.contentDocument
      this.$nextTick(() => {
        setTimeout(() => {
          const playerEle = player.document.getElementById("player")
          this.handleFullScreenChange(player)
          this.player = player
          playerEle.oncontextmenu = () => {
            playerEle.querySelector(".easy-player-right-menu").style.display =
              "none"
          }
        }, 2000)
      })
    },
    //视频是否进入全屏
    handleFullScreenChange(player) {
      player.addEventListener(
        "fullscreenchange",
        () => {
          const isFullScreen = player.document.fullscreenElement ? true : false
          this.$emit("fullscreen", isFullScreen)
        },
        false
      )
    }
  }
}
</script>
