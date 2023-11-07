<script setup>

</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
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
  height: 100vh;
}

#app {
  /* height: 100vh;
  width: 100%; */
  height: 100vh;
}
</style>

