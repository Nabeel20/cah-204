<script>
  // @ts-nocheck
  import { fade, fly } from 'svelte/transition';
  import { blackCards, whiteCards } from '../assets/db';
  import { chat_id, shuffle, split, url } from '../utils';
  import { onMount } from 'svelte';

  let me = localStorage.getItem('me') ?? 'Nabeel';
  let seed = localStorage.getItem('seed');
  let players = $state(
    shuffle(JSON.parse(localStorage.getItem('players')).sort(), seed)
  );
  let my_index = $state(undefined);
  let current_judge = $state(undefined);
  let is_judge = $state(undefined);
  //
  let white_cards = shuffle(whiteCards, seed);
  let black_cards = $state(shuffle(blackCards, seed));
  let my_cards = $state([]);
  //
  let selected = $state([]);
  let loading = $state(false);

  $effect(() => {
    current_judge = players[0];
    is_judge = current_judge == me;
  });
  onMount(() => {
    current_judge = players[0];
    my_index = players.findIndex((o) => o == me);
    my_cards = split(white_cards, players.length)[my_index];
  });
  function move_first_to_last(arr) {
    if (arr.length === 0) return arr;
    const firstItem = arr.shift();
    arr.push(firstItem);
    return arr;
  }
  function send_black_card() {
    loading = true;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text: `━ Black card ━━━━━━━━\n\n${black_cards[0].text}\n\n ━━━━━━━━━ <blockquote>Judge: ${current_judge}</blockquote>`,
        parse_mode: 'HTML',
      }),
    })
      .then((j) => j.json())
      .then((r) => {
        const { ok, result } = r;
        if (ok) {
          loading = false;
        }
      });
  }
  function send_selected() {
    loading = true;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text: `💭 White card \n\n${selected.join('\n\n')}\n\n<span class="tg-spoiler">--${me}</span>`,
        parse_mode: 'HTML',
      }),
    })
      .then((j) => j.json())
      .then((r) => {
        const { ok, result } = r;
        if (ok) {
          selected.forEach((v) => {
            my_cards = my_cards.filter((i) => i.text != v);
          });
          loading = false;
          selected = [];
        }
      });
  }
</script>

<div class="game-container">
  <div>
    {#if is_judge}
      <h3 style="text-align:center; font-size:2em; color:#ef4444 " in:fade>
        You are the judge, go judge people
      </h3>
    {:else if loading}
      <h2 style="text-align:center">loading</h2>
    {:else}
      <div in:fly>
        <h5 style="text-align: left;">
          Current Judge: {current_judge}
        </h5>
        <p id="helper-text">Pick Your best answer</p>
        {#each my_cards.slice(0, 5) as card}
          <button
            in:fade
            class="white-card full-width"
            style="background-color: {selected.includes(card.text)
              ? '#7dd3fc'
              : 'var(--white-card-background)'}"
            onclick={() => {
              if (selected.includes(card.text) || selected.length > 2) {
                selected = selected.filter((f) => f != card.text);
                return;
              }
              selected = [...selected, card.text];
            }}
          >
            {card.text}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <button
    class="full-width"
    disabled={loading || (is_judge == false && selected.length == 0)}
    onclick={() => {
      players = move_first_to_last(players);
      if (is_judge) {
        send_black_card();
      } else {
        send_selected();
      }
      black_cards = move_first_to_last(black_cards);
    }}
  >
    Send {is_judge ? 'black' : 'white'} card
  </button>
</div>

<style>
  .game-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #helper-text {
    text-align: start;
    margin-bottom: 1.2em;
  }
  .white-card {
    width: 85vw;
    height: auto;
    min-height: 10vh;
    background-color: #fafaf9;
    color: #0c1214;
    margin-bottom: 14px;
    text-align: start;
  }
</style>
