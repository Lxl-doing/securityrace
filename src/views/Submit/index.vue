<template>
  <main-layout
    class="submit-container"
    v-loading="loading"
    element-loading-text="试卷已提交，等待服务器处理中…"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <template v-slot:head>
      <div class="container">
        <div class="title">网络安全员法制与安全知识竞赛(初赛)</div>
        <div class="message">
          {{username}}
        </div>
      </div>
    </template>

    <template>
      <SubmitResult
        :tit1="tit1"
        :tit2="tit2"
        :desc="desc"
        :hasBtn="hasBtn"
        :isSuccess="isSuccess"
      />
    </template>

    <template v-slot:footer>
      <PoliceMessage />

      <div
        v-if="!isSuccess"
        class="time"
        @click="handleClick"
      >
        提交试卷
        <span v-if="isOver">（考试结束时间已到）</span>
        <span v-else>（考试剩余时间：{{formatTime.minu}}分{{formatTime.seco}}秒）</span>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="420px"
        class="notice-box"
        center
      >
        <div class="checkBox">
          <el-input
            v-model="input"
            placeholder="请输入图片验证码"
            @change="handleEnter"
          ></el-input>
          <div
            class="check-code"
            @click="changeCode"
          >{{checkCode}}</div>
          <p>提交答案只有1次机会，请输入验证码提交试卷</p>
        </div>
        <span
          slot="footer"
          class="dialog-footer footer"
        >
          <el-button
            class="checkbtn1"
            type="primary"
            @click="dialogVisible = false"
          >取 消</el-button>
          <el-button
            class="checkbtn2"
            type="primary"
            @click="handleEnter"
          >确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </main-layout>
</template>

<script>
import MainLayout from "@/components/MainLayout";
import PoliceMessage from "@/components/PoliceMessage";
import SubmitResult from "./components/SubmitResult.vue";
import { mapState } from "vuex";
import { formatTime2 } from "@/utils/formatTime.js";
import getTestCode from "@/api/testCode";
import delay from "@/utils/delay";

export default {
  components: {
    MainLayout,
    PoliceMessage,
    SubmitResult,
  },

  computed: {
    ...mapState("submit", ["tit1", "tit2", "desc", "hasBtn", "isSuccess"]),
    ...mapState("time", ["time"]),
    ...mapState("login", ["user"]),
  },

  data() {
    return {
      restTime: null,
      formatTime: { minu: "00", seco: "00" },
      dialogVisible: false,
      input: "",
      checkCode: "···",
      loading: false,
      timer: null,
      isOver: false,
      username: "",
    };
  },

  methods: {
    showTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.restTime.minu == 0 && this.restTime.seco == 0) {
          // 结束
          this.isOver = true;
          clearInterval(this.timer);
        } else {
          if (this.restTime.seco == 0) {
            this.restTime.minu--;
            this.restTime.seco = 59;
          } else {
            this.restTime.seco--;
          }
          this.$store.commit("time/setTime", this.restTime);
        }
        this.formatTime = formatTime2(this.restTime);
      }, 1000);
    },

    async handleClick() {
      this.input = "";
      this.dialogVisible = true;
      const resp = await getTestCode();
      this.checkCode = resp.data;
    },

    async handleEnter() {
      if (this.checkCode == this.input) {
        // 验证码正确
        this.dialogVisible = false;
        this.loading = true;
        // 服务器处理
        await delay(1000);
        this.loading = false;

        if (Math.random() < 0.1) {
          // 失败
          this.$store.commit("submit/setTit1", "服务器处理失败");
          this.$store.commit("submit/setTit2", "请重新提交");
          this.$store.commit(
            "submit/setDesc",
            "考试结束时没有交卷，系统会以最后一次保存的答题记录计算最终成绩"
          );
          this.$store.commit("submit/setHasBtn", false);
          this.$store.commit("submit/setIsSuccess", false);

          // this.restTime = this.time;
          // this.showTime();
        } else {
          // 成功
          this.$store.commit("submit/setTit1", "交卷成功！");
          this.$store.commit("submit/setTit2", "");
          this.$store.commit("submit/setDesc", "");
          this.$store.commit("submit/setHasBtn", true);
          this.$store.commit("submit/setIsSuccess", true);
          clearInterval(this.timer);
        }
        this.loading = false;
      } else {
        this.$message.error("图形验证码有误");
      }
    },

    async changeCode() {
      this.checkCode = "···";
      const resp = await getTestCode();
      this.checkCode = resp.data;
    },
  },

  created() {
    console.log(this.time);
    this.restTime = this.time;
    this.showTime();
    this.username = this.user.name;
  },

  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="less">
.submit-container {
  position: relative;

  .notice-box {
    display: flex;
    justify-content: center;
    align-items: center;

    .checkBox {
      margin: 0 37px;
      margin-top: -17px;
      text-align: center;

      .check-code {
        cursor: pointer;
        position: absolute;
        left: 268px;
        top: 67px;
        width: 84px;
        height: 28px;
        background: rgba(216, 216, 216, 1);
        font-size: 16px;
        color: rgba(74, 74, 74, 1);
        text-align: center;
        line-height: 28px;
      }

      p {
        height: 17px;
        line-height: 17px;
        margin-top: 16px;
        font-size: 12px;
        color: #909199;
        margin-bottom: 3px;
      }
    }

    .el-button {
      width: 110px;
      height: 40px;
      background: #48494d;
      border-radius: 4px;
      border: 0 solid #fff;
    }

    .checkbtn1,
    .checkbtn2 {
      width: 90px;
    }

    .checkbtn1 {
      margin-right: 10px;
      background: #fff;
      color: #48494d;
      box-sizing: border-box;
      border: 1px solid #dcdee6;
    }
  }

  .container {
    width: 1220px;
    height: 64px;
    line-height: 64px;
    margin: 0 auto;
    // background: lime;
    display: flex;
    justify-content: space-between;

    .title {
      font-family: PingFangSC-Semibold;
      font-size: 18px;
    }

    .message {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
    }
  }

  .time {
    cursor: pointer;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    width: 1220px;
    height: 50px;
    line-height: 50px;
    background: #63646b;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #ffffff;
    text-align: center;

    span {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      font-family: PingFangSC-Regular;
      font-weight: normal;
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>