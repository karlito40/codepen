<script>
import Stare from '../Stare';

let className;
export { className as class };
export let from;
</script>

<Stare class="WadleStare {className}" from="{from}">
  <div class="face"></div>
</Stare>

<style lang="less">
.face {
  background: url('/samurai-kirby.png') no-repeat 0 -53px;
  width: 256px;
  height: 46px;
}
</style>
