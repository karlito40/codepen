<template>
  <div class="test-component">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue imperdiet dui, at tempus est rutrum varius. Nullam vehicula tincidunt massa vitae malesuada.</p> 
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Test',
}
</script>

<style scoped>
.test-component {
  position: relative;
}
</style>

