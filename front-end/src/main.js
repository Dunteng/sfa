import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from 'vee-validate';
import helper from "./lib/helper.js"
import HeadTop from './components/HeadTop.vue';

import "./lib/hotcss/hotcss.js";
// 引入mint ui的样式
import 'mint-ui/lib/style.css';

Vue.use(VeeValidate);

Vue.component('headtop', HeadTop);  // 将头部组件注册为全局组件，这样每个页面就不用都重新注册引入一次了

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    // 校验用户是否登录
    // console.log(store.getters.getLoginUser); 获取vuex中store的LoginUser的值，若已登录其值为一个对象，若未登陆其值为null
    if (helper.getTypes(store.getters.getLoginUser) === 'Object') {  //这里为了练习一下判断数据类型使用了一个自己封装的工具js，其实判断其是否为null也可以
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
