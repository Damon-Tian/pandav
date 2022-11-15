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
const videoList = [
  "http://110.185.102.112:8888/live/liveStream_7D0BA59PAN1009F_0_0/hls.m3u8",
  "http://110.185.102.112:8888/live/liveStream_7D0BA59PAN47B6F_0_0/hls.m3u8",
  "http://110.185.102.112:8888/live/liveStream_7L01618PAJBE31A_0_0/hls.m3u8"
]
export default {
  props: {
    channel: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      title: "",
      videoUrl: ""
    }
  },
  // components: { EasyPlayer },
  mounted() {
    this.getVideoList()
  },
  methods: {
    async getVideoList() {
      this.videoUrl = videoList[this.channel - 1]
      console.log(this.videoUrl)
    }
  }
}
</script>
