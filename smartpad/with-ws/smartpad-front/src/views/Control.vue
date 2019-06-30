<template>
  <div class="Control">
    <div class="full">
      <MouseControl/>
    </div>
    <MediaControl/>
  </div>  
</template>

<script>
import MouseControl from './MouseControl';
import MediaControl from './MediaControl';

export default {
  components: { MouseControl, MediaControl }
}
</script>

<style lang="scss" scoped>
.Control {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .full {
    flex: 1;
    position: relative;
  }
}
</style>
