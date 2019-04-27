<script>
import { DEV } from '../constants';
import Minesweeper from './Minesweeper.svelte';
</script>


<div class="App">
  <Minesweeper/>
</div>
 
<style>
/* :global(:root) {
  --c-bg-1: #e9f5f5; 
}*/

:global(*, *:after, *:before) {
	box-sizing: border-box;
}

:global(html, body) {
	position: relative;
	width: 100%;
	height: 100%;
}

:global(body) {
	margin: 0;
  padding: 0;
}

.App {
  text-align: center; 
  padding: 50px 20px;
}
</style>