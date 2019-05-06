<script>
export let battle;

const players = ['X', 'Y'];
const bo = 3;
const rounds = [
  { winner: 'X' },
  { winner: 'Y' },
  { winner: 'X' },
  { winner: 'X' },
];
const roundsByPlayer = players.map(playerId => createRoundsByPlayer(playerId, rounds))

function createRoundsByPlayer(playerId, rounds) {
  const winRounds = rounds.filter((round) => round.winner == playerId);

  return [
    ...winRounds,
    ...Array.from({ length: bo - winRounds.length }, () => ({
      winner: false
    }))
  ]
}
</script>

<div class="VersusBar">
  {#each roundsByPlayer as playerRound, index (index)}
    <div class="player">
      {#each playerRound as round, roundIndex (roundIndex)}
        <div class="round" class:has-won={round.winner}></div> 
      {/each}
    </div>
  {/each}
</div>  

<style lang="less">
.VersusBar {
  display: flex;
}

.player {
  & { display: flex; }
 
  &:last-child {
    margin-left: auto;
    flex-direction: row-reverse;
  }  
}



.round {
  & {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: red;
    margin-right: 5px;
  }
  
  &.has-won {
    background: green;
  }
}
</style>
