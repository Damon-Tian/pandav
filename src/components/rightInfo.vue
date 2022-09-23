<template>
  <div class="p-page__right-info">
    <homeInfo v-if="currentTab === 1" />
    <environment v-else-if="currentTab === 2" />
    <resource v-else-if="currentTab === 3" />
    <basic-port v-else-if="currentTab === 4" />
    <equipment-management v-else-if="currentTab === 5"/>
    <patrol-mgr v-else-if="currentTab === 6" />
  </div>
</template>

<script>
import homeInfo from "./pageInfo/home"
import environment from "./pageInfo/environment"
import resource from "./pageInfo/resource"
import basicPort from "./pageInfo/basicPort"
import equipmentManagement from './pageInfo/equipmentManagement.vue'
import patrolMgr from "./pageInfo/patrolMgr/index"
export default {
  components: { homeInfo, environment, resource, basicPort ,patrolMgr, equipmentManagement},
  props:{
    currentTab:{
      type:[String,Number],
      default:null,
    }
  },
  data() {
    return {
      // currentTab: 6,
    }
  }
}
</script>
<style lang="less" scopde>
.p-page__right-info {
  margin-right: 15px;
}
</style>
