<template>
  <div
    class="wait-container"
    v-loading="isLoading"
  >
    <main-layout v-if="!isLoading">
      <template v-slot:head>
        <div class="username">{{username}}</div>
      </template>
      <template v-slot:default>
        <WaitTime
          v-if="!timeOver"
          :time="time"
          @showLoading="handleShowLoading"
        />
        <WaitLoading v-else />
      </template>
      <template v-slot:footer>
        <PoliceMessage class="" />
      </template>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from "@/components/MainLayout";
import PoliceMessage from "@/components/PoliceMessage";
import WaitTime from "./components/WaitTime.vue";
import WaitLoading from "./components/WaitLoading.vue";
import getRestTime from "@/api/time";
export default {
  components: {
    MainLayout,
    PoliceMessage,
    WaitTime,
    WaitLoading,
  },
  data() {
    return {
      username: "",
      isLoading: true,
      time: {},
      timeOver: false,
    };
  },
  methods: {
    handleShowLoading() {
      this.timeOver = true;
    },
  },
  async created() {
    this.username = this.$store.state.login.user.name;
    const time = await getRestTime();
    // console.log(time.data);
    this.time = time.data;
    this.isLoading = false;
  },
};
</script>

<style scoped lang="less">
.wait-container {
  width: 100%;
  height: 100vh;
}
.username {
  width: 1220px;
  margin: 0 auto;
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #48494d;
  text-align: left;
}
</style>