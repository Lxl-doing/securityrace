<template>
  <div class="main-layout-container">
    <header>
      <slot name="head"></slot>
    </header>
    <div class="main">
      <slot></slot>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped lang="less">
.main-layout-container {
  min-width: 1366px;
  min-height: 100vh;
  position: relative;
  background: #f5f6fa;
  position: relative;
}

header {
  width: inherit;
  height: 64px;
  line-height: 64px;
  background: #ffffff;
  box-shadow: 0 1px 10px 0 rgba(96, 98, 107, 0.16);
}

.main {
  width: 1220px;
  height: calc(100vh - 84px);
  margin: 0 auto;
  margin-top: 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.police-message-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 16px;
}
</style>