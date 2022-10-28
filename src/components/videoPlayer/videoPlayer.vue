<template>
  <div style="width: 330px; height: 200px">
    <!-- <easy-player :video-url="videoUrl" :live="true" style="height:100px"></easy-player> -->
    <iframe
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
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      videoUrl:
        "http://110.185.102.112:8888/live/liveStream_7L01618PAJF96DB_0_0/hls.m3u8",
      title: ""
    }
  },
  // components: { EasyPlayer },
  mounted() {
    this.getVideoList()
  },
  methods: {
    async getVideoList() {}
  }
}
</script>
