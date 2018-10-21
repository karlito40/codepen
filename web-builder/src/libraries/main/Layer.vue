<template>
  <div class="layer">
    Layer
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Layer',
  props: {
    x: {
      required: false
    }
  },
}
</script>
