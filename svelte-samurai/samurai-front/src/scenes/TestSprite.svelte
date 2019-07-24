<script>
import GameLayout from '../ui/GameLayout';
import Sprite from '../core/Sprite';
import { Kirby, kirby } from '../prefabs/kirby';
import { Wadle, wadle } from '../prefabs/wadle';
import { MetaKnight, metaknight } from '../prefabs/metaknight';
import Explosion, { frames as explosionFrames } from '../prefabs/Explosion';

const sprites = {
  kirby: {
    component: Kirby,
    autoplay: true,
    iFrame: 0,
    animation: Object.keys(kirby.animations)[0],
    animations: Object.keys(kirby.animations)
  },
  wadle: {
    component: Wadle,
    autoplay: true,
    iFrame: 0,
    animation: Object.keys(wadle.animations)[0],
    animations: Object.keys(wadle.animations)
  },
  metaKnight: {
    component: MetaKnight,
    autoplay: true,
    iFrame: 0,
    animation: Object.keys(metaknight.animations)[0],
    animations: Object.keys(metaknight.animations)
  },
  explosion: {
    component: Explosion,
    autoplay: true,
    iFrame: 0,
    animation: explosionFrames,
    animations: []
  }
};
</script>

<GameLayout>
  {#each Object.values(sprites) as sprite}
    <section class="animation">
      <div class="animation__body">
        {sprite.iFrame}
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