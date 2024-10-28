<script>
  import { fade } from 'svelte/transition';
  import { navigate } from 'svelte-routing';
  import { shuffle, generateId, url } from '../utils';
  import { blackCards } from '../assets/db';
  let seed = $state(generateId());
  let loading = $state(false);
  let black_card = $state(shuffle(blackCards, seed));

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

<div class="container" transition:fade>
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
        loading = true;
        localStorage.setItem('turn-index', '0');
        fetch(
          url +
            `━ Black card ━━━━━━━━ %0A%0A ${black_card[0].text} %0A%0A ━━━━━━━━━`
        )
          .then((j) => j.json())
          .then(() => {
            loading = false;
            navigate('/game');
          })
          .catch((err) => console.log(err));
      }}
      disabled={loading || !number_of_players || !my_index}
    >
      {loading ? 'Loading...' : 'Start game'}
    </button>
    <button onclick={() => navigate('/')}>back</button>
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
  }
  .numbers-text {
    text-align: center;
  }
</style>
