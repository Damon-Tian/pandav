<template>
  <div class="p-page__right-info">
    <environment v-if="currentTab === 2" />
    <resource v-if="currentTab === 3" />
    <basic-port v-else-if="currentTab === 4" />
    <equipment-management v-else-if="currentTab === 5" />
    <patrol-mgr v-else-if="currentTab === 6" />
    <electron v-else-if="currentTab === 7" />
  </div>
</template>

<script>
// import homeInfo from "./pageInfo/home"
import environment from "./pageInfo/environment"
import resource from "./pageInfo/resource"
import basicPort from "./pageInfo/basicPort/index"
import equipmentManagement from "./pageInfo/equipmentManagement.vue"
import patrolMgr from "./pageInfo/patrolMgr/index"
import electron from "./pageInfo/electron.vue"
export default {
  components: {
    environment,
    resource,
    basicPort,
    patrolMgr,
    equipmentManagement,
    electron
  },
  data() {
    return {
      // currentTab: 6,
    }
  },
  computed: {
    currentTab() {
      return this.$store.state.app.currentTab
    }
  }
}
</script>
<style lang="less" scopde>
.p-page__right-info {
  margin-right: 15px;
}
</style>
