<script context="module">
export const animations = {
  idle: [
    { width: 29, height: 22, x: 360, y: 142 },
  ],
  attack: [
    { width: 40, height: 31, x: 519, y: 131 },
    { width: 53, height: 36, x: 399, y: 128 },
    { width: 53, height: 22, x: 459, y: 140 },
  ],
  death: [
    { width: 40, height: 35, x: 571, y: 129 },
    { width: 45, height: 24, x: 623, y: 134 },
  ]
};
</script>

<script>
import Sprite from './Sprite';

export let mode;
export let iFrame = 0;
export let autoplay = true;

$: frames = animations[mode];
</script>

<Sprite class="Wadle" 
  frames={frames} 
  autoplay={autoplay}
  bind:iFrame={iFrame}
/>
