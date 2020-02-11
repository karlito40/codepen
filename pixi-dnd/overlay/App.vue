<template>
  <div class="App">
    <div class="sidebar"></div>
    <menu></menu>
  </div>
</template>

<style>
*, *:after, *:before {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

html {
  position: fixed;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 4rem;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
}

menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  height: 3.5rem;
  border-bottom: 1px solid #DDDDDD;
  margin: 0;
}
</style>
