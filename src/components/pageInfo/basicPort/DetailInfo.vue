<template>
  <info-block key="asd" title="详细信息">
    <div class="info-content port-detail">
      <div class="p-label-inline">
        <div class="p-label-info">
          <span>站点名称：</span>
          <span>xxx保护站</span>
        </div>
        <div class="p-label-info">
          <span>建设时间：</span>
          <span>2019年</span>
        </div>
      </div>
      <div class="p-label-inline">
        <div class="p-label-info">
          <span>占地面积：</span>
          <span>6577㎡</span>
        </div>
        <div class="p-label-info">
          <span>建筑面积：</span>
          <span>3577㎡</span>
        </div>
      </div>
      <div class="p-label-info">
        <span>人员：</span>
        <span> 在编(8) 编外(2) 总计(10) </span>
      </div>
      <div class="p-label-info" style="margin-bottom: 20px">
        <span>站点位置是否在大熊猫公园内： </span>
        <span>是</span>
      </div>
      <SwiperTable :config="config" />
    </div>
  </info-block>
</template>

<script>
import SwiperTable from "@/components/swiperTable/index.vue"
export default {
  components: { SwiperTable },
  data() {
    return {
      config: {
        header: ["事件名称", "时间", "成效"],
        headerHeight: 32,
        columnWidth: [156, 156, 83],
        headerBGC: "rgba(0, 108, 255, 0.2)",
        data: [
          ["1XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["2XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["3XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["4XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["5XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["6XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["7XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["8XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["9XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["10XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["11XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["12XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"],
          ["13XXXXX摄像头A2抓拍到XXX事件到XXX事件", "2022/8/16 15:30", "完成"]
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.port-detail {
  padding: 22px 10px 30px 20px;
}

.event-remind {
  &__content {
    overflow: scroll;
    height: 287px;
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
