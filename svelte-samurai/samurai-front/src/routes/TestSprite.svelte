<script>
import GameLayout from '../components/GameLayout';
import Sprite from '../components/sprites/Sprite';
import Kirby, { animations as kirbyAnimations } from '../components/sprites/Kirby';

const sprites = {
  kirby: {
    autoplay: true,
    iFrame: 0,
    mode: Object.keys(kirbyAnimations)[0],
    modes: Object.keys(kirbyAnimations)
  }
};
</script>

<svelte:head>
	<title>Test sprites !</title>
</svelte:head>

<GameLayout>
  {#each Object.values(sprites) as sprite}
    <section class="animation">
      <div class="animation__body">
        {sprite.iFrame}
        <Kirby 
          {...sprite}
          bind:iFrame={sprite.iFrame}
        />
      </div>

      <div class="animation__footer">
        <div class="actions">
          <button on:click={() => sprite.iFrame--}> prev</button>
          <button on:click={() => sprite.iFrame++}> next</button>
          <button on:click={() => sprite.iFrame = 0}> reset</button>
          <button on:click={() => sprite.autoplay = !sprite.autoplay}>
            {sprite.autoplay ? 'pause' : 'start'}
          </button>
        </div>

        <div class="modes">
          {#each sprite.modes as mode}
            <button on:click={() => sprite.mode = mode}> {mode}</button>
          {/each}
        </div>
      </div>
    </section>
  {/each}
</GameLayout>


<style lang="less">
.animation__body, .animation__footer {
  display: flex;
}

button {
  font-size: 7px;
  padding: 0px 3px;
}
.modes button {
  color: orange;
}
</style>