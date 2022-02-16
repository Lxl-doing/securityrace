<template>
  <div class="login-container">
    <el-alert
      v-if="isShow"
      :title="content"
      type="error"
      class="alert"
      center
    >
    </el-alert>
    <ConnectWaiter />
    <LoginExam @show="handleShow" />
    <PoliceMessage class="footer" />
  </div>

</template>

<script>
import ConnectWaiter from "./components/ConnectWaiter.vue";
import LoginExam from "./components/LoginExam.vue";
import PoliceMessage from "@/components/PoliceMessage";
export default {
  components: {
    ConnectWaiter,
    LoginExam,
    PoliceMessage,
  },
  data() {
    return {
      isShow: false,
      content: "",
    };
  },
  methods: {
    handleShow(data) {
      this.content = data;
      this.isShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  position: absolute;
  width: inherit;
  height: inherit;
}
.connect-waiter-container {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-180px, -50%);
  transition: all 0.4s;

  &:hover {
    transform: translate(0, -50%);
  }
}
.login-exam-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.alert {
  width: 360px;
  height: 36px;
  margin-top: 28px;
  position: absolute;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);
}

.footer {
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translate(-50%, 0);
}
</style>