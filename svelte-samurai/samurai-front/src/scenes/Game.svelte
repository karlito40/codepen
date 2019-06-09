<script>
import { onMount } from 'svelte';
import GameLayout from '../ui/GameLayout';
</script>

<svelte:head>
	<title>Samurai Kirby !</title>
</svelte:head>

<GameLayout>
  <div class="kirby"></div>
</GameLayout>

<style lang="less">
.kirby {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: url('/samurai-kirby.png') no-repeat -9px -161px;
	width: 27px;
	height: 25px;
}
</style>
