<script>
import { DEV } from './constants';
import Minesweeper from './Minesweeper.svelte';

if(DEV) {
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
}
</script>


<div class="game">
  <Minesweeper/>
</div>
 
<style>
.game { 
  text-align: center; 
  padding: 50px 20px;
}
</style>