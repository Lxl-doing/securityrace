<template>
  <div
    class="wait-loading-container"
    v-if="proLoading"
  >
    <el-progress
      :text-inside="true"
      :stroke-width="18"
      :percentage="percent"
    ></el-progress>
    <p>加载考卷中，请不要关闭页面，加载完成后自动进入考场...</p>
  </div>
  <div
    v-else
    class="failed"
  >
    <p>考卷加载失败，请点击刷新重新加载</p>
    <el-button
      plain
      @click="handleClick"
    >重新加载</el-button>
  </div>
</template>

<script>
import getTest from "@/api/test.js";
export default {
  data() {
    return {
      percent: 0,
      proLoading: true,
      timer: null,
    };
  },

  methods: {
    handleClick() {
      this.$router.push("/wait");
    },
  },

  async created() {
    // 若有本地化，直接跳转
    if (localStorage.getItem("titles")) {
      clearInterval(this.timer);
      this.$router.push("/test");
      return;
    }

    this.timer = setInterval(() => {
      if (this.percent == 100) {
        clearInterval(this.timer);
        this.$router.push("/test");
        return;
      }
      this.percent += 1;
    }, 50);

    const rep = await getTest();
    if (!rep) {
      this.proLoading = false;
    } else {
      const titles = rep.data.titles; // 试题 [{},{}]
      localStorage.setItem("titles", JSON.stringify(titles));
    }
  },
};
</script>

<style scoped lang="less">
.failed {
  width: 192px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  p {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #909199;
  }

  .el-button {
    margin-top: 40px;
  }
}

.wait-loading-container {
  width: 350px;
  text-align: center;

  .el-progress {
    width: 350px;
  }

  p {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #909199;
    margin-top: 40px;
  }
}
</style>