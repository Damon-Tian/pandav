<template>
  <div>
    <DHPlayer
      ref="video1"
      :path-list="pathList"
      video-id="testPlayer"
      :num="divisionNum"
      :show-bar="false"
      style="width: 100%; height: 100%"
      @getCurrentWindow="getCurrentWindow"
      @changeDivision="getDivisionNum"
      @picCap="picCap"
      @getError="getError"
    />
  </div>
</template>

<script>
import DHPlayer from "./DHPlayer"
export default {
  components: {
    DHPlayer
  },
  data() {
    return {
      channel1: "",
      channel2: "",
      videoType: "video1",
      pathList: [],
      divisionNum: 9
    }
  },
  mounted() {
    window.onresize = () => {}
    this.setRealTime(
      1,
      "rtsp://10.35.239.81:9090/dss/monitor/param?cameraid=1000018%240&substream=1&trackID=701"
    )
    this.setRealTime(
      4,
      "rtsp://10.35.239.81:9090/dss/monitor/param?cameraid=1000018%240&substream=1&trackID=701"
    )
    this.setRealTime(
      7,
      "rtsp://10.35.239.81:9090/dss/monitor/param?cameraid=1000018%240&substream=1&trackID=701"
    )
  },
  methods: {
    replay(snum) {
      //录像回放播放结束监听，demo中是重新再放一遍，用户可根据自身需求使用改方法
      this.$refs[this.videoType].setPlayback(this.pathList2[snum], snum)
    },
    setRealTime(snum, path) {
      this.$refs[this.videoType].setRealTime({
        channelId: this.channel1,
        snum,
        path
      })
    },
    //销毁窗口
    destroy() {
      this.$refs[this.videoType].destroy()
    },
    //重建
    init() {
      this.$refs[this.videoType].initVideo()
    }
  }
}
</script>
