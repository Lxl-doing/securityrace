<template>
  <main-layout
    class="test-container"
    v-loading="loading"
    :element-loading-text="loadingMsg"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <template v-slot:head>
      <div class="container">
        <div class="title">网络安全员法制与安全知识竞赛(初赛)</div>
        <div class="message">
          <div class="name">{{user.name}}</div>
          <div class="time">
            <span>共{{titles.length}}道题，已答{{answeredCounts}}道题，</span>
            <span class="red">未答{{titles.length-answeredCounts}}道题</span>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:default>
      <AnswerTest
        @showNotice="handleNotice"
        @showCheck="handleCheck"
        @over="handleOver"
      />
    </template>

    <template v-slot:footer>
      <el-dialog
        title="注意事项"
        :visible.sync="dialogVisible"
        width="420px"
        class="notice-box"
        center
      >
        <div class="message">
          <p>1. 考试开始后建议不要清除cookie，否则页面数据将被清空</p>
          <p>2. 提交答案只有1次机会，请谨慎操作</p>
          <p>3. 考试结束时将自动提交试卷，考试期间请勿关闭或更换浏览器</p>
          <p>4. 考试结束时没有交卷，系统会以最后一次保存的答题记录计算最终成绩</p>
        </div>
        <span
          slot="footer"
          class="dialog-footer footer"
        >
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
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
            @click="dialogVisible2 = false"
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
import { mapState } from "vuex";
import MainLayout from "@/components/MainLayout";
import PoliceMessage from "@/components/PoliceMessage";
import AnswerTest from "./components/AnswerTest.vue";
import getTestCode from "@/api/testCode";
import delay from "@/utils/delay";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      checkCode: "···",
      input: "",
      loading: false,
      loadingMsg: "试卷已提交，等待服务器处理中…",
    };
  },

  computed: {
    ...mapState("test", ["titles", "answer"]),
    ...mapState("login", ["user"]),
    answeredCounts() {
      const arr = this.answer;
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "object" && arr[i].length > 0) {
          count++;
        } else if (typeof arr[i] != "object" && arr[i] > 0) {
          count++;
        }
      }
      return count;
    },
  },

  methods: {
    // 时间到了
    async handleOver(callback) {
      this.loadingMsg = "考试已结束，自动提交中...";
      this.loading = true;
      await delay(1000);
      this.loadingMsg = "试卷已提交，等待服务器处理中…";
      await delay(1000);
      if (Math.random() < 0.2) {
        callback(false);
      } else {
        callback(true);
      }
    },

    handleNotice() {
      this.dialogVisible = true;
    },

    async handleCheck() {
      this.dialogVisible2 = true;
      const resp = await getTestCode();
      this.checkCode = resp.data;
    },

    async handleEnter() {
      if (this.checkCode == this.input) {
        // 验证码正确
        this.dialogVisible2 = false;
        this.loading = true;
        // 服务器处理
        await delay(1000);
        if (Math.random() < 0.2) {
          // 失败
          this.$store.commit("submit/setTit1", "服务器处理失败");
          this.$store.commit("submit/setTit2", "请重新提交");
          this.$store.commit(
            "submit/setDesc",
            "考试结束时没有交卷，系统会以最后一次保存的答题记录计算最终成绩"
          );
          this.$store.commit("submit/setHasBtn", false);
          this.$store.commit("submit/setIsSuccess", false);
        } else {
          // 成功
          this.$store.commit("submit/setTit1", "交卷成功！");
          this.$store.commit("submit/setTit2", "");
          this.$store.commit("submit/setDesc", "");
          this.$store.commit("submit/setHasBtn", true);
          this.$store.commit("submit/setIsSuccess", true);
        }
        this.$router.push("/submit");
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

  components: {
    MainLayout,
    PoliceMessage,
    AnswerTest,
  },

  created() {
    window.onbeforeunload = function (e) {
      e.returnValue = "确定离开当前页面吗？";
    };
  },
};
</script>

<style scoped lang="less">
.test-container {
  .notice-box {
    display: flex;
    justify-content: center;
    align-items: center;

    .message {
      width: 320px;
      margin-top: -17px;
      margin-bottom: -18px;
      padding: 0 25px;

      p {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #404247;
        line-height: 20px;
      }
    }

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
      color: #48494d;
    }

    .message {
      width: 207px;
      height: 64px;
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;

      .name {
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #48494d;
        margin: 10px 0 5px;
      }

      .time {
        height: 17px;
        line-height: 17px;
        white-space: nowrap;
        margin-bottom: 10px;
        font-size: 12px;

        .red {
          color: #f53a69;
        }
      }
    }
  }
}
</style>