<template>
    <info-block title="摄像头" class="camera">
      <div slot="titleRight" class="title-right">1732<span class="title-right__unit">个</span>
      </div>
      <div class="info-content">
        <div class="info-content__state" style="margin-right: 52px;">
          <div class="info-content__state__title">正常运行</div>
          <div class="info-content__state__info">
            <div class="info-content__state__info__cameraimg">
              <img src="../../../assets/img/equipmentManagement/camera-normal.png" alt="">
            </div>
            <div class="info-content__state__info__rectangularimg">
              <img src="../../../assets/img/equipmentManagement/rectangular-normal.png" alt="">
              <div class="info-content__state__info__rectangularimg__text">1528个</div>
            </div>
          </div>
        </div>
        <div class="info-content__state">
          <div class="info-content__state__title">异常设备</div>
          <div class="info-content__state__info" style="background-color:rgba(255,0,0,0.13)">
            <div class="info-content__state__info__cameraimg">
              <img src="../../../assets/img/equipmentManagement/camera-abnormal.png" alt="">
            </div>
            <div class="info-content__state__info__rectangularimg">
              <img src="../../../assets/img/equipmentManagement/rectangular-abnormal.png" alt="">
              <div class="info-content__state__info__rectangularimg__text">146个</div>
            </div>
          </div>
        </div>
      </div>
    </info-block>
</template>

<script>
import infoBlock from "../infoBlock.vue"
export default {
  components: { infoBlock },
}
</script>

<style lang="less" scoped>
  .camera{
    .title-right{
    font-size: 30px;
    color: #00EAFF;
      &__unit{
        color: #FFFFFF;
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .info-content{
      display: flex;
      padding: 14px 47px 20px 47px;
        &__state{
          &__title{
              margin-bottom: 12px;
              color: #7ECEF4;
          }
          &__info{
            width: 140px;
            background-color:rgba(0,108,255,0.13);
            display: flex;
            justify-content: space-between;
            &__cameraimg{
              margin-top: 10px;
            }
            &__rectangularimg{
              position: relative;
              &__text{
                font-size: 18px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-50%) translateY(-50%);
                white-space: nowrap;
                
              }
            }
          }
        }
      }
  }
</style>
