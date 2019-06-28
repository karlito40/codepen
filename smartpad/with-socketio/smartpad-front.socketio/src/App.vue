<template>
  <div class="App">
    <router-view/>
  </div>
</template>

<style lang="scss">
*, *:after, *:before {
  box-sizing: border-box;
}

body, html {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
body {
  overscroll-behavior: none;
}
</style>

