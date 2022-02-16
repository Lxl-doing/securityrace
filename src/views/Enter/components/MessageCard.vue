<template>
  <div
    class="message-card-container"
    @click="handleClick"
  >
    <img
      :src="cardMessage.pic"
      alt=""
      class="top"
    >
    <div class="bottom">
      <h2>{{cardMessage.title}}</h2>
      <p>{{cardMessage.desc}}</p>
      <div class="icon"><i class="el-icon-right"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardMessage: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="less">
.message-card-container {
  cursor: pointer;
  width: 280px;
  height: 300px;
  background: #ffffff;
  box-shadow: 0 0 8px 0 rgba(96, 98, 107, 0.16);
  border-radius: 4px;
  overflow: hidden;

  .top {
    width: inherit;
    height: 168px;
  }

  .bottom {
    width: inherit;
    height: calc(100% - 168px);

    box-sizing: border-box;
    padding: 22px 14px 20px 20px;

    h2 {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #484a4d;
      line-height: 18px;
    }

    p {
      width: 210px;
      height: 36px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #909199;
      line-height: 18px;
      margin: 8px 0 10px;
    }

    .icon {
      width: 100%;
      height: 18px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      i {
      }
    }
  }
}
</style>