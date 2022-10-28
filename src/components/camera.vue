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
      <video-player style="width: 100%; flex: 1" />
      <video-player style="width: 100%; flex: 1; margin: 2px 0" />
      <video-player style="width: 100%; flex: 1" />
    </div>
  </div>
</template>

<script>
import videoPlayer from "@/components/videoPlayer/videoPlayer"
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      isCollapse: false
    }
  },
  watch: {
    isCollapse: function (val) {
      val ? this.$refs.demo.hideWindow() : this.$refs.demo.showWindow()
    }
  },
  methods: {
    narrowClick() {
      this.isCollapse = !this.isCollapse
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
}
</style>
