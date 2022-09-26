<template>
  <div>
    <PortInfo />
    <DetailInfo />
  </div>
</template>

<script>
import PortInfo from "./PortInfo.vue"
import DetailInfo from "./DetailInfo.vue"
export default {
  components: { DetailInfo, PortInfo }
}
</script>
