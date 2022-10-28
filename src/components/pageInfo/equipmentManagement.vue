<template>
  <div class="equipment-management">
    <!-- <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="tab"
        :class="{ 'active-tab': tab == activeName }"
        @click="activeName = tab"
      >
        {{ tab }}
      </div>
    </div>
    <div v-if="activeName == '设备管理'">
      
    </div>

    <environment v-else /> -->
    <camera />
    <Infrare-camera />
    <event-remind />
  </div>
</template>

<script>
import camera from "./equipmentManagement/camera.vue"
import InfrareCamera from "./equipmentManagement/InfrareCamera.vue"
import eventRemind from "./equipmentManagement/eventRemind.vue"

// import environment from "./environment.vue"
const tabs = ["设备管理", "生态设备"]
export default {
  components: { camera, InfrareCamera, eventRemind },
  data() {
    return {
      tabs,
      activeName: tabs[0]
    }
  }
}
</script>

<style lang="less" scoped>
.equipment-management {
  .tabs {
    display: flex;
    overflow: hidden;
    align-items: center;
    border: 1px solid #0b90c2;
    margin: 0 5px;
    margin-bottom: 10px;
    border-radius: 4px;

    .tab {
      height: 40px;
      flex: 1;
      background: transparent;
      color: #979797;
      font-size: 16px;
      font-weight: 500;
      line-height: 40px;
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    }

    .active-tab {
      background: #0b90c2;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
