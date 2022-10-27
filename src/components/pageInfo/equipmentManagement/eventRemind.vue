<template>
  <info-block title="事件提醒" class="event-remind">
    <div class="info-content">
      <div
        v-for="(item, index) in eventRemindList"
        :key="index"
        class="event-remind__item"
      >
        <div class="event-remind__item__left">
          XXXXX摄像头A2抓拍到XXX事件到XXX事件
        </div>
        <div class="event-remind__item__rihgt">2022/8/16 15:30</div>
      </div>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
export default {
  components: { infoBlock },
  data() {
    return {
      eventRemindList: [
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        {
          name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件",
          time: "2022/8/16 15:30"
        },
        { name: "XXXXX摄像头A2抓拍到XXX事件到XXX事件", time: "2022/8/16 15:30" }
      ]
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

  &__item {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-left: 4px solid #00aeff;
    margin-bottom: 10px;
    background: #082044;
    color: #fff;
    font-size: 14px;

    &__left {
      overflow: hidden;
      width: 218px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
