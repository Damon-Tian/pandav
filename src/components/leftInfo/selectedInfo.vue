<template>
  <div
    class="selected-info"
    :style="{
      left: isCollapse ? '134px' : '264px'
    }"
  >
    <div class="selected-info-list">
      <div
        v-for="(item, index) in selectedInfoList"
        :key="index"
        class="selected-info-list__item"
      >
        <div class="selected-info-list__item__icon">
          <img :src="item.img" alt="" />
        </div>
        <div class="selected-info-list__item__text">{{ item.title }}</div>
        <div
          class="selected-info-list__item__checkbox"
          @click="item.checked = !item.checked"
        >
          <img
            v-if="item.checked"
            src="../../assets/img/selectedInfo/checked.png"
            alt=""
          />
          <img
            v-if="!item.checked"
            src="../../assets/img/selectedInfo/check.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    //左边tabs是否展开
    isCollapse: {
      type: Boolean,
      default: false
    },
    //左边tab点击的状态
    currentTab: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      selectedInfoList1: [
        {
          img: require("../../assets/img/selectedInfo/core.png"),
          title: "核心保护区",
          checked: true,
          id: "1"
        },
        {
          img: require("../../assets/img/selectedInfo/general.png"),
          title: "一般保护区",
          checked: true,
          id: "2"
        },
        {
          img: require("../../assets/img/selectedInfo/ecological.png"),
          title: "生态环境",
          checked: false,
          id: "3"
        },
        {
          img: require("../../assets/img/selectedInfo/natural.png"),
          title: "自然资源",
          checked: false,
          id: "4"
        },
        {
          img: require("../../assets/img/selectedInfo/site.png"),
          title: "基层站点",
          checked: false,
          id: "5"
        },
        {
          img: require("../../assets/img/selectedInfo/equipment.png"),
          title: "设备管理",
          checked: false,
          id: "6"
        },
        {
          img: require("../../assets/img/selectedInfo/patrol.png"),
          title: "巡护管理",
          checked: true,
          id: "7"
        },
        {
          img: require("../../assets/img/selectedInfo/fence.png"),
          title: "电子围栏",
          checked: true,
          id: "8"
        }
      ],
      selectedInfoList2: [
        {
          img: require("../../assets/img/selectedInfo/core.png"),
          title: "核心保护区",
          checked: true,
          id: "1"
        },
        {
          img: require("../../assets/img/selectedInfo/general.png"),
          title: "一般保护区",
          checked: true,
          id: "2"
        }
      ]
    }
  },
  computed: {
    selectedInfoList() {
      return this.currentTab === 1
        ? this.selectedInfoList1
        : this.selectedInfoList2
    }
  }
}
</script>

<style lang="less" scoped>
.selected-info {
  position: absolute;
  bottom: -26px;
  width: 180px;
  // height: 432px;
  box-sizing: border-box;
  padding: 40px 10px 8px;
  background: rgba(0, 0, 0, 60%);
  border-radius: 2px;
  transition: all 0.5s;

  &-list {
    &__item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;

      &__text {
        color: #fff;
      }

      &__checkbox {
        cursor: pointer;
      }
    }
  }
}
</style>
