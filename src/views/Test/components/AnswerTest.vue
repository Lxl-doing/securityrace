<template>
  <div
    class="answer-test-container"
    v-loading="!hasTime"
  >
    <TestList />
    <TestNumber />
    <TestFooter
      :time="formatTime"
      class="foot"
      v-if="hasTime"
      @showNotice="handleNotice"
      @showCheck="handleCheck"
      :isOver="isOver"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getExamTime } from "@/api/time.js";
import { formatTime2 } from "@/utils/formatTime.js";
import TestList from "./TestList.vue";
import TestNumber from "./TestNumber.vue";
import TestFooter from "./TestFooter.vue";
export default {
  computed: {
    ...mapState("time", ["time"]),
  },
  data() {
    return {
      formatTime: { minu: "00", seco: "00" },
      timer: null,
      hasTime: false,
      restTime: null,
      isOver: false,
    };
  },
  components: {
    TestList,
    TestNumber,
    TestFooter,
  },
  methods: {
    showTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.restTime.minu == 0 && this.restTime.seco == 0) {
          // 结束
          this.isOver = true;
          this.handleOver();
          clearInterval(this.timer);
        } else {
          if (this.restTime.seco == 0) {
            this.restTime.minu--;
            this.restTime.seco = 59;
          } else {
            this.restTime.seco--;
          }
        }
        this.$store.commit("time/setTime", this.restTime);
        this.formatTime = formatTime2(this.restTime);
      }, 1000);
    },

    handleOver() {
      this.$emit("over", (isFail) => {
        if (isFail) {
          this.$store.commit("submit/setTit1", "服务器处理失败");
          this.$store.commit("submit/setTit2", "请重新提交");
          this.$store.commit(
            "submit/setDesc",
            "考试结束时没有交卷，系统会以最后一次保存的答题记录计算最终成绩"
          );
          this.$store.commit("submit/setHasBtn", false);
          this.$store.commit("submit/setIsSuccess", false);
        } else {
          this.$store.commit("submit/setTit1", "交卷成功！");
          this.$store.commit("submit/setTit2", "");
          this.$store.commit("submit/setDesc", "");
          this.$store.commit("submit/setHasBtn", true);
          this.$store.commit("submit/setIsSuccess", true);
        }
        this.$router.push("/submit");
      });
    },

    handleNotice() {
      this.$emit("showNotice");
    },

    handleCheck() {
      this.$emit("showCheck");
    },
  },
  async created() {
    const res = await getExamTime();
    // console.log(res.data);
    this.$store.commit("time/setTime", res.data);
    this.restTime = this.time;
    this.showTime();
    this.hasTime = true;
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="less">
.answer-test-container {
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: space-between;
  background: #f5f6fa;
  position: relative;

  .foot {
    position: absolute;
    bottom: 0;
    z-index: 999;
  }
}
</style>