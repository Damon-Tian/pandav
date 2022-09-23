<template>
  <div class="p-leftbar" :class="isCollapse ? 'collapse-menu' : ''">
    <span
      class="narrow-icon"
      @click="narrowClick"
      :style="{ right: isCollapse ? '104px' : '-27px' }"
      :class="isCollapse ? 'narrow-icon-collapse' : ''"
    >
      <img src="@/assets/img/p-leftbar-narrow.png" alt="" />
      <!-- <img v-else src="@/assets/img/p-leftbar-expand.png" alt="" /> -->
    </span>

    <el-menu
      :default-active="activeNav"
      @select="selectMenu"
      :collapse="isCollapse"
    >
      <el-menu-item
        class="nav-item"
        v-for="item in navs"
        :index="item.name"
        :key="item.name"
      >
        <div class="img-wrap">
          <img :src="activeNav === item.name ? item.iconActive : item.icon" />
        </div>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeNav: "首页",
      currentTab: 1,
      navs: [
        {
          name: "首页",
          id: 1,
          icon: require("@/assets/img/p-leftbar-home.png"),
          iconActive: require("@/assets/img/p-leftbar-home-active.png")
        },
        {
          name: "生态环境",
          id: 2,
          icon: require("@/assets/img/p-leftbar-env.png"),
          iconActive: require("@/assets/img/p-leftbar-env-active.png")
        },
        {
          name: "自然资源",
          id: 3,
          icon: require("@/assets/img/p-leftbar-resource.png"),
          iconActive: require("@/assets/img/p-leftbar-resource-active.png")
        },
        {
          name: "基层站点",
          id: 4,
          icon: require("@/assets/img/p-leftbar-basic-port.png"),
          iconActive: require("@/assets/img/p-leftbar-basic-port-active.png")
        },
        {
          name: "设备管理",
          id: 5,
          icon: require("@/assets/img/p-leftbar-equipment.png"),
          iconActive: require("@/assets/img/p-leftbar-equipment-active.png")
        },
        {
          name: "巡护管理",
          id: 6,
          icon: require("@/assets/img/p-leftbar-round.png"),
          iconActive: require("@/assets/img/p-leftbar-round-active.png")
        },
        {
          name: "电子围栏",
          id: 7,
          icon: require("@/assets/img/p-leftbar-electron.png"),
          iconActive: require("@/assets/img/p-leftbar-electron-active.png")
        },
        {
          name: "社区管理",
          id: 8,
          icon: require("@/assets/img/p-leftbar-house.png")
          // iconActive: require("@/assets/img/p-leftbar-house-active.png")
        },
        {
          name: "基础设施",
          id: 9,
          icon: require("@/assets/img/p-leftbar-basic-equip.png")
          // iconActive: require("@/assets/img/p-leftbar-basic-equip-active.png")
        }
      ]
    };
  },
  methods: {
    selectMenu(i) {
      this.activeNav = i;
      this.navs.map(item=>{
        if(this.activeNav===item.name){
          this.currentTab = item.id
        }
      })
      this.$emit('select-menu',this.currentTab)
    },
    narrowClick() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.p-leftbar {
  width: 230px;
  height: 945px;
  // margin-top: 34px;
  // background: url("../assets/img/p-leftbar.png") 100% 100% no-repeat;
  position: relative;

  .narrow-icon {
    position: absolute;
    top: 45%;
    cursor: pointer;
    transition: all 0.5s ease;

    &.narrow-icon-collapse {
      overflow: hidden;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(8px, -50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent white;
        background-color: rgb(0, 174, 255);
      }
    }
  }
}
.el-menu {
  position: relative;
  top: 30px;
  left: 20px;
  width: 230px;
  height: 945px;
  background: url("../assets/img/p-leftbar.png") 100% 100% no-repeat;
  border-right: none;

  &.el-menu--collapse {
    width: 100px;
    .el-menu-item {
      width: 95px;
      left: 0;
    }
  }

  .el-menu-item {
    color: white;
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 28px;
    font-size: 20px;
    font-weight: medium;
    position: relative;
    left: 7px;
    width: 218px;

    &:first-child {
      margin-top: 83px;
    }

    .img-wrap {
      width: 30px;
      margin-left: 8px;
      margin-right: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
  .el-menu-item:focus,
  .el-menu-item:hover,
  .is-active {
    color: #23d9fb;
    background-color: #23d9fb57;
  }
}
</style>
