<script>
  import { Gates } from '../lib/gates.js';
  export let onSelect;
  export let onCancel;
  export let onReset;
</script>

<div class="picker">
  <div class="picker-header">
    <h4>Select Gate</h4>
    <button class="close-btn" on:click={onCancel}>✕</button>
  </div>
  <div class="picker-buttons">
    {#each Object.keys(Gates) as gate}
      <button on:click={() => onSelect(gate)} class="gate-option">
        {gate}
      </button>
    {/each}
     <button on:click={onReset} class="gate-option">
        Reset
      </button>
  </div>
</div>

<style>
  .picker {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1a1a1a;
    border: 2px solid #1a5a99;
    border-radius: 8px;
    padding: 1rem;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    min-width: 250px;
  }
  
  .picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid #555;
    padding-bottom: 0.5rem;
  }
  
  .picker-header h4 {
    margin: 0;
    color: #fff;
    font-size: 1rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
  }
  
  .close-btn:hover {
    color: #fff;
  }
  
  .picker-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  
  .gate-option {
    padding: 0.6rem;
    background: #2a2a2a;
    color: #fff;
    border: 1px solid #444;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;
  }
  
  .gate-option:hover {
    background: #1a5a99;
    border-color: #1a5a99;
  }
</style>
