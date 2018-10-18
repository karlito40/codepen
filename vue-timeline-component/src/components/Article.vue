<template>
  <div>
    <p><strong>Click again to get back to the home screen</strong></p>
    <div v-html="menu && menu.content"></div>
  </div>
</template>

<script>
import menus from '../menus';

export default {
  name: 'Article',
  data() {
    return {
      menu: menus.find(menu => menu.id === parseInt(this.$route.params.id, 10))
    }
  }
}
</script>