<script>
import store from '../store';
import { socket } from '../socket';
</script>

<div class="DebugBar">
  [Players] { $store.nbPlayers }
  | [Battles] 

  {#each $store.battles as battle (battle.id)}
    { battle.id } - 
  {/each}

  {#if $store.connected}
    <button on:click={() => socket().disconnect()}>Se deconnecter</button>
  {:else}
    <button on:click={() => socket().connect()}>Se connecter</button>
  {/if}
</div>

