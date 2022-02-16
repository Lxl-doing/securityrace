<template>
  <div class="wait-time-container">
    <div class="time">
      <div
        v-if="isWait"
        class="content"
      >
        <span>距离考试开始时间</span>
        <span class="now-time">{{formatTime.hour}}</span>
        <span class="dot">:</span>
        <span class="now-time">{{formatTime.minu}}</span>
        <span class="dot">:</span>
        <span class="now-time">{{formatTime.seco}}</span>
      </div>
      <div
        v-else
        class="started"
      >考试已开始</div>
    </div>
    <el-divider></el-divider>
    <div class="notice">
      <div class="content">
        <p><i class="el-icon-warning-outline"></i>注意事项：</p>
        <p>1. 考试开始后建议不要清除cookie，否则页面数据将被清空</p>
        <p>2. 提交答案只有1次机会，请谨慎操作</p>
        <p>3. 考试结束时将自动提交试卷，考试期间请勿关闭或更换浏览器</p>
        <p>4. 考试结束时没有交卷，系统会以最后一次保存的答题记录计算最终成绩</p>
      </div>
    </div>
  </div>
</template>

<script>
import formatTime from "@/utils/formatTime";
import delay from "@/utils/delay";
export default {
  data() {
    return {
      formatTime: {},
      timer: null,
      isWait: true,
    };
  },
  props: {
    time: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async showTime() {
      clearInterval(this.timer);
      this.timer = setInterval(async () => {
        if (this.time.hour == 0 && this.time.minu == 0 && this.time.seco == 0) {
          clearInterval(this.timer);
          this.isWait = false;
          await delay(2000);
          this.$router.push("/wait/loading");
          this.$emit("showLoading");
        } else {
          if (this.time.seco == 0) {
            if ((this, this.time.minu == 0)) {
              this.time.hour--;
              this.time.minu = 59;
            } else {
              this.time.minu--;
              this.time.seco = 59;
            }
          } else {
            this.time.seco--;
          }
        }
        this.formatTime = formatTime(this.time);
      }, 1000);
    },
  },

  created() {
    this.formatTime = formatTime(this.time);
  },

  mounted() {
    this.showTime();
  },

  destroyed() {
    this.timer = null;
  },
};
</script>

<style scoped lang="less">
.wait-time-container {
  width: 486px;
  height: 293px;
  box-sizing: border-box;
  // border: 1px solid red;

  .time {
    width: 486px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .started {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #48494d;
    }

    .content {
      width: 326px;
      height: 50px;
      line-height: 50px;
      font-family: PingFangSC-Semibold;
      font-size: 16px;

      span {
        color: #48494d;
        letter-spacing: 0;
      }

      span:first-of-type {
        margin-right: 14px;
      }

      span.now-time {
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-image: linear-gradient(180deg, #fafafa 0%, #f1f0f2 100%);
        box-sizing: border-box;
        border: 1px solid #dcdee6;
        box-shadow: 0 0 6px 0 rgba(96, 98, 107, 0.12);
        border-radius: 4px;

        font-family: PingFangSC-Regular;
        font-size: 20px;
      }

      span.dot {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        text-align: center;
        margin: 0 6px;
      }
    }
  }

  .notice {
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 320px;

      p:first-of-type {
        height: 17px;
        line-height: 17px;
        margin-bottom: 9px;

        font-family: PingFangSC-Semibold;
        font-size: 12px;
        color: #404247;

        i {
          font-size: 14px;
          vertical-align: -1px;
          font-weight: bold;
        }
      }

      p:not(:first-of-type) {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #404247;
        line-height: 20px;
      }
    }
  }
}

.el-divider {
  height: 2px;
  margin-top: 36px;
  margin-bottom: 16px;
}
</style>