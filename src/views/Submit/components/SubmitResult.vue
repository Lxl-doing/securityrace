<template>
  <div class="submit-result-container">
    <el-result>
      <template slot="icon">
        <el-image :src="pic"></el-image>
      </template>
      <template
        slot="extra"
        class="content"
      >
        <p class="tit1">{{tit1}}</p>
        <p class="tit2">{{tit2}}</p>
        <p class="desc">{{desc}}</p>
        <el-button
          v-if="hasBtn"
          @click="handleExit"
        >退出考试</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
import fail from "@/assets/fail.png";
import success from "@/assets/success.png";
export default {
  computed: {
    pic() {
      return this.isSuccess ? success : fail;
    },
  },

  props: {
    isSuccess: {
      type: Boolean,
      default: true,
    },
    hasBtn: {
      type: Boolean,
      default: true,
    },
    tit1: {
      type: String,
      default: "",
    },
    tit2: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
  },

  methods: {
    handleExit() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="less">
.submit-result-container {
  .el-result {
    // width: 320px;
    height: 316px;
    padding: 0;
    justify-content: normal;
    // background: lime;
    position: relative;

    .el-image {
      width: 124px;
      height: 124px;
      margin-bottom: 6px;
    }

    .tit1 {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
    }

    .tit2 {
    }

    .desc {
      font-size: 12px;
      color: #909199;
      margin-top: 23px;
    }

    .el-button {
      position: absolute;
      bottom: 0;
      left: 50;
      transform: translate(-50%, 0);
      width: 320px;
      height: 42px;
      font-size: 16px;
    }
  }
}
</style>