<template>
  <easy-player
    ref="playerRef"
    :video-url="videoUrl"
    :live="true"
    style="width: 100%; height: 100%"
  ></easy-player>
</template>

<script>
import EasyPlayer from "@easydarwin/easyplayer"
export default {
  components: { EasyPlayer },
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
  watch: {
    videoUrl() {}
  },
  mounted() {
    this.getVideoList()
    // this.cancelContentMenu()
  },
  methods: {
    async getVideoList() {}
  }
}
</script>
<style>
.easy-player-right-menu {
  display: none !important;
}
</style>
