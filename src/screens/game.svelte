<script>
  // @ts-nocheck
  import { fade, fly } from 'svelte/transition';
  import { blackCards, whiteCards } from '../assets/db';
  import { shuffle, split, url } from '../utils';
  import { onMount } from 'svelte';

  let turn = $state(parseInt(localStorage.getItem('turn-index') ?? '0'));
  let players = Array.from(
    { length: parseInt(localStorage.getItem('number-of-players')) ?? 2 },
    (_, index) => index + 1
  );
  let seed = localStorage.getItem('game-seed');
  let my_index = parseInt(localStorage.getItem('my-index'));
  let loading = $state(false);
  //
  const all_cards = split(shuffle(whiteCards, seed), players.length);
  let my_cards = $state(all_cards[my_index]);
  let selected = $state([]);
  let button_text = $state('Send Answer');

  $effect(() => {
    if (players[turn % players.length] == my_index) {
      button_text = 'Send black card';
    }
    if (selected.length > 0) {
      button_text = 'Send Card';
    }
  });
</script>

<div class="game-container">
  <div>
    {#if players[turn % players.length] == my_index}
      <p style="text-align:center; font-size:2em" in:fade>
        You are the judge, go judge people
      </p>
    {:else}
      <div in:fly>
        <p id="helper-text">Pick Your best answer</p>
        {#each my_cards.slice(0, 7) as card}
          <button
            class="white-card"
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
  <div>
    <button
      style="margin-bottom:1em"
      disabled={loading ||
        (players[turn % players.length] != my_index && selected.length == 0)}
      onclick={() => {
        const is_current_judge = players[turn % players.length] == my_index;
        if (is_current_judge) {
          loading = true;
          button_text = 'Loading...';
          fetch(
            url +
              `━ Black card ━━━━━━━━%0A%0A${shuffle(blackCards, seed)[turn].text}%0A%0A ━━━━━━━━━`
          )
            .then((j) => j.json())
            .then((re) => {
              if (re.ok) {
                loading = false;
                selected = [];
                turn += 1;
                localStorage.setItem('turn-index', JSON.stringify(turn));
                button_text = 'Send Card';
              }
            })
            .catch(() => {
              loading = false;
              button_text = 'Next turn';
            });
          return;
        }

        if (selected.length == 0) {
          return;
        }
        loading = true;
        button_text = 'Loading...';
        let card = selected[0];
        if (selected.length > 1) {
          card = selected.join('%0A%0A');
        }

        fetch(url + `💭 White card %0A%0A${card}%0A%0A`)
          .then((j) => j.json())
          .then((r) => {
            if (r.ok) {
              for (let index = 0; index < selected.length; index++) {
                my_cards = my_cards.filter((f) => f.text != selected[index]);
              }
              loading = false;
              selected = [];
              turn += 1;
              localStorage.setItem('turn-index', JSON.stringify(turn));

              button_text = 'Send Card';
            } else {
              loading = false;
              button_text = 'Send Card';
            }
          })
          .catch((err) => {
            loading = false;
            button_text = 'Send Card';
          });
      }}
    >
      {button_text}
    </button>
  </div>
</div>

<style>
  .game-container {
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
    height: 10vh;
    background-color: #fafaf9;
    color: #0c1214;
    margin-bottom: 14px;
    text-align: start;
  }
</style>
