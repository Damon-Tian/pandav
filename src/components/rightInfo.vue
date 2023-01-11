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
export default {
  components: {
    environment: () => import("./pageInfo/environment.vue"),
    resource: () => import("./pageInfo/resource"),
    basicPort: () => import("./pageInfo/basicPort/index.vue"),
    equipmentManagement: () => import("./pageInfo/equipmentManagement.vue"),
    patrolMgr: () => import("./pageInfo/patrolMgr/index.vue"),
    electron: () => import("./pageInfo/electron.vue")
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
