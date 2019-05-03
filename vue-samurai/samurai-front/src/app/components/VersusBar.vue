<template>
  <div class="VersusBar">
    <div 
      v-for="(playerRound, index) in roundsByPlayer"
      :key="index"
      class="player"
    > 
      <div 
        v-for="(round, roundIndex) in playerRound" 
        :key="roundIndex"
        :class="{'has-won': round.winner}"
        class="round"
      ></div>
    </div>
  </div>  
</template>

<script>

export default {
  props: ['battle'],

  computed: {
    players() {
      return ['X', 'Y'];
    },

    bo() {
      return 3;
    },

    roundsByPlayer () {
      return this.players.map(playerId => createRoundsByPlayer(this.bo, playerId, this.rounds));
    },

    rounds () {
      return [
        { winner: 'X' },
        { winner: 'Y' },
        { winner: 'X' },
        { winner: 'X' },
      ]
    }
  }

}

function createRoundsByPlayer(bo, playerId, rounds) {
  const winRounds = rounds.filter((round) => round.winner == playerId);
  return [
    ...winRounds,
    ...Array.from({ length: bo - winRounds.length }, () => ({
      winner: false
    }))
  ]
}

</script>

<style lang="scss" scoped>
.VersusBar {
  display: flex;

}

.player {
  display: flex;
 
  &:last-child {
    margin-left: auto;
    flex-direction: row-reverse;
  }  
}



.round {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  margin-right: 5px;
  &.has-won {
    background: green;
  }
}
</style>
