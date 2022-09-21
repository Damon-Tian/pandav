<template>
  <div class="p-page__right-info">
    <homeInfo v-if="currentTab === 1" />
    <environment v-else-if="currentTab === 2" />
  </div>
</template>

<script>
import homeInfo from "./pageInfo/home"
import environment from "./pageInfo/environment"
export default {
  components: { homeInfo, environment },
  data() {
    return {
      currentTab: 2
    }
  }
}
</script>
<style lang="less" scopde>
.p-page__right-info {
  margin-right: 15px;
}
</style>
