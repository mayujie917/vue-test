<script setup>

</script>

<template>
  <div id="app" class="safe-area-content">
    <router-view />
  </div>
</template>
<style lang="less">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

body {
  transition: color 0.5s, background-color 0.5s;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 12px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // height: 100vh;
}

#app {
  // height: 100vh;
  // width: 100vw;
  height: 100vw;
  // background: pink;

  // .content {
  //   width: 100%;
  //   /* 设定内容区域宽度为100% */
  //   height: 100%;
  //   /* 高度与容器保持一致 */
  //   transform-origin: top left;
  //   /* 变换原点设置为左上角 */
  //   transition: all 0.3s ease;
  //   /* 添加平滑过渡效果 */
  // }
}

.safe-area-content {
  transform: rotate(90deg);
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  height: calc(100% - env(safe-area-inset-top) - env(safe-area-inset-bottom));
}

.el-select-dropdown {
  bottom: -57% !important;
  left: 44% !important;
  transform: rotate(90deg);
  top: initial !important;
}
.el-message-box__wrapper{
  transform: rotate(90deg);
}
</style>

