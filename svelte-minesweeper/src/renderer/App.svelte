<script>
import { DEV } from '../constants';
import Minesweeper from './Minesweeper.svelte';

if(DEV) {
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
}
</script>


<div class="App">
  <Minesweeper/>
</div>
 
<style>
:global(:root) {
  /*--c-bg-1: #ddeeee;*/
  --c-bg-1: #e9f5f5;
}

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
  background: var(--c-bg-1);
}

.App {
  text-align: center; 
  padding: 50px 20px;
}
</style>