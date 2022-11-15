<!--
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-11-04 16:53:50
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-09 09:55:44
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
      <video-player style="width: 100%; flex: 1" :channel="1" />
      <video-player style="width: 100%; flex: 1; margin: 2px 0" :channel="2" />
      <video-player style="width: 100%; flex: 1" :channel="3" />
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
  methods: {
    narrowClick() {
      this.isCollapse = !this.isCollapse
      this.$nextTick(() => {
        setTimeout(() => {
          this.$store.state.app.map.mapBox.resize()
        }, 500)
      })
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
