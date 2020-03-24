<template>
  <div class="user">
    <div class="user-bd">
      <headtop title="个人信息" showgoback="true">
        <div class="edit-pwd" slot="r"></div>
      </headtop>
      <div class="img-box">
        <input @change="uploadImg" type="file" accept="image/*" class="input-file" ref="file" />
        <img @click="selectFile" class="img-round" :src="LoginUser.avatar" alt="用户头像" />
      </div>
      <div class="user-desc-wrap">
        <div class="row">
          <div class="fl">员工姓名：</div>
          <div class="fr">{{LoginUser.name}}</div>
        </div>
        <div class="row">
          <div class="fl">手机号：</div>
          <div class="fr">{{LoginUser.phone}}</div>
        </div>
        <div class="row">
          <div class="fl">部门：</div>
          <div class="fr">{{LoginUser.department}}</div>
        </div>
      </div>
      <div class="last-login-wrap">上次登录时间： {{LoginUser.lastLogin}}</div>
    </div>
    <div class="user-bt">
      <div @click="reLogin" class="btn-l">重新登录</div>
      <div @click="logout" class="btn-r">注销</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import service from "../service";
import canvasResize from "canvas-resize";
import Utility from "../common/Utility";
export default {
  name: "user",
  data() {
    return {};
  },
  methods: {
    logout() {
      // 清理sessionStorage， localStorage， vuex
      sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("clearAll");
      this.$router.push("/");
    },
    reLogin() {
      let loginUser = { ...this.LoginUser };
      sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("clearAll");
      this.$router.push(`/?CNO=${loginUser.CNO}&PNO=${loginUser.PNO}`);
    },
    selectFile() {
      this.$refs.file.click();
    },
    uploadImg() {
      let formData = new FormData();
      // 拿到当前上传的图片
      let file = this.$refs.file.files[0];
      // 对当前上传的图片file，进行压缩后，callback返回一个base64的字符串
      canvasResize(file, {
        crop: false, // 裁剪参数
        quality: 0.7, // 压缩率， 0-1
        rotate: 0, // 是否旋转
        callback: baseStr => {
          // 返回的base64字符， 转换成Blob
          let fileBlob = Utility.convertBase64UrlToBlob(baseStr, {
            type: file.type
          });
          formData.append("imgF", fileBlob);
          service
            .uploadImg(formData)
            .then(res => {
              // 完整的图片地址： `${process.env.VUE_APP_BASEURL}${res.data.img}`
              // 把当前图片的地址修改用户
              let newUser = { ...this.LoginUser };
              newUser.avatar = `${process.env.VUE_APP_BASEURL}${res.data.img}`;
              this.$store.commit("updateLoginUserInfo", newUser);
              // 修改服务器上的图片地址
              service.updateUserInfo(newUser);
            })
            .catch(() => {
              console.log("上传失败！");
            });
        }
      });
    }
  },
  computed: {
    ...mapState(["LoginUser"])
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.user {
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  .user-bd {
    flex: 1;
  }
  .img-box {
    margin: px2rem(56) auto;
    height: px2rem(220);
    width: px2rem(220);
  }
  .img-round {
    border-radius: 50%;
    border: px2rem(1) solid #ccc;
    height: px2rem(220);
    width: px2rem(220);
    vertical-align: top;
  }
  .user-desc-wrap {
    border-top: px2rem(1) solid #ccc;
    padding-left: px2rem(28);
    font-size: px2rem(28);
    .row {
      padding-right: px2rem(28);
      line-height: px2rem(110);
      height: px2rem(110);
      border-bottom: px2rem(1) solid #ccc;
    }
    .fl {
      color: #757575;
    }
    .row:last-child {
      border-bottom: none;
    }
  }
  .last-login-wrap {
    padding-left: px2rem(28);
    background-color: #f4f4f4;
    border-top: px2rem(1) solid #ccc;
    border-bottom: px2rem(1) solid #ccc;
    height: px2rem(84);
    line-height: px2rem(84);
    font-size: px2rem(24);
  }
  .user-bt {
    display: flex;
    font-size: $text-size-imp;
    flex: 0 0 px2rem(110);
    line-height: px2rem(110);
    border-top: px2rem(1) solid #ccc;
    .btn-l,
    .btn-r {
      text-align: center;
      flex: 1;
    }
    .btn-l {
      border-right: px2rem(1) solid #ccc;
      color: $act-color;
    }
    .btn-r {
      color: #ff5353;
    }
  }
}
.edit-pwd {
  font-size: px2rem(24);
}
</style>
