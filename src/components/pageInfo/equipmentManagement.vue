<template>
  <div class="equipment-management">
    <camera/>
    <Infrare-camera/>
    <event-remind/>
  </div>
</template>

<script>
import camera from "./equipmentManagement/camera.vue"
import InfrareCamera from "./equipmentManagement/InfrareCamera.vue"
import eventRemind from "./equipmentManagement/eventRemind.vue"
export default {
  components: { camera, InfrareCamera, eventRemind }
}
</script>

<style lang="less" scoped>
.equipment-management {
  .title-right{
    font-size: 30px;
    color: #00EAFF;
    &__unit{
      color: #FFFFFF;
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>
