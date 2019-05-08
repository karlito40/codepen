<script>

import { onMount, beforeUpdate, createEventDispatcher } from 'svelte';

let _class;
export { _class as class };
export let frames;
export let speed = 100;
export let infinite = true;
export let autoplay = true;
export let iFrame = 0;

let currentFrame;

const dispatch = createEventDispatcher();

// Get sprite dimension
const cloneFrames = [...frames];
const maxWidth = cloneFrames.sort((a, b) => b.width - a.width)[0].width;
const maxHeight = cloneFrames.sort((a, b) => b.height - a.height)[0].height;

const canvas = {
  width: maxWidth,
  height: maxHeight
};

// Prevent iFrame overflow
$: {
  const oldFrame = currentFrame;
  if(!frames[iFrame] && !infinite) {
    iFrame = frames.length - 1; 
  } else {
    iFrame = frames[iFrame] ? iFrame : 0;
  }

  currentFrame = frames[iFrame];
}

onMount(() => {
  const interval = setInterval(() => {
    if(!autoplay) {
      return;
    }

    iFrame = iFrame + 1
  }, speed);

  return () => clearInterval(interval);
});
</script>

<div 
  class="Sprite {_class}"
  style="{`
    width: ${canvas.width}px;
    height: ${canvas.height}px;
  `}"
>
  <div 
    class="frame"
    style="{`
      width: ${currentFrame.width}px;
      height: ${currentFrame.height}px;
      background-position: -${currentFrame.x}px -${currentFrame.y}px;
    `}"
  ></div>
</div>

<style lang="less">
.Sprite {
  position: relative;
}

.frame {
  position: absolute;
  bottom: 0;
  left: 0;
  background: url('/samurai-kirby.png') no-repeat;
}
</style>