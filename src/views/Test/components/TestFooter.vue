<template>
  <div class="test-footer-container clearfix">
    <div
      class="submit"
      @click="handleCheckClick"
    >
      提交试卷
      <span v-if="isOver">（考试结束时间已到）</span>
      <span v-else>（考试剩余时间：{{time.minu}}分{{time.seco}}秒）</span>
    </div>
    <div
      class="notice"
      @click="handleNoticeClick"
    ><i class="el-icon-warning-outline"></i>注意事项</div>
    <div class="save">
      <el-button size="small">保存答题记录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    time: {
      type: Object,
      required: true,
    },
    isOver: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleNoticeClick() {
      this.$emit("showNotice");
    },

    handleCheckClick() {
      this.$emit("showCheck");
    },
  },
};
</script>

<style scoped lang="less">
.test-footer-container {
  width: 1220px;
  height: 50px;

  > div {
    float: left;

    &:not(:last-of-type) {
      cursor: pointer;
    }
  }

  .submit {
    width: 860px;
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

  .notice {
    width: 130px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #1c92ff;
    box-shadow: inset 1px 0 0 0 #ffffff;

    font-size: 14px;
    color: #ffffff;

    i {
      font-size: 16px;
      vertical-align: -1px;
      margin-right: 2px;
    }
  }

  .save {
    width: 210px;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    box-shadow: 0 -2px 8px 0 rgba(96, 98, 107, 0.16);
    margin-left: 20px;
    text-align: center;
  }
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>