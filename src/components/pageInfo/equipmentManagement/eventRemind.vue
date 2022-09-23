<template>
  <info-block title="事件提醒" class="event-remind">
    <div class="info-content">
        <div class="event-remind__item" v-for="(item,index) in eventRemindList" :key="index">
          <div class="event-remind__item__left">XXXXX摄像头A2抓拍到XXX事件到XXX事件</div>
          <div class="event-remind__item__rihgt">2022/8/16 15:30</div>
         </div>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
export default {
components: { infoBlock },
data(){
    return{
      eventRemindList:[
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
       {name:'XXXXX摄像头A2抓拍到XXX事件到XXX事件',time:'2022/8/16 15:30'},
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.event-remind{
  .info-content{
    padding: 20px;
    height: 390px;
    overflow: scroll;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
    }
  &__item{
    height: 40px;
    color: #FFFFFF;
    border-left: 4px solid #00AEFF;
    background: #082044;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 0 10px;
    justify-content: space-between;
    margin-bottom: 10px;
    &__left{
      width: 218px;
      overflow: hidden; 
      white-space: nowrap; 
      text-overflow: ellipsis; 
    }
  }
}
</style>
