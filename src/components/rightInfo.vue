<template>
  <div class="p-page__right-info">
    <homeInfo v-if="currentTab === 1" />
    <environment v-else-if="currentTab === 2" />
    <resource v-else-if="currentTab === 3" />
    <basic-port v-else-if="currentTab === 4" />
  </div>
</template>

<script>
import homeInfo from "./pageInfo/home"
import environment from "./pageInfo/environment"
import resource from "./pageInfo/resource"
import basicPort from "./pageInfo/basicPort"
export default {
  components: { homeInfo, environment, resource, basicPort },
  data() {
    return {
      currentTab: 4
    }
  }
}
</script>
<style lang="less" scopde>
.p-page__right-info {
  margin-right: 15px;
}
</style>
