/* 巡护发现 */
<template>
  <info-block title="巡护发现">
    <div class="info-content patrol-find">
      <div class="item">
        <div>
          <span class="title">巡护人：</span>
          {{ findDetail.person }}
        </div>
        <div>
          <span class="title">地点：</span>
          {{ findDetail.place }}
        </div>
      </div>
      <div class="item">
        <div>
          <span class="title">时间：</span>
          {{ findDetail.time }}
        </div>
        <div>
          <span class="title">成果：</span>
          {{ findDetail.result }}
        </div>
      </div>
      <div class="item">
        <div>
          <span class="title">是否采集样本：</span>
          {{ findDetail.isCj ? "是" : "否" }}
        </div>
      </div>
      <div class="item">
        <h5>
          <div class="title">照片：</div>
          <el-image
            v-for="item in findDetail.imageList"
            :key="item"
            class="img"
            :src="item"
            fit="contain"
          />
        </h5>
      </div>
      <div class="item">
        <div>
          <span class="title">原因说明：</span>
          {{ findDetail.reson }}
        </div>
      </div>
      <div class="item">
        <a class="more">查看详情<i class="el-icon-arrow-right"></i></a>
      </div>
    </div>
  </info-block>
</template>

<script>
import infoBlock from "../infoBlock"
export default {
  components: {
    infoBlock
  },
  data() {
    return {
      findDetail: {
        person: "某某某",
        place: "地点：彭州自然保护区",
        time: "2022年8月17日 14:23",
        result: "发现啃食、粪便、毛发",
        isCj: true,
        imageList: [
          "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=0&spn=0&di=7136437450519347201&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=896312629%2C3907762107&os=583120580%2C376647450&simid=3391960703%2C461939938&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg%26refer%3Dhttp%3A%2F%2Fimg2.niutuku.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1666514026%26t%3D97cdd4fc246b863ea066fbfa559e7aa0&fromurl=ippr_z2C%24qAzdH3FAzdH3Fgt7p7h7_z%26e3Bv54AzdH3FktzitAzdH3Fbm0nAzdH3Fnllaal_z%26e3Bfip4s&gsm=100000000000001&islist=&querylist=&dyTabStr=MCwzLDEsNiw0LDUsMiw3LDgsOQ%3D%3D",
          "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=2&spn=0&di=7117150749552803841&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=1945464906%2C1635022113&os=784249295%2C168466126&simid=4065346618%2C644183129&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fwww.2008php.com%2F09_Website_appreciate%2F10-07-11%2F1278861720_g.jpg%26refer%3Dhttp%3A%2F%2Fwww.2008php.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1666514026%26t%3D844328ad0e10d50361e5a1791408e585&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bdaabrir_z%26e3Bv54AzdH3Fp7h7AzdH3Fcclbm_z%26e3Bip4s&gsm=100000000000001&islist=&querylist=&dyTabStr=MCwzLDEsNiw0LDUsMiw3LDgsOQ%3D%3D"
        ],
        reson: "科研需要收集野生动物毛发"
      }
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.patrol-find {
  padding: 10px;

  .item {
    display: flex;
    color: #fff;
    font-size: 14px;

    & > div {
      overflow: hidden;
      flex: 1;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;

      &:first-child {
        margin-right: 20px;
      }
    }

    & + .item {
      margin-top: 15px;
    }

    .title {
      color: #7ecef4;
      font-size: 14px;
      font-weight: 500;
    }

    .img {
      width: 128px;
      height: 72px;
      margin-top: 10px;

      & + .img {
        margin-left: 10px;
      }
    }

    .more {
      color: #34fdff;
      font-size: 16px;
      font-weight: 500;
      line-height: 32px;

      &:hover {
        cursor: pointer;
        text-decoration: none;
      }
    }
  }
}
</style>
