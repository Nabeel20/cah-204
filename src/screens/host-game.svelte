<script>
  import { fade } from 'svelte/transition';
  import { shuffle, generateId, url } from '../utils';
  import { blackCards } from '../assets/db';
  import { route } from '../navigation.svelte';
  let seed = $state(generateId());
  let number_of_players = $state(undefined);
  let my_index = $state(undefined);

  $effect(() => {
    if (my_index) {
      localStorage.setItem('my-index', JSON.stringify(my_index));
    }
    if (number_of_players) {
      localStorage.setItem(
        'number-of-players',
        JSON.stringify(number_of_players)
      );
    }
  });
</script>

<div class="container" in:fade>
  <div>
    <h1>Host a game</h1>
    <button id="id-card" onclick={() => navigator.clipboard.writeText(seed)}>
      Seed: <strong>{seed}</strong>
      <span style="font-size: xx-small; color: var(--black-card-helper-text)">
        click to copy
      </span>
    </button>
    <p style="text-align: left;">
      Share your game id with your friends, you need at least <strong>3</strong>
      players (you included).
    </p>
    <div class="numbers">
      <div>
        <p class="numbers-text">Number of players</p>
        <input
          class="input"
          type="number"
          bind:value={number_of_players}
          min="2"
        />
      </div>
      <div>
        <p class="numbers-text">Your number</p>
        <input class="input" type="number" bind:value={my_index} min="1" />
      </div>
    </div>
  </div>

  <div class="button-container">
    <button
      onclick={() => {
        localStorage.setItem('turn-index', '0');
        localStorage.setItem('my-index', JSON.stringify(my_index));
        localStorage.setItem('game-seed', seed);
        route.value = 'game';
      }}
      disabled={!number_of_players || !my_index}
    >
      Start game
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
  #id-card {
    padding: 1em;
    margin-top: 1.2em;
    margin-bottom: 1.2em;
    border-color: #6b7280;
    border-style: dashed;
    border-radius: 8px;
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
