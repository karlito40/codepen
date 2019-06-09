<script>
import Stare from '../Stare';

let className;
export { className as class };
export let from;
</script>

<Stare class="KirbyStare {className}" from="{from}">
  <div class="face"></div>
</Stare>

<style lang="less">
.face {
  background: url('/samurai-kirby.png') no-repeat -1px -1px;
  width: 254px;
  height: 44px;
}
</style>