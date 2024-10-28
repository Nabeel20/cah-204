<script>
  // @ts-nocheck

  import { Router, Route } from 'svelte-routing';
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
  <Router>
    <Route path="/" component={Home}></Route>
    <Route path="/host-game/" component={HostGame}></Route>
    <Route path="/join-game" component={JoinGame}></Route>
    <Route path="/game" component={Game}></Route>
  </Router>
</main>

<style>
  main {
    display: flex;
  }
</style>
