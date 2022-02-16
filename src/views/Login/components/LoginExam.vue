<template>
  <div class="login-exam-container">
    <el-form>
      <el-form-item>
        <h1>登录考试</h1>
      </el-form-item>
      <el-form-item>
        <p>身份证号</p>
        <input
          type="text"
          placeholder="请输入您注册时的身份证号"
          v-model="id"
          @keyup.enter="handleEnter"
        >
      </el-form-item>
      <p v-show="isId">{{idMsg}}</p>
      <el-form-item>
        <p>密码</p>
        <input
          type="password"
          placeholder="请输入您的密码"
          v-model="pwd"
          @keyup.enter="handleEnter"
        >
      </el-form-item>
      <p v-show="isPwd">{{pwdMsg}}</p>
      <el-form-item>
        <p>验证码</p>
        <input
          type="text"
          placeholder="请输入图形验证码"
          v-model="test"
          @keyup.enter="handleEnter"
        >
        <div
          class="check-code"
          @click="handleCode"
        >{{checkCode}}</div>
      </el-form-item>
      <p v-show="isTest">{{testMsg}}</p>
      <el-form-item>
        <div
          class="button"
          @click="handleEnter"
        >
          <span>立即登录</span>
          <i
            v-if="loading"
            class="el-icon-refresh-right my-icon"
          ></i>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import getTestCode from "@/api/testCode.js";
import getRestTime from "@/api/time.js";
import * as userApi from "@/api/user.js";
import { mapState } from "vuex";
export default {
  computed: mapState("login", ["user", "loading"]),
  data() {
    return {
      id: "",
      pwd: "",
      test: "",
      checkCode: "···",
      idMsg: "身份证号不能为空",
      isId: false,
      pwdMsg: "密码不能为空",
      isPwd: false,
      testMsg: "验证码不能为空",
      isTest: false,
    };
  },
  methods: {
    async handleEnter() {
      this.isId = this.isPwd = this.isTest = false;
      if (
        this.id == "" ||
        this.pwd == "" ||
        this.test == "" ||
        this.test != this.checkCode
      ) {
        if (this.id == "") {
          this.idMsg = "身份证号不能为空";
          this.isId = true;
        }
        if (this.pwd == "") {
          this.pwdMsg = "密码不能为空";
          this.isPwd = true;
        }
        if (this.test == "") {
          this.testMsg = "验证码不能为空";
          this.isTest = true;
          await this.handleCode();
        } else if (this.test != this.checkCode) {
          this.testMsg = "验证码错误";
          this.isTest = true;
          await this.handleCode();
        }
      } else {
        // 都填上且验证码正确
        this.$store.commit("login/setLoading", true);
        const res = await userApi.login(this.id, this.pwd);
        if (res) {
          // 登录成功
          this.$store.commit("login/setUser", res);
          const timeObj = await getRestTime();
          if (timeObj.data.hour < 0) {
            // 结束了
            console.log("over");
            this.$emit("show", "当前没有您可参加的考试");
            this.id = this.pwd = this.test = "";
            await this.handleCode();
            this.$store.commit("login/setLoading", false);
          } else {
            // 跳转页面
            this.$store.commit("login/setLoading", false);
            this.$router.push("/enter");
          }
        } else {
          // 账号密码错误
          this.$store.commit("login/setLoading", false);
          this.isPwd = true;
          this.pwdMsg = "身份证号或密码错误";
          await this.handleCode();
        }
      }
    },
    async handleCode() {
      this.codeLoading = true;
      this.checkCode = "···";
      this.checkCode = (await getTestCode()).data;
      this.codeLoading = false;
    },
  },

  async created() {
    this.checkCode = (await getTestCode()).data;
    console.log(await getRestTime());
  },
};
</script>

<style scoped lang="less">
.login-exam-container {
  position: relative;
  width: 380px;
  height: 496px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgba(96, 98, 107, 0.12);
}

.el-form {
  > p {
    position: absolute;
    left: 30px;
    transform: translate(0, -25px);
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #f00;
  }

  &-item:nth-of-type(1) {
    text-align: center;
    margin-top: 56px;
    margin-bottom: 30px;
  }

  &-item:not(:nth-of-type(1)) {
    margin: 0 30px 26px 30px;
    height: 66px;
    position: relative;

    p {
      height: 20px;
      line-height: 20px;
      margin-top: 6px;
      color: #48494d;
    }
  }

  .button {
    width: 320px;
    height: 42px;
    background: rgba(72, 73, 77, 1);
    color: #fff;
    line-height: 42px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;

    span {
      display: inline-block;
      width: 64px;
      height: 22px;
      line-height: 22px;
    }
  }

  input {
    width: 320px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px 0 9px 0;
    border: 0px solid rgba(220, 222, 230, 1);
    border-bottom-width: 1px;
    line-height: 20px;
    color: #48494d;
    caret-color: rgba(28, 146, 255, 1); // 光标颜色

    &:focus {
      outline: none;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.my-icon {
  position: relative;
  top: 4px;
  display: inline-block;
  width: 24px;
  height: 24px;
  font-size: 24px;
  margin-left: 14px;
  animation: spin 1s cubic-bezier(0, 0, 1, 1) infinite;
}

.check-code {
  cursor: pointer;
  position: absolute;
  right: 0px;
  bottom: 7px;
  width: 84px;
  height: 28px;
  background: rgba(216, 216, 216, 1);
  font-size: 16px;
  color: rgba(74, 74, 74, 1);
  text-align: center;
  line-height: 28px;
}

h1 {
  font-size: 26px;
  color: #48494d;
  display: inline-block;
  width: 104px;
  height: 37px;
  line-height: 37px;
}
</style>