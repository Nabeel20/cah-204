<script>
  import { fade } from 'svelte/transition';
  import { generateId, bot_id, chat_id } from '../utils';
  import { route, status } from '../navigation.svelte';
  import { onMount } from 'svelte';
  let seed = $state(undefined);
  let players = $state([]);
  let selected = $state([]);
  let loading = $state(true);

  onMount(() => {
    if (status.value == 'host') {
      seed = generateId();
    }
    fetch(
      `https://api.telegram.org/bot${bot_id}/getChatAdministrators?chat_id=${chat_id}`
    )
      .then((j) => j.json())
      .then((r) => {
        let { ok, result } = r;
        let users = result.map((u) => u.user).filter((b) => b.is_bot == false);
        players = users.map((s) => s.first_name).sort();
        loading = false;
      });
  });

  function handle_selection(name) {
    if (selected.includes(name)) {
      selected = selected.filter((f) => f != name);
      return;
    }
    selected = [...new Set([...selected, name])];
  }
</script>

<div class="host">
  <div>
    <h1 style="align-self: center;">
      {status.value == 'host' ? 'Host' : 'Join'} a game {selected.length > 0
        ? `(${selected.length})`
        : ''}
    </h1>
    {#if status.value == 'host'}
      <p id="seed-card">
        Seed: <strong>{seed}</strong>
      </p>
    {:else}
      <div class="input-container">
        <input
          placeholder="Game seed"
          class="input"
          name="text"
          type="number"
          min="0"
          bind:value={seed}
        />
      </div>
    {/if}

    {#if loading}
      <p>Loading...</p>
    {:else}
      {#if selected.length == 0}
        <h3 style="color: #ef4444">Please Select your name:</h3>
      {:else}
        <p in:fade style="font-size: 1.3em;">
          I am <strong style="color: #ef4444">{selected[0]}</strong>
          and other players are:
        </p>
      {/if}
      <div class="chips-container">
        {#each players as player}
          <button
            onclick={() => handle_selection(player)}
            style="background-color: {selected[0] == player
              ? '#ef4444'
              : selected.includes(player)
                ? '#7dd3fc'
                : ''}"
          >
            {player}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  <div>
    <button
      class="full-width"
      style="margin-bottom:1em"
      disabled={selected.length < 3}
      onclick={() => {
        localStorage.setItem('seed', seed);
        localStorage.setItem('me', selected[0]);
        localStorage.setItem('players', JSON.stringify(selected));
        route.value = 'game';
      }}
    >
      Start game
    </button>
    <button
      class="full-width"
      style="margin-bottom: 1.5em;"
      onclick={() => (route.value = 'home')}
    >
      back
    </button>
  </div>
</div>

<style>
  .host {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #seed-card {
    padding: 1em;
    border-color: #6b7280;
    border-style: dashed;
    border-radius: 8px;
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 1.3em;
  }
  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-top: 1em;
  }
  .input {
    font-family: 'SF Pro';
    max-width: 190px;
    padding: 0.875rem;
    font-size: 1rem;
    border: 1.5px solid #000;
    border-radius: 0.5rem;
    box-shadow: 2.5px 3px 0 #000;
    outline: none;
    transition: ease 0.25s;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.2em;
  }
  .input-container {
    display: flex;
    justify-content: center;
  }
</style>
