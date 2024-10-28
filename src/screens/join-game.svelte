<script>
  import { navigate } from 'svelte-routing';
  let seed = $state(undefined);
  let players = $state(undefined);
  $effect(() => {
    if (players) {
      localStorage.setItem('number-of-players', JSON.stringify(players));
    }
  });
</script>

<div class="container">
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
          placeholder="Players count:"
          class="input"
          name="text"
          type="number"
          min="2"
          bind:value={players}
        />
      </div>
    </div>
  </div>

  <div class="button-container">
    <button
      disabled={seed == undefined}
      onclick={() => {
        localStorage.setItem('game-host', JSON.stringify(false));
        navigate('/game');
      }}
    >
      join
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
  .numbers {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .numbers-text {
    text-align: center;
  }
</style>
