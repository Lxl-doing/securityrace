<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
// 暂时scoped，以后删掉
#app {
  width: 100%;
  height: 100vh;
}
</style>
