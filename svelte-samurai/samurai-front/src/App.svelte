
<script>
import Navaid from 'navaid';
import { onDestroy } from 'svelte';

let Route, params;

const router = Navaid('/')
  .on('/', () => import('./routes/Game.svelte').then(renderRoute))
  .on('/sprites', () => import('./routes/TestSprite.svelte').then(renderRoute))
  .on('/scenarios', () => import('./routes/TestScenario.svelte').then(renderRoute))
  .listen();

onDestroy(router.unlisten);

function renderRoute(m, obj) {
  params = obj || {};
  if (m.preload) {
    m.preload({ params }).then(() => {
      Route = m.default;
    });
  } else {
    Route = m.default;
  }
}
</script>

<main class="App">
  <svelte:component this={Route} {params} />
</main>

<style lang="less">
:global(*, *:after, *:before) {
  box-sizing: border-box;
}

:global(body, html) {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

.App {
  width: 100%;
  height: 100%;
  padding: 30px;
  background: url('/background.png') no-repeat;
  background-size: cover;
}
</style>