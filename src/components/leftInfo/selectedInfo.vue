<template>
  <!-- :style="{
      left: isCollapse ? '134px' : '264px'
    }" -->
  <div class="selected-info">
    <div>
      <div class="selected-info-list">
        <div
          v-for="(item, index) in selectedInfoList"
          :key="index"
          class="selected-info-list__item"
        >
          <div v-if="item.img" class="selected-info-list__item__icon">
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
    <selected-info
      v-if="showSubSelectList"
      :select-list="subselectedInfo"
      class="sub-selected"
    />
  </div>
</template>

<script>
export default {
  name: "SelectedInfo",
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
    },
    selectList: {
      type: Array,
      default: () => []
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
      ],
      subselectedInfo: [
        {
          title: "红外相机",
          checked: true,
          id: "10"
        },
        {
          title: "摄像机",
          checked: false,
          id: "11"
        },
        {
          title: "生态设备",
          checked: true,
          id: "12"
        }
      ]
    }
  },
  computed: {
    selectedInfoList() {
      if (this.selectList && this.selectList.length) {
        return this.selectList
      }
      return this.currentTab === 1
        ? this.selectedInfoList1
        : this.selectedInfoList2
    },
    showSubSelectList() {
      return (
        this.selectedInfoList.findIndex(
          (item) => item.id == 6 && item.checked
        ) > -1
      )
    }
  }
}
</script>

<style lang="less" scoped>
.selected-info {
  display: flex;
  width: 180px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 30px;
  border-radius: 2px;
  transition: all 0.5s;

  &-list {
    position: relative;
    bottom: -26px;
    padding: 40px 10px 8px;
    background: rgba(0, 0, 0, 60%);

    &__item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;

      &__text {
        width: 86px;
        color: #fff;
      }

      &__icon {
        width: 20px;
      }

      &__checkbox {
        cursor: pointer;
      }
    }
  }
}

.sub-selected {
  position: absolute;
  margin-left: 200px;
}
</style>
