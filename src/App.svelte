<script>
  // @ts-nocheck

  import { route } from './navigation.svelte';
  import { fade } from 'svelte/transition';
  import Home from './screens/home.svelte';
  import HostGame from './screens/host-game.svelte';
  import JoinGame from './screens/join-game.svelte';
  import Game from './screens/game.svelte';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<main>
  {#if route.value == 'home'}
    <Home />
  {:else if route.value == 'host-game'}
    <HostGame />
  {:else if route.value == 'join-game'}
    <JoinGame />
  {:else if route.value == 'game'}
    <Game />
  {/if}
</main>

<style>
  main {
    display: flex;
  }
</style>
