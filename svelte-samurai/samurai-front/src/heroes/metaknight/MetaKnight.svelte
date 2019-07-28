<script>
import Sprite from '../../components/Sprite';
import BaseCharacter from '../BaseCharacter';
import metaknight from './entity';

let className = '';
export { className as class };
export let animation;
export let iFrame = 0;
export let autoplay = true;
export let placement;

$: frames = metaknight.animations[animation];
$: if(animation.includes('death') && !metaknight.animations[animation]) {
  animation = 'death';
}
</script>

<BaseCharacter class="MetaKnight {className}" state={animation} placement={placement}>
  <Sprite 
    frames={frames} 
    autoplay={autoplay}
    bind:iFrame={iFrame}
  />
</BaseCharacter>

