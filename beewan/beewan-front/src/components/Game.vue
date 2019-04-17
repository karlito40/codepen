<template>
  <div class="Game" :style="{ 'background-image': 'url(/levels/region-1.jpg)' }">
    <img src="/monsters/monster-12-idle.png" class="monster monster--left">
    <img src="/monsters/flip/monster-19-idle.png" class="monster monster--right">

    <div v-if="battle.go" class="go"></div>
    <div v-if="battleOver" class="battle-over">
      <span v-if="isWin">WINNER</span>
      <span v-else>LOSER</span>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getSocket } from '@/socket';

export default {
  props: ['battle'],
  
  computed: {
    battleOver() {
      return this.battle.winner !== undefined;
    },

    isWin() {
      return this.battleOver 
        && this.battle.winner === getSocket().id;
    }
  },

  methods: {
    attack() {
      getSocket().emit('battle.attack', {
        battleId: this.battle.id
      });
    }
  },

  mounted () {
    document.addEventListener('keydown', this.attack);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.attack);
  }
}
</script>

<style lang="scss" scoped>
.Game {
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

  .go {
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
