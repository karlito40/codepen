<script>
import { onMount, createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

onMount(() => {
  setTimeout(() => {
    dispatch('complete');
  }, 1200);
})
</script>

<div class="Beekast">
  <div>Beekast</div>
</div>

<style lang="less">
.Beekast {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2B2761;
  color: white;
  text-align: center;
  height: 100%;
  width: 100%;
}
</style>