<template>
  <info-block key="asd" title="详细信息">
    <div class="info-content port-detail">
      <p class="p-label-info">
        <span>站点名称：</span>
        <span>123</span>
      </p>
      <div class="p-label-inline">
        <div class="p-label-info">
          <span>总人数：</span>
          <span>8人</span>
        </div>
        <div class="p-label-info">
          <span>原住民：</span>
          <span>40</span>
        </div>
      </div>
      <div class="p-label-inline">
        <div class="p-label-info">
          <span>建设情况：</span>
          <span>已完成</span>
        </div>
        <div class="p-label-info">
          <span>面积：</span>
          <span>6544m</span>
        </div>
      </div>
      <div class="p-label-info">
        <span>经纬度： </span>
        <span>135.123.123.113</span>
      </div>

      <div class="detail-info__table">
        <div class="detail-info__table-header">
          <span class="column1">事件名称</span>
          <span class="column1">时间</span>
          <span class="column2">成效</span>
        </div>

        <div class="event-remind">
          <div class="event-remind__content">
            <div
              v-for="(item, index) in eventRemindList"
              :key="index"
              class="event-remind__item"
            >
              <div class="event-remind__item__left column1">
                XXXXX摄像头A2抓拍到XXX事件到XXX事件
              </div>
              <div class="column1">2022/8/16 15:30</div>
              <div class="event-remind__item__rihgt column2">normal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </info-block>
</template>

<script>
export default {
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
.port-detail {
  padding: 22px 10px 30px 20px;
}

.detail-info__table {
  .column1 {
    width: 40%;
    padding-left: 13px;
  }

  .column2 {
    width: 20%;
    padding-left: 13px;
  }

  .detail-info__table-header {
    display: flex;
    align-items: center;
    border: 1px solid #006cff;
    margin: 26px 0 10px;

    span {
      display: inline-block;
      height: 32px;
      box-sizing: content-box;
      border-right: 1px solid #006cff;
      background: rgba(0, 108, 255, 20%);
      line-height: 32px;

      &:last-child {
        border-right: none;
      }
    }
  }
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
