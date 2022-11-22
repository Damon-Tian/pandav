<template>
  <div style="width: 330px; height: 200px">
    <!-- <easy-player :video-url="videoUrl" :live="true" style="height:100px"></easy-player> -->
    <iframe
      ref="player"
      :src="`/static/test.html?videoUrl=${videoUrl}&title=${title}`"
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
    }
  },
  data() {
    return {
      title: ""
    }
  },
  // components: { EasyPlayer },
  mounted() {
    this.getVideoList()
    const player =
      this.$refs.player.contentWindow || this.$refs.player.contentDocument
    this.$nextTick(() => {
      setTimeout(() => {
        console.log(player.document)
        const playerEle = player.document.getElementById("player")
        playerEle.oncontextmenu = () => {
          playerEle.querySelector(".easy-player-right-menu").style.display =
            "none"
        }
      }, 2000)
    })
  },
  methods: {
    async getVideoList() {}
  }
}
</script>
