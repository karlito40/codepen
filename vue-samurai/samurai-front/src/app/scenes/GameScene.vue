<template>
  <div class="GameScene" :style="{ 'background-image': 'url(/levels/region-1.jpg)' }">
    <img src="/monsters/monster-12-idle.png" class="monster monster--left">
    <img src="/monsters/flip/monster-19-idle.png" class="monster monster--right">

    <div v-if="battle.actived" class="battle-actived"></div>
    <div v-if="battleOver" class="battle-over">
      <span v-if="isWinner">WINNER</span>
      <span v-else>LOSER</span>
    </div>
  </div>
</template>

<script>
import { battle as socketBattle, socket } from '@/socket';

export default {
  props: ['battle'],
  
  computed: {
    battleOver() {
      return this.battle.winner !== undefined;
    },

    isWinner() {
      return this.battleOver && this.battle.winner === socket().id;
    }
  },

  watch: {
    battleOver() {
      if(this.battleOver) {
        this.stop();
      }
    }
  },

  methods: {
    attack: socketBattle.attack,

    start () {
      document.addEventListener('mousedown', this.attack);
      document.addEventListener('keydown', this.attack);
    },

    stop() {
      document.removeEventListener('mousedown', this.attack);
      document.removeEventListener('keydown', this.attack);
    }
  },

  mounted () {
    this.start();
  },

  beforeDestroy() {
    this.stop();
  }
}
</script>

<style lang="scss" scoped>
.GameScene {
  position: relative;
  max-width: 700px;
  width: 100%;
  max-height: 500px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  .monster {
    position: absolute;
    bottom: 50px;
    
    &--left {
      left: 100px;
    }

    &--right {
      right: 100px;
    }
  }

  .battle-actived {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: red;
  }

  .battle-over {
    position: absolute;
    top: 30px;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px black;
  }
}
</style>
