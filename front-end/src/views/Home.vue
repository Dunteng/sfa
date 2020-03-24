<template>
  <div class="home">
    <headtop title="首页" :showgoback="false">
      <router-link to="/user" slot="r" class="icon iconfont icon-user"></router-link>
    </headtop>
    <div class="main-bd">
      <div class="date-wrap">{{ getYearMonth }}</div>
      <div class="mp-wrap">
        <circleprogress title="当前月进度" :val="getDayOfMonth" :hasPercent="true"></circleprogress>
        <circleprogress title="月销售完成度" :val="mounthSealsPercent" :hasPercent="true"></circleprogress>
        <circleprogress title="有效商店数" :val="shops" :hasPercent="false"></circleprogress>
      </div>
    </div>
    <div class="main-nav">
      <div class="nav-cell" v-for="i in 9" :key="i">
        <template v-if="i <= menuList.length">
          <menu-cell
            :url="menuList[i - 1].url"
            :img-url="menuList[i - 1].imgUrl"
            :menu-name="menuList[i - 1].menuName"
          ></menu-cell>
        </template>
      </div>
    </div>
    <!-- <div>
      <img src="../assets/img/ddzt.png" alt />  这种不是在data中存的路径就可以直接用  
      如果是data中储存imgurl则有注意事项👉http://www.yuxang.com/vue-%e4%b8%ad%e5%9b%be%e7%89%87%e6%b7%bb%e5%8a%a0url-%e7%9a%84%e6%b3%a8%e6%84%8f%e4%ba%8b%e9%a1%b9/
    </div>-->
  </div>
</template>

<script>
import HeadTop from "../components/HeadTop";
import CircleProgress from "../components/CircleProgress";
import menuCell from "../components/MenuCell";

import service from "../service/index";

import gstg from "../assets/img/gstg.png";
// 九宫格菜单信息
const menuList = [
  {
    menuName: "公司通告",
    // imgUrl: "../assets/img/gstg.png",  👈这样直接写是不可以的
    imgUrl: gstg,
    // imgUrl: require("@/assets/img/gstg.png"),
    url: "/notice"
  },
  {
    menuName: "进店拜访",
    imgUrl: require("@/assets/img/jdbf.png"),
    url: "/visitshop"
  },
  {
    menuName: "新增门店",
    imgUrl: require("@/assets/img/xzmd.png"),
    url: "/addshop"
  },
  {
    menuName: "电话订单",
    imgUrl: require("@/assets/img/dhdd.png"),
    url: "#"
  },
  {
    menuName: "订单状态",
    imgUrl: require("@/assets/img/ddzt.png"),
    url: "#"
  },
  {
    menuName: "培训资料",
    imgUrl: require("@/assets/img/pxzl.png"),
    url: "#"
  },
  {
    menuName: "消息中心",
    imgUrl: require("@/assets/img/xxzx.png"),
    url: "#"
  },

  {
    menuName: "数据同步",
    imgUrl: require("@/assets/img/sjtb.png"),
    url: "#"
  }
];

export default {
  name: "Home",
  data() {
    return {
      mounthSealsPercent: 0,
      shops: 0,
      menuList: menuList
    };
  },
  components: {
    headtop: HeadTop,
    circleprogress: CircleProgress,
    menuCell: menuCell
  },
  created() {
    service.getUserProgress().then(res => {
      this.mounthSealsPercent = parseInt(res.data.monthPercent * 100);
      this.shops = res.data.totalShops;
    });
  },
  mounted() {},
  computed: {
    getYearMonth() {
      let t = new Date();
      return `${t.getFullYear()}年${t.getMonth() + 1} 月`;
    },
    getDayOfMonth() {
      let t = new Date();
      return parseInt((t.getDate() / 30) * 100);
    }
  }
};
</script>

<style lang="scss" scope>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  .main-nav {
    flex: 1; //铺满剩余空间
    padding: 0 px2rem(30);
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    align-items: stretch;
    border-top: 1px solid #ccc;
    .nav-cell {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      flex: 1 1 30%;
    }
    .nav-cell:nth-child(3n) {
      border-right: none;
    }
  }
}
.main-bd {
  background-color: #fff;
  .date-wrap {
    padding: px2rem(40) 0 px2rem(22);
    color: #000;
    font-size: $text-size-mid;
    text-align: center;
  }
  .mp-wrap {
    display: flex;
    justify-content: space-around;
  }
}
</style>
