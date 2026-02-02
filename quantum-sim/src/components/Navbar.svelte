<script>
</script>

<nav class="navbar">
  <div class="navbar-left">
    <a href="/" class="navbar-title">Quantum Simulator</a>
  </div>
  <div class="navbar-right">
    <a href="/actual_sim">
      <button class="nav-button">Actual Sim</button>
    </a>
    <a href="/docs">
      <button class="nav-button">Docs</button>
    </a>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1a1a1a;
    border-bottom: 1px solid #646cff;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar-left {
    display: flex;
    align-items: center;
  }

  .navbar-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #646cff;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .navbar-title:hover {
    background-color: rgba(100, 108, 255, 0.1);
  }

  .navbar-right {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .nav-button {
    padding: 0.5rem 1rem;
    background-color: #646cff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  .nav-button:hover {
    background-color: #7878ff;
  }

  a {
    text-decoration: none;
  }
</style>
