<script>
  // @ts-nocheck

  import { route } from './navigation.svelte';
  import { fade } from 'svelte/transition';
  import Home from './screens/home.svelte';
  import Setup from './screens/setup.svelte';
  import Game from './screens/game.svelte';
</script>

<svelte:head>
  <title>Cards Against Humanity</title>
  <meta name="color-scheme" content="light only" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if route.value == 'home'}
  <Home />
{:else if route.value == 'setup'}
  <Setup />
{:else if route.value == 'game'}
  <Game />
{/if}
