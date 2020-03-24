import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue"
import User from '../views/User.vue';
import Notice from '../views/Notice.vue';
import NoticeDetial from '../views/NoticeDetial.vue';
import VisitShop from '../views/VisitShop.vue';
import ShopInfo from '../views/ShopInfo.vue';
import SignIn from '../views/SignIn.vue';
import Order from '../views/Order.vue';
import GoodsSelect from '../views/GoodsSelect.vue';
import Cart from '../views/Cart.vue';
import SubCart from '../views/SubCart.vue';
import AddShop from '../views/AddShop.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  {
    path: "/notice",
    name: "notice",
    component: Notice
  },
  {
    path: "/notice/:id",
    name: "noticeDetial",
    component: NoticeDetial
  },
  {
    path: "/visitShop",
    name: "visitShop",
    component: VisitShop
  },
  {
    path: "/visitShop/:id",
    // name: "ShopInfo",   //带参数的不要再加name，否则报警告
    component: ShopInfo
  },
  {
    path: '/shopsignin/:id',
    name: 'shopsignin',
    component: SignIn
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import("../views/Order.vue")
  },

  {
    path: '/goodselect/:id',
    name: 'selectgoods',
    component: GoodsSelect
  },
  {
    path: '/cart/:id',
    name: 'cart',
    component: Cart
  },
  {
    path: '/subcart',
    name: 'subcart',
    component: SubCart
  },
  {
    path: '/addshop',
    name: "addshop",
    component: AddShop
  },

  {
    path: "*",
    component: () => import("../views/Home.vue")
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
