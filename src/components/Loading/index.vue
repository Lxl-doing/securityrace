<template>
  <i class="iconfont icon-guanbi loading-container"></i>
</template>

<script>
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2748164_h91bkqz5di.css";
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
i {
  font-weight: bold;
  display: block;
  font-size: 24px;
  color: #fff;
  width: 24px;
  height: 24px;
  transform: rotate(0deg);
  animation: spin 2s cubic-bezier(0, 0, 1, 1) infinite;
}
</style>