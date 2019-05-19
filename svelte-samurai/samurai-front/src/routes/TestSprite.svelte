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
    animation: Object.keys(kirbyAnims)[0],
    animations: Object.keys(kirbyAnims)
  },
  wadle: {
    component: Wadle,
    autoplay: true,
    iFrame: 0,
    animation: Object.keys(wadleAnims)[0],
    animations: Object.keys(wadleAnims)
  },
  metaKnight: {
    component: MetaKnight,
    autoplay: true,
    iFrame: 0,
    animation: Object.keys(mkAnims)[0],
    animations: Object.keys(mkAnims)
  }
};
</script>

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

        <div class="animations">
          {#each sprite.animations as animation}
            <button on:click={() => sprite.animation = animation}> {animation}</button>
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
.animations button {
  color: orange;
}
</style>