<script>
export let minesweeper;
const { store } = minesweeper;

const nbGradientColor = 11;
const gradientScaleBy = 0.455;
const distanceMax = Math.hypot(minesweeper.nbCol, minesweeper.nbRow);
const needStep = Math.ceil(distanceMax / (nbGradientColor));

function getBrighteness(cell) {
  const distance = Math.hypot(cell.position.x, cell.position.y);

  // On récupère la color step
  const step = Math.floor((distance / distanceMax) * nbGradientColor);

  // On calcule la luminosite a partir de 1
  return 1 - (step / nbGradientColor) * gradientScaleBy;
}

async function revealed(cell) {
  minesweeper.revealed(cell);
}
</script>

<div 
  class="Board" 
  style="
    --rows: { minesweeper.nbRow }; 
    --cols: { minesweeper.nbCol }"
>
  {#each $store.grid as row}
    {#each row as cell}
      <div 
        class="cell" 
        data-label="{cell.isRevealed() ? cell.label : ''}"
        data-state="{cell.state}"
        on:click={revealed.bind(null, cell)}
      >
        <div
          class="cell__background" 
          style="--brightness: {getBrighteness(cell)}"
        ></div>

        <div class="cell__body">
          {#if cell.isRevealed()}
            {cell.label}
          {/if}
        </div>
      </div>
    {/each}
  {/each}
</div>

<style lang="scss">
.Board {
  display: grid;
  grid-template: repeat(var(--rows), 30px) / repeat(var(--cols), 30px);
  border-top: 2px solid black;
  border-left: 2px solid black;
  font-family: 'Asap', Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
}

.cell {
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  position: relative;

  .cell__background {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .cell__body {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &[data-state="HIDDEN"], &[data-state="FLAG"] {
    z-index: 10; // put shadow over "revealed" block
    cursor: pointer;
    transition: 0.25s all;
    box-shadow: 1px 1px 3px rgba(0,0,0, 0.3);

    &:before {
      content: '';
      display: block;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border-left: 2px solid rgba(255, 255, 255, 0.5);
      border-top: 2px solid rgba(255, 255, 255, 0.5);
    }

    .cell__background {
      // It increase update time by 8ms !
      filter: brightness(var(--brightness));
      background-color: #43FFFF;
    }

    &:hover {
      &:before {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3) inset
      }

      .cell__background {
        background: radial-gradient(farthest-corner, #4be0e0, #13768c 300%);
      }
    }
  }

  &[data-state="FLAG"] {
    .cell__body {
      top: calc(50% - 8px);
      left: calc(50% - 10px);
      width: 20px;
      height: 20px;
      background: url(./icons/flag.png) no-repeat;
      background-size: contain;
    }
  }
  
  &[data-label="BOMB"] {
    color: rgba(0, 0, 0, 0);
    
    .cell__background {
      background-color: #ccf7f7;
    }

    .cell__body {
      top: calc(50% - 9px);
      left: calc(50% - 9px);
      width: 18px;
      height: 18px;
      background: url(./icons/bomb.png) no-repeat;
      background-size: contain;
    }
  }

  &[data-state="REVEALED"] {
    .cell__background {
      background-color: #ccf7f7;
    }
  }
  
  &[data-label="0"] {
    color: rgba(0, 0, 0, 0);
  }

  &[data-label="1"] {
    color: #4056BC;
  }
  
  &[data-label="2"] {
    color: #1E5009;
  }

  &[data-label="3"] {
    color: #A91C15;
  }
  
  &[data-label="4"] {
    color: #030983;
  }

  &[data-label="5"] {
    color: #9e5c18;
  }
  
  &[data-label="6"] {
    color: #12bcce;
  }

  &[data-label="7"] {
    color: black;
  }
  
  &[data-label="8"] {
    color: #898c8c;
  }
}

@media (max-width: 400px) {
  .Board {
    grid-template: repeat(var(--rows), 10px) / repeat(var(--cols), 10px);
  }
}
</style>
