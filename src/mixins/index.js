/*
 * @Author: ywy yinwy@goktech.cn
 * @Date: 2023-02-27 15:07:33
 * @LastEditors: ywy yinwy@goktech.cn
 * @LastEditTime: 2023-03-29 17:23:32
 * @FilePath: \pandav\src\mixins\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  methods: {
    goRealtimeCapture(deviceSn, createTime) {
      const fixDate = new Date("2022-09-01").getTime()
      const createDate = new Date(createTime).getTime()
      if (fixDate >= createDate) {
        // 小于2022-9-1 跳转生态多样性监测
        window.open(location.href + "panda-admin/animal?deviceSn=" + deviceSn)
      } else {
        //大于2022-9-1 跳转实时抓拍
        window.open(
          location.href + "panda-admin/realtime-capture?deviceSn=" + deviceSn
        )
      }
    }
  }
}
