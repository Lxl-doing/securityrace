<template>
  <div class="police-message-container">
    <span>上海海盾安全技术培训中心</span>
    <span class="line">|</span>
    <span><img src="https://gw.alicdn.com/tfs/TB1jwakrbH1gK0jSZFwXXc7aXXa-20-20.png"><a
        target="_blank"
        href="http://www.miitbeian.gov.cn"
      >沪ICP备 11021134号</a></span>
    <span class="line">|</span>
    <span><img src="https://gw.alicdn.com/tfs/TB1jwakrbH1gK0jSZFwXXc7aXXa-20-20.png"><a
        target="_blank"
        href="http://www.miitbeian.gov.cn"
      >沪公网安备 31010402004831号</a></span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.police-message-container {
  height: 17px;
  line-height: 17px;

  white-space: nowrap; // 强制不换行

  span {
    display: inline-block;
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    color: rgba(144, 145, 153, 1);

    img {
      width: 14px;
      height: 15px;
      margin-right: 3px;
      vertical-align: -3px;
    }

    &.line {
      font-size: 14px;
      margin: 0 20px;
    }

    &:not(.line):hover {
      color: rgba(28, 146, 255, 1);
      cursor: pointer;
    }
  }
}
</style>