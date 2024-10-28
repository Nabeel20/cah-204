<script>
  import { fade } from 'svelte/transition';
  import { route } from '../navigation.svelte';

  let seed = $state(undefined);
  let players = $state(undefined);
  let my_index = $state(undefined);
  $effect(() => {
    if (seed) {
      localStorage.setItem('game-seed', seed);
    }
    if (players) {
      localStorage.setItem('number-of-players', JSON.stringify(players));
    }
    if (my_index) {
      localStorage.setItem('my-index', my_index);
    }
  });
</script>

<div class="container" in:fade>
  <div>
    <h1>Join game</h1>
    <div class="numbers">
      <div>
        <p class="numbers-text">Game seed</p>
        <input
          placeholder="Game seed"
          class="input"
          name="text"
          type="number"
          min="0"
          bind:value={seed}
        />
      </div>
      <div>
        <p class="numbers-text">Players count</p>
        <input
          placeholder="Number of players"
          class="input"
          name="text"
          type="number"
          min="2"
          bind:value={players}
        />
      </div>
      <div>
        <p class="numbers-text">Your index</p>
        <input
          placeholder="Your index amon the players"
          class="input"
          name="text"
          type="number"
          min="1"
          bind:value={my_index}
        />
      </div>
    </div>
  </div>

  <div class="button-container">
    <button
      disabled={seed == undefined}
      onclick={() => {
        localStorage.setItem('turn-index', '0');
        localStorage.setItem('game-seed', seed);
        localStorage.setItem('my-index', my_index);
        route.value = 'game';
      }}
    >
      join
    </button>
    <button onclick={() => (route.value = 'home')}>back</button>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .numbers {
    display: flex;
    width: 100%;
    justify-content: space-around;
    gap: 0.5em;
    align-items: center;
    flex-wrap: wrap;
  }
  .numbers-text {
    text-align: center;
  }
</style>
