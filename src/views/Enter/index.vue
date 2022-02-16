<template>
  <div
    class="enter-container"
    v-loading="isLoading"
  >
    <MessageCard
      v-for="item in cardMessage"
      :key="item.title"
      :cardMessage="item"
      @click="handleClick"
    />
    <PoliceMessage />
  </div>
</template>

<script>
import MessageCard from "./components/MessageCard.vue";
import PoliceMessage from "@/components/PoliceMessage";
import enter1 from "@/assets/enter1.png";
import enter2 from "@/assets/enter2.png";
import delay from "@/utils/delay.js";
export default {
  components: {
    MessageCard,
    PoliceMessage,
  },
  data() {
    return {
      isLoading: true,
      cardMessage: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.push("/wait");
    },
  },
  async mounted() {
    await delay();
    this.cardMessage = [
      {
        pic: enter1,
        title: "知识竞赛",
        desc: "知识竞赛总分100分，考试时间2019/07/12 08:00-20:00",
      },
      {
        pic: enter2,
        title: "技能竞赛",
        desc: "技能竞赛总分100分，考试时间2019/07/12 08:00-20:00",
      },
    ];
    this.isLoading = false;
  },
};
</script>

<style scoped lang="less">
.enter-container {
  min-width: 1366px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .message-card-container:nth-of-type(2) {
    margin-left: 10%;
  }

  .police-message-container {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 16px;
  }
}
</style>