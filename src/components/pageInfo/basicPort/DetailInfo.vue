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
      <div class="p-label-info">
        <span>站点位置是否在大熊猫公园内： </span>
        <span>是</span>
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
              <div class="event-remind__item__rihgt column2">完成</div>
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
      color: #7ecef4;
      font-size: 14px;
      letter-spacing: 1px;
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
