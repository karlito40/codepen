<template>
  <div id="app">
    <header class="debug-bar">
      [Players] {{ state.nbPlayers }} 
      | [Battles] 
      <span :key="battle.id" v-for="battle in state.battles">
        {{ battle.id }}
      </span>
    </header>

    <div v-if="state.searching" class="matchmaking">
      En attente d'un noob...
    </div>
    <div v-else-if="!state.selectedBattle" class="matchmaking" @click="join">
      Faire la bagarre
    </div>
    <Game v-else :battle="state.selectedBattle"/>
  </div>
</template>

<script>
import { getSocket } from '@/socket';
import Game from './Game';

export default {
  components: { Game },
  computed: {
    state() {
      return this.$store.state;
    }
  },
  methods: {
    join() {
      this.$store.dispatch('set', { searching: true });
      getSocket().emit('matchmaking.join');
    },

    listBattle() {
      getSocket().emit('battle.list');
    }
  }
}
</script>

<style lang="scss">
*, *:after, *:before {
  box-sizing: border-box;
}

body, html {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  background: url('/background.jpg');
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 100px;

  .Game {
    flex: 1;
  }

  .debug-bar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .matchmaking {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px black;
    cursor: pointer;
  }
}
</style>
