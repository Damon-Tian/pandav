/* 巡护列表 */
<template>
  <div class="patrol-list">
    <table>
      <tr class="header">
        <th width="50" align="left">编号</th>
        <th align="left">巡护事件</th>
        <th align="left">巡护类型</th>
        <th width="80" align="left">巡护人</th>
      </tr>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="item.num"
          :class="{ active: currentIndex === index }"
          @click="currentIndex = index"
        >
          <td>{{ item.num }}</td>
          <td>{{ item.event }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.user }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          num: 1,
          event: "xxx事件",
          type: "样线巡护",
          user: "xxx"
        },
        {
          num: 2,
          event: "xxx事件",
          type: "样线巡护",
          user: "xxx"
        },
        {
          num: 3,
          event: "xxx事件",
          type: "样线巡护",
          user: "xxx"
        },
        {
          num: 4,
          event: "xxx事件",
          type: "样线巡护",
          user: "xxx"
        }
      ],
      currentIndex: ""
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.patrol-list {
  margin-top: 10px;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;

    th,
    td {
      padding-left: 5px;
      vertical-align: middle;
    }

    .header {
      height: 32px;
      border: 1px solid #006cff;
      background: rgba(0, 108, 255, 20%);
      color: #7ecef4;
      font-size: 14px;
      font-weight: 500;
    }

    tbody tr {
      height: 40px;
      background: #082044;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
    }

    tbody .active {
      background: #0b90c2;
    }
  }
}
</style>
