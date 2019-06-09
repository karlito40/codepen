<script>
let className;
export { className as class };
export let from = 'left'; // ['left', 'right']
</script>

<div class="Stare from-{from}">
  <slot/>
</div>

<style lang="less">
.Stare {
  background: url('/stare.png') 0 -1px repeat-x;
  opacity: 0;
  height: 44px;
  width: 100%;

  &.from-left :global(> *) {
    transform: translateX(-100%);
  }
  
  &.from-right :global(> *) {
    transform: translateX(100%);
  }
}

</style>