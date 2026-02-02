<script>
  import '../app.css'
  import Navbar from '../components/Navbar.svelte'
</script>

<Navbar />

<main>
  <slot />
</main>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
