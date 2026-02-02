<script>
  import GateBlock from './GateBlock.svelte';
  import GatePicker from './GatePicker.svelte';
  import BlochMini from './BlochMini.svelte';
  import { updateGate } from '../state/circuitState.js';

  export let step;
  export let state;
  export let qubitIndex;
  export let stepIndex;

  let picking = false;
</script>

<div class="step">
  <div class="gate-area">
    {#if step?.gate}
      <GateBlock name={step.gate} onClick={() => picking = true} />
    {:else}
      <button class="add-gate" on:click={() => picking = true}>+</button>
    {/if}
  </div>

  {#if state}
    <div class="bloch-area">
      <BlochMini {state} />
    </div>
  {/if}

  {#if picking}
    <GatePicker
      onSelect={(gate) => {
        updateGate(qubitIndex, stepIndex, gate);
        step = { ...step, gate };
        picking = false;
      }}
      onCancel={() => picking = false}
      onReset={() => {
        updateGate(qubitIndex, stepIndex, null);
        step = { ...step, gate: null };
        picking = false;
      }}
    />
  {/if}
</div>

<style>
  .step {
    width: 80px;
    min-height: 80px;
    border: 1px solid #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #333;
    gap: 4px;
    padding: 4px;
    position: relative;
  }
  
  .gate-area {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 24px;
  }
  
  .add-gate {
    padding: 2px 6px;
    background: #1a5a99;
    color: #fff;
    border: 1px solid #1a5a99;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .add-gate:hover {
    background: #1e6db5;
  }
  
  .bloch-area {
    width: 100%;
  }
</style>
