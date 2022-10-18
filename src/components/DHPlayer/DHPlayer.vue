<template>
  <div :id="videoId"></div>
</template>

<script>
import "./videoPlayer"
import { MessageBox } from "element-ui"
export default {
  name: "DHPlayer",
  props: {
    videoId: {
      type: String,
      default: "1"
    },
    type: {
      //视频类型，1-实时视频，2-录像回放
      type: Number,
      default: 1
    },
    realTimeList: {
      //实时预览列表
      type: Array,
      default() {
        return []
      }
    },
    videoPlayList: {
      //录像回放对象列表
      type: Array,
      default() {
        return []
      }
    },
    pathList: {
      //录像回放/实时视频路径列表
      type: Array,
      default() {
        return []
      }
    },
    windowType: {
      //窗口类型
      type: Number,
      default: 0
    },
    num: {
      //子窗口个数
      type: Number,
      default: 1
    },
    connectTime: {
      //尝试连接事件，默认60s，一定时间连接断开，并弹出下载插件提示。
      type: Number,
      default: 60
    },
    outContent: {
      //当前窗口所处可视窗口的位置，比如iframe外部距离浏览器的位置
      type: Object,
      default() {
        return {
          top: 0,
          left: 0
        }
      }
    },
    downloadUrl: {
      //插件下载地址，ICC框架默认相对路径
      type: String,
      default: "/download/DHPlayer.zip"
    },
    showBar: {
      //是否显示下方控制栏。 true: 显示， false：隐藏
      type: Boolean,
      default: true
    },
    noTip: {
      //是否需要下载提示,默认需要，false。如果非ICC平台/未引入antd，可置为true
      type: Boolean,
      default: false
    },
    shieldClass: {
      //遮挡的元素class，尽量保证class元素的唯一
      type: Array,
      default() {
        return []
      }
    },
    parentIframeShieldClass: {
      //遮挡的父iframe元素class，尽量保证class元素的唯一
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      videoPlayer: null,
      playbackList: [],
      DHPVisible: false,
      DHPUrl: this.downloadUrl,
      DHPVersion: "",
      upgradeDHP: false,
      currentWindow: 0,
      divisionNum: 4
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  mounted() {
    this.initVideo()
  },
  methods: {
    //销毁视频
    destroy() {
      this.videoPlayer.destroy()
    },
    //初始化视频插件
    initVideo() {
      if (this.videoPlayer) {
        this.destroy()
      }
      this.videoPlayer = new window.VideoPlayer({
        isResetConnect: true, // 是否需要断线重连，true 重连，false 不重连
        videoId: this.videoId,
        windowType: this.windowType,
        connectTime: this.connectTime,
        shieldClass: this.shieldClass,
        parentIframeShieldClass: this.parentIframeShieldClass,
        showBar: this.showBar,
        num:
          Math.pow(
            Math.ceil(
              Math.sqrt(
                this.pathList.length ||
                  (this.type === 1
                    ? this.realTimeList.length
                    : this.videoPlayList.length)
              )
            ),
            2
          ) || this.num,
        outContent: this.outContent,
        connectSuccess: () => {
          this.DHPVersion = window.dhPlayerControl.DHPlayerVersion
          this.getVideoInfo(true)
        },
        // 连接关闭或断开回调
        connectClose: (err) => {
          console.log(err)
        },
        // 连接错误，插件未安装回调
        connectError: (err) => {
          if (err.message === "插件未安装") {
            MessageBox.confirm("下载DHPlayer播放器", "提示", {
              confirmButtonText: "下载",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              //下载大华PLyaer
            })
          }
        },
        //抓图成功
        snapshotSuccess: ({ base64Url, path }) => {
          this.$emit("picCap", {
            base64Url,
            path
          })
        },
        //录像回放时间栏拖拽回调
        switchStartTime: ({ startTime, snum }) => {
          const record = this.playbackList[snum]
          if (record) {
            if (record.request) {
              const videoParams = this.videoPlayList[snum]
              let endTime = videoParams.endTime
              if (startTime > endTime) {
                !this.noTip && this.$message.warning("开始时间不得大于结束时间")
                this.$emit("getError", "开始时间不得大于结束时间")
                return false
              }
              this.dealRecord(
                {
                  ...videoParams,
                  startTime
                },
                snum
              )
            } else {
              let endTime = this.getUrlParam(record.path, "endtime") - 0
              if (startTime > endTime) {
                !this.noTip && this.$message.warning("开始时间不得大于结束时间")
                this.$emit("getError", "开始时间不得大于结束时间")
                return false
              }
              this.setPlayback(
                {
                  ...record,
                  playStartTime: startTime
                },
                snum
              )
            }
          }
          this.$emit("switchStartTime", {
            startTime,
            snum
          })
        },
        replay: (snum) => {
          //录像回放播放结束回调，返回窗口
          this.$emit("replay", snum)
        },
        videoDownloadSuccess: (path) => {
          !this.noTip && this.$message.success(`本地录像已存到 ${path}`)
          this.$emit("videoDownloadSuccess", path)
        },
        //关闭视频窗口回调
        closeWindowSuccess: ({ isAll, snum }) => {
          this.$emit("closeWindowSuccess", {
            isAll,
            snum
          })
        },
        getCurrentWindow: (snum) => {
          this.currentWindow = snum
          this.$emit("getCurrentWindow", snum)
        },
        // 点击控件窗口触发返回当前点击的窗口index
        clickWindow: (snum) => {
          this.currentWindow = snum
          this.$emit("getCurrentWindow", snum)
          console.log(`当前点击了第${snum}个窗口`)
        },
        // 控件切换窗口数量时触发此方法返回当前窗口总数
        changeDivision: (divisionNum) => {
          this.divisionNum = divisionNum
          this.$emit("changeDivision", divisionNum)
        },
        createSuccess: (e) => {
          if (!this.showBar) {
            this.setShowBar(false)
          }
          if (this.pathList.length) {
            this.loadVideo()
          } else {
            this.getRTSPURL()
          }
        }
      })
    },
    realPlayer(param = {}) {},
    // 录像回放
    backPlayer(param = {}) {},
    getUrlParam(url, name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
      var r = url.match(reg) //匹配目标参数
      if (r != null) return unescape(r[2])
      return null //返回参数值
    },
    //显隐控制栏
    setShowBar(show) {
      this.videoPlayer.showControlBar(show)
    },
    // 设置悬浮字体
    setOSDInfo(options) {
      this.videoPlayer.setOSDInfo(options)
    },
    // 是否开启拖拽
    setDragEnable(enable) {
      this.videoPlayer.setWindowDragEnable({ enable })
    },
    // 全屏
    setFullScreen() {
      this.videoPlayer.setFullScreen()
    },
    //根据路径获取视频
    loadVideo() {
      if (this.type === 1) {
        this.pathList.forEach((val, index) => {
          let item = {
            snum: index
          }
          if (typeof val === "string") {
            item.path = val
          } else if (typeof val === "object") {
            item = { ...item, ...val }
          } else {
            return val
          }
          this.setRealTime(item)
        })
      } else {
        const list = []
        this.pathList.forEach((val, index) => {
          list.push({
            ...val,
            request: false
          })
          this.setPlayback(val, index)
        })
        this.playbackList = list
      }
    },
    //获取录像回放/实时预览路径
    getRTSPURL() {},
    //处理录像数据
    async dealRecord(val, index) {},
    //实时预览
    setRealTime(options) {
      this.videoPlayer.realmonitor({
        ...options
      })
    },
    //录像回放
    setPlayback(val, snum = 0) {
      this.videoPlayer.playback({
        snum,
        records: val.records || [], // 内部可以设置参数，回放可进行拖动
        path: val.url || val.path,
        startTime: val.startTime,
        endTime: val.endTime,
        redirect: val.redirect,
        playStartTime: val.playStartTime || val.startTime,
        playEndTime: val.playEndTime || val.endTime
      })
    },
    changeDivision(divisionNum) {
      this.videoPlayer.changeDivision(divisionNum)
    },
    //	录像下载
    recordDownload(val, snum) {
      this.videoPlayer.downloadRecord({
        snum,
        records: val.records || [], // 内部可以设置参数，回放可进行拖动
        url: val.url || val.path,
        startTime: val.startTime,
        endTime: val.endTime,
        redirect: val.redirect || true //是否重定向，true-重定向，false-非重定向，默认true
      })
    },
    // 本地录像下载
    localRecordDownload(snum) {
      this.videoPlayer.localRecordDownload(snum)
    },
    // 对讲
    setTalk(val, snum = 0) {
      this.videoPlayer.talk({
        snum,
        path: val.path,
        redirect: false, // 写死
        audioType: val.audioType,
        audioBit: val.audioBit,
        sampleRate: val.sampleRate,
        talkType: 1
      })
    },
    //rtsp路径拼接token
    dealUrl(data) {
      let path = data.url
      if (path.includes("|")) {
        path = path
          .split("|")
          .map((item) => {
            return item + "?token=" + data.token
          })
          .reverse()
          .join("|")
      } else {
        path = path + "?token=" + data.token
      }
      return path
    },
    //隐藏插件更新/下载提示
    hiddenDhp() {
      window.DHPVisible = this.DHPVisible = false
    },
    //隐藏窗口
    hideWindow(callback) {
      this.videoPlayer.hide(callback)
    },
    //显示窗口
    showWindow(callback) {
      this.videoPlayer.show(callback)
    },
    // 是否显示规划线
    isEnableIvs(option) {
      this.videoPlayer.isEnableIvs(option)
    },
    //元素遮挡处理
    windowShield(option) {
      this.videoPlayer.windowShield(option)
    },
    /**
     * @method 获取录像插件版本
     * @param {Boolean} success 判断ws是否连接成功，true: 成功，比较版本号；false: 失败,下载插件
     **/
    getVideoInfo(success) {},
    downloadDhp() {
      window.location.href = this.DHPUrl
      this.hiddenDhp()
    }
  }
}
</script>
