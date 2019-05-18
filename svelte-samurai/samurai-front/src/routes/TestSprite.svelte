<script>
import GameLayout from '../components/GameLayout';
import Sprite from '../components/sprites/Sprite';
import Kirby, { animations as kirbyAnims } from '../components/sprites/Kirby';
import Wadle, { animations as wadleAnims } from '../components/sprites/Wadle';
import MetaKnight, { animations as mkAnims } from '../components/sprites/MetaKnight';

const sprites = {
  kirby: {
    component: Kirby,
    autoplay: true,
    iFrame: 0,
    mode: Object.keys(kirbyAnims)[0],
    modes: Object.keys(kirbyAnims)
  },
  wadle: {
    component: Wadle,
    autoplay: true,
    iFrame: 0,
    mode: Object.keys(wadleAnims)[0],
    modes: Object.keys(wadleAnims)
  },
  metaKnight: {
    component: MetaKnight,
    autoplay: true,
    iFrame: 0,
    mode: Object.keys(mkAnims)[0],
    modes: Object.keys(mkAnims)
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
        <!-- <Kirby 
          {...sprite}
          bind:iFrame={sprite.iFrame}
        /> -->
        <svelte:component 
          this={sprite.component}
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