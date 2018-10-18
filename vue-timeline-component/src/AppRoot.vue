<template>
  <div id="root">
    <nav>
      <div class="title">Animation Base</div>
      <ul>
        <li><router-link to="/">With router</router-link></li>
        <li><router-link to="/without-router">Without router</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppRoot',
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
  margin-left: 10px;
  list-style: none;
}

a {
  display: block;
  background-color: #efd7bf;
  color: #b38a60;
  border: 2px solid #b38a60;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.2s all;
  &:hover {
    background-color: #f5e7d9;
  }
}

nav {
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 15px auto 15px auto;
  align-items: center;
}

.title {
  background-color: black;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
}
</style>


