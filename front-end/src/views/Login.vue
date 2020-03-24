<template>
  <div class="login">
    <h1>欢迎登录DUNTENG销售自动化系统</h1>
    <div class="top_hat"></div>
    <div class="login-box">
      <div class="logo-box"></div>

      <div
        class="input-group"
        :class="{active: act_index===1, error: errors.has('cno') }"
        @click="act_index=1"
      >
        <!-- 公司编码 -->
        <label for="cm_code">公司编码：</label>
        <input
          type="number"
          v-model="cm_code"
          id="cm_code"
          name="cno"
          v-validate="{ required: true, max: 6, min: 4 }"
        />
      </div>
      <div
        class="input-group"
        :class="{active: act_index===2, error: errors.has('pno') }"
        @click="act_index=2"
      >
        <!-- 员工编号 -->
        <label for="p_Numer">员工编号：</label>
        <input
          type="number"
          v-model="p_Numer"
          id="cm_code"
          name="pno"
          v-validate="{ required: true, max: 12, min: 4 }"
        />
      </div>
      <div
        class="input-group"
        :class="{active: act_index===3, error: errors.has('pwd')}"
        @click="act_index=3"
      >
        <!-- 登录密码 -->
        <label for="psw">登录密码：</label>
        <input
          type="password"
          v-model="psw"
          id="cm_code"
          name="pwd"
          v-validate="{ required: true, max: 12, min: 4 }"
        />
      </div>

      <!-- 自动登录  记住密码 -->
      <div class="ck-row">
        <div class="ckbox_wrap" @click="setRemember" :class="{active:remember}">
          <i class="iconfont" :class="{ 'icon-check-square': remember, 'icon-border': !remember }"></i>
          <span>记住密码</span>
        </div>
        <div class="ckbox_wrap" @click="setAutologin" :class="{active:autologin}">
          <i
            class="iconfont"
            :class="{
              'icon-check-square': autologin,
              'icon-border': !autologin
            }"
          ></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap" @click="login">
      <p>登录</p>
    </div>
    <div class="tips">
      <ul>公司编码：1000</ul>
      <ul>员工编号：1002</ul>
      <ul>登录密码：123456</ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";
import "../assets/font/iconfont.css";

import services from "../service"; // 我把所有axios的ajax操作都封装在service中

export default {
  name: "login",
  data() {
    return {
      act_index: 1,
      cm_code: "",
      p_Numer: "",
      psw: "",

      remember: false,
      autologin: false
    };
  },
  mounted() {
    let data = JSON.parse(localStorage.getItem("Login_SFA_data"));
    if (data) {
      this.cm_code = data.cm_code;
      this.psw = data.psw;
      this.p_Numer = data.p_Numer;
      this.autologin = data.autologin;
      this.remember = data.remember;
    } else {
      this.p_Numer = this.$route.query.p_Numer;
      this.cm_code = this.$route.query.cm_code;
    }

    // veevalidate强制进行校验，这个$valildator是veevalidate注入到vue中的一个实例
    this.$validator.validate();

    if (this.autologin) {
      this.login(); // 方法就是登录
    }
  },
  methods: {
    ...mapMutations(["initUser"]),
    setAutologin() {
      this.autologin = !this.autologin;

      // 自动登录被勾选的时候记住密码也跟着被勾选
      this.autologin && (this.remember = true);
    },
    setRemember() {
      this.remember = !this.remember;

      // 当记住密码被取消勾选的时候，自动登录也跟着被取消勾选
      this.rememb || (this.autologin = false);
    },
    login() {
      // 判断当前是否校验全部通过
      // this.errors.any(); // boolean 如果有有错误那么返回true,否则 false
      if (this.errors.any()) {
        return;
      }
      // 弹出正在登录的遮罩层,防止二次点击.
      Indicator.open("正在登陆...");

      // 发送ajax请求
      services
        .login({
          CNO: this.cm_code,
          PNO: this.p_Numer,
          // Passwd: this.psw
          Passwd: this.psw == 123456 ? "aicoder.com" : 1
        })
        .then(res => {
          Indicator.close();
          if (res.data.code == 1) {
            // 登录成功
            // 记住用户密码
            localStorage.setItem(
              "Login_SFA_data",
              JSON.stringify({
                remember: this.remember,
                autologin: this.autologin,
                p_Numer: this.remember ? this.p_Numer : "",
                cm_code: this.remember ? this.cm_code : "",
                psw: this.remember ? this.psw : ""
              })
            ); //实际上这样子就存在缓存里是很危险的，最好进行加密

            // 把当前登陆的用户信息放到 sesstionStoreage里面一份。
            sessionStorage.setItem("LoginUser", JSON.stringify(res.data.user));
            sessionStorage.setItem("LoginToken", res.data.token);

            // 把当前登陆的用户信息放到 vuex
            // this.$store.commit("initUser", res.data.user);
            this.initUser(res.data.user); //事先映射到methods中，所以可以像方法一样使用，上面那行老方法就不用了

            this.$router.push("/home");
          } else {
            Toast({
              message: "用户名密码不正确",
              duration: 2000
            });
          }
          console.log(res);
        })
        .catch(() => {
          Indicator.close();
          Toast({
            message: "登录异常！",
            duration: 2000
          });
        });
    }
  }
};
</script>



<style scoped lang="scss">
h1 {
  font-size: px2rem(36);
  font-weight: 900;
  height: px2rem(36);
  line-height: px2rem(36);
  text-align: center;
  padding: px2rem(148-36-40) 0 px2rem(40) 0;
  color: #fff;
}

.login {
  height: 100%;
  background-image: linear-gradient(to bottom right, #294bf3, #ffb794);
}
.top_hat {
  height: px2rem(18);
  width: px2rem(540);
  background-color: #eee;
  border-radius: px2rem(25) px2rem(25) 0 0;
  margin: 0 auto;
}
@mixin login_wrap {
  width: px2rem(600);
  margin: 0 auto;
  background-color: #fff;
  border-radius: px2rem(20);
}
.login-box {
  @include login_wrap;
  height: px2rem(836);
  overflow: hidden;
  // logo部分
  .logo-box {
    background-image: url("../assets/dunteng.png");
    width: px2rem(406);
    height: px2rem(210);
    background-size: 100%;
    margin: px2rem(50) auto;
  }
  @mixin rowStyle() {
    padding: 0 px2rem(36);
    color: $text-color;
    width: px2rem(401);
  }
  // 公司编码、员工编号、密码
  .input-group {
    @include rowStyle();
    height: px2rem(90);
    line-height: px2rem(90);
    font-size: $text-size-mid;
    margin: 0 auto px2rem(30);
    border: 2px solid #757575;
    border-radius: px2rem(50);
    label {
      height: px2rem(92);
      font-size: $text-size-mid;
    }
    input {
      border: none;
      //   background-color: red;
      font-size: $text-size-mid;
      line-height: px2rem(90);
      padding-left: px2rem(30);
      width: px2rem(222);
    }
  }
  .input-group.active {
    border: 2px solid rgb(82, 106, 241);
    color: rgb(50, 80, 240);
  }
  .input-group.error {
    border: 2px solid red;
    color: red;
  }

  //   自动登录  记住密码
  .ck-row {
    @include rowStyle();
    margin: auto;
    font-size: $text-size;
    display: flex;
    justify-content: space-around;
    .ckbox_wrap {
      padding-top: px2rem(8);
      padding-left: px2rem(6);
      i::before {
        display: inline-block;
        height: px2rem(30);
        width: px2rem(30);
        font-size: px2rem(30);
      }
    }
    .ckbox_wrap.active {
      color: $act-color;
    }
  }

  .btn-wrap {
    // @include login_wrap;
    font-weight: 700;
    letter-spacing: px2rem(10);
    height: px2rem(100);
    text-align: center;
    line-height: px2rem(100);
    font-size: $text-size-imp;
    color: $act-color;
    margin-top: px2rem(20);
  }
}

// 登录按钮的样式
.btn-wrap {
  @include login_wrap;
  letter-spacing: px2rem(10);
  height: px2rem(100);
  text-align: center;
  line-height: px2rem(100);
  font-size: $text-size-imp;
  font-weight: 900;
  color: rgb(184, 147, 182);
  margin-top: px2rem(20);
}

// 下方提示信息
.tips {
  width: px2rem(600);
  margin: 0 auto;
  height: px2rem(160);
  margin-top: px2rem(20);
  font-size: px2rem(28);
  color: #fff;
  ul {
    margin: px2rem(10);
  }
}
</style>


<style lang="scss">
html,
body,
#app {
  height: px2rem(1334);
}
</style>