<template>
  <div class="login">
    <div class="box-wrp" tabindex="0" ref="box-wrp">
      <section class="form">
        <p class="item account">
          账号：<input type="text" v-model="account" autocomplete="off" />
        </p>
        <p class="item password">
          密码：<input type="password" v-model="password" autocomplete="off" />
        </p>
      </section>
      <button class="confirm" @click="login">登陆</button>
    </div>
  </div>
</template>
<script>
import { setUserInfo } from "@/utils/user.js";
export default {
  name: "login",
  data() {
    return {
      account: "",
      password: "",
      postFlag: true
    };
  },
  methods: {
    login() {
      if (!this.noEmptyLogin()) return;
      if (this.account === "admin" && this.password === "admin") {
        this.$message({
          message: "登陆成功",
          type: "success"
        });
        setUserInfo(JSON.stringify({ name: this.account }));
        this.$router.push("/");
      } else {
        this.$message({
          message: "用户名或密码输入错误",
          type: "error"
        });
      }
    },
    noEmptyLogin() {
      let pass = true;
      const msg = { account: "请输入用户名", password: "请输入密码" };
      Object.keys(msg).find(item => {
        if (!this[item].trim()) {
          this.$message({
            message: msg[item],
            type: "warning"
          });
          pass = false;
          return true;
        }
        return false;
      });
      return pass;
    }
  },
  mounted() {
    this.$refs["box-wrp"].addEventListener("keyup", event => {
      event.preventDefault();
      if (event.keyCode === 13) {
        this.login();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  min-width: 100%;
  background: url(../../assets/img/login/login_bg.png) no-repeat center;
  background-size: cover;
  & .box-wrp {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    outline: 0;
    margin: -3rem auto 0;
    padding-top: 1.36rem;
    width: 6.9rem;
    height: 5.92rem;
    background: url(../../assets/img/login/login_box.png) no-repeat top left;
    background-size: 100% 100%;
    transform: translateX(-3px);
    & .item {
      width: 5rem;
      height: 1rem;
      margin: 0 auto;
      margin-bottom: 0.5rem;
      padding-left: 0.8rem;
      text-align: left;
      line-height: 1rem;
      font-size: 0.32rem;
      font-family: "Songti SC";
      font-weight: 900;
      color: #c6ffff;
      & input {
        background: transparent;
        border: 0;
        outline: 0;
        height: 0.7rem;
        width: 3rem;
        font-size: 0.32rem;
        font-family: "Songti SC";
        font-weight: 900;
        color: #c6ffff;
      }
      &.account {
        background: url(../../assets/img/login/account.png) no-repeat top left;
        background-size: 100% 100%;
      }
      &.password {
        background: url(../../assets/img/login/password.png) no-repeat top left;
        background-size: 100% 100%;
      }
    }
    .confirm {
      width: 2.03rem;
      height: 0.68rem;
      margin-top: 0.1rem;
      background: #00273a;
      border: 1px solid #b8fff6;
      border-radius: 34px;
      font-size: 0.32rem;
      font-family: "Songti SC";
      font-weight: 900;
      color: #c6ffff;
    }
  }
}
</style>
