<script>
  import { route, status } from '../navigation.svelte';
</script>

<div class="home">
  <h1 style=" text-align: left;">
    Cards <br />
    against
    <br />
    humanity
  </h1>

  <div>
    <button
      class="full-width"
      style="margin-bottom: 1em;"
      onclick={() => {
        route.value = 'setup';
        status.value = 'host';
      }}
    >
      New Game
    </button>
    <button
      class="full-width"
      style="margin-bottom: 1.5em;"
      onclick={() => {
        route.value = 'setup';
        status.value = 'join';
      }}
    >
      Join Game
    </button>
    <span id="tag">Made with ❤️ Version 1.1.1</span>
  </div>
</div>

<style>
  .home {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #tag {
    font-size: x-small;
    align-self: flex-end;
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 99;
  }
</style>
