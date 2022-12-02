<template>
  <info-block title="事件提醒" class="event-remind">
    <div class="info-content">
      <SwiperTable :config="config" />
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
import SwiperTable from "@/components/swiperTable/index.vue"
export default {
  components: {
    infoBlock,
    SwiperTable
  },
  data() {
    return {
      config: {
        columnWidth: [230, 156],
        swiperHeight: 280,
        data: [
          ["1XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["2XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["3XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["4XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["5XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["6XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["7XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["8XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["9XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["10XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["11XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["12XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"],
          ["13XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30"]
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.event-remind {
  .info-content {
    overflow: scroll;
    height: 320px;
    padding: 20px;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  :deep .swiper-table__data__box {
    margin-top: 5px !important;
  }
}
</style>
