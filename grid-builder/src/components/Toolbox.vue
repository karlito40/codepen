<template>
  <div class="Toolbox">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quaerat at similique fuga? Error quae aperiam laborum a officia ratione dolorum! Ea doloribus necessitatibus architecto explicabo velit fuga harum aliquam.</p>
    <p>Magnam minima iste perferendis impedit molestias maxime fugiat placeat eius reiciendis quia. Cum voluptas adipisci consequuntur asperiores voluptatum beatae excepturi tempore mollitia delectus necessitatibus repellat et cumque, temporibus qui libero!</p>
    <p>Eaque, at. Suscipit error nobis doloremque quaerat, amet quasi voluptas accusantium pariatur temporibus illum maiores, a dicta voluptatibus reprehenderit reiciendis excepturi, incidunt at quidem blanditiis libero eum perspiciatis tempore animi.</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.Toolbox {
  @extend .box;
  height: 200px;
  width: 100px;
}
</style>
