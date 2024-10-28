<script>
  import { navigate } from 'svelte-routing';
</script>

<div class="main-container">
  <h1 style=" text-align: left;">
    Cards <br />
    against
    <br />
    humanity
  </h1>

  <div id="footer">
    <button onclick={() => navigate('/host-game')}>New Game</button>
    <button onclick={() => navigate('/join-game')}>Join Game</button>
    <span id="footer-text">Made with 💖</span>
  </div>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #footer {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  #footer-text {
    color: #f9fafb;
    font-size: x-small;
    align-self: flex-end;
  }
</style>
