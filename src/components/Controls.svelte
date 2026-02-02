<script>
  import { createEventDispatcher } from 'svelte';
  import { circuit, addQubit, addStep, updateInitialState } from '../state/circuitState.js';
  export let onRun;
  
  const dispatch = createEventDispatcher();
  
  let alphaRe = 1;
  let alphaIm = 0;
  let betaRe = 0;
  let betaIm = 0;
  let selectedQubit = 0;
  let normalized = {
    alphaNormRe: 1,
    alphaNormIm: 0,
    betaNormRe: 0,
    betaNormIm: 0,
    norm: 1
  };
  
  function handleAddQubit() {
    addQubit();
    dispatch('update');
  }
  
  function handleAddStep() {
    addStep();
    dispatch('update');
  }
  
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  $: if ($circuit.qubits && selectedQubit >= $circuit.qubits.length) {
    selectedQubit = $circuit.qubits.length - 1;
  }

  // Load the selected qubit's initial state into inputs only when selection changes
  function loadSelectedQubit() {
    const c = get(circuit);
    if (!c || !c.qubits || c.qubits.length === 0) return;
    const idx = Number(selectedQubit) || 0;
    const s = c.qubits[idx]?.initialState;
    if (s) {
      alphaRe = s.alpha.re;
      alphaIm = s.alpha.im;
      betaRe = s.beta.re;
      betaIm = s.beta.im;
    }
  }

  onMount(() => {
    loadSelectedQubit();
  });
  
  // Auto-constrain inputs to 0-1 range
  $: if (alphaRe < 0) alphaRe = 0;
  $: if (alphaRe > 1) alphaRe = 1;
  $: if (betaRe < 0) betaRe = 0;
  $: if (betaRe > 1) betaRe = 1;
  $: if (alphaIm < 0) alphaIm = 0;
  $: if (alphaIm > 1) alphaIm = 1;
  $: if (betaIm < 0) betaIm = 0;
  $: if (betaIm > 1) betaIm = 1;
  
  // Auto-adjust: ensure alphaRe + betaRe = 1 (simplified constraint)
  // When alphaRe changes, adjust betaRe
  $: {
    const sum = alphaRe + betaRe;
    if (Math.abs(sum - 1) > 0.01) {
      betaRe = Math.max(0, Math.min(1, 1 - alphaRe));
    }
  }
  
  function getNormalizedAmplitudes() {
    const alphaMagnitudeSq = alphaRe * alphaRe + alphaIm * alphaIm;
    const betaMagnitudeSq = betaRe * betaRe + betaIm * betaIm;
    const normSq = alphaMagnitudeSq + betaMagnitudeSq;
    
    if (normSq === 0) {
      return {
        alphaNormRe: 1,
        alphaNormIm: 0,
        betaNormRe: 0,
        betaNormIm: 0,
        norm: 1
      };
    }
    
    const norm = Math.sqrt(normSq);
    return {
      alphaNormRe: alphaRe / norm,
      alphaNormIm: alphaIm / norm,
      betaNormRe: betaRe / norm,
      betaNormIm: betaIm / norm,
      norm
    };
  }
  
  function handleUpdateState() {
    const normalized = getNormalizedAmplitudes();
    console.log('Updating state to:', normalized);
    updateInitialState(Number(selectedQubit), 
      { re: normalized.alphaNormRe, im: normalized.alphaNormIm }, 
      { re: normalized.betaNormRe, im: normalized.betaNormIm }
    );
    dispatch('update');
  }
  
  $: normalized = getNormalizedAmplitudes();
  
  // Display normalized values from the store for the selected qubit (showcase)
  $: displayedNormalized = (() => {
    if ($circuit && $circuit.qubits && $circuit.qubits.length > 0) {
      const idx = Number(selectedQubit) || 0;
      const s = $circuit.qubits[idx]?.initialState;
      if (s) {
        const ar = s.alpha.re;
        const ai = s.alpha.im;
        const br = s.beta.re;
        const bi = s.beta.im;
        const normSq = ar*ar + ai*ai + br*br + bi*bi;
        const norm = normSq === 0 ? 1 : Math.sqrt(normSq);
        return {
          alphaNormRe: ar / norm,
          alphaNormIm: ai / norm,
          betaNormRe: br / norm,
          betaNormIm: bi / norm,
          norm
        };
      }
    }
    return normalized;
  })();
</script>

<div class="controls">
  <div class="control-section">
    <h3>Circuit Controls</h3>
    <button on:click={onRun}>Check state</button>
    <button on:click={handleAddQubit}>Add Qubit</button>
    <button on:click={handleAddStep}>Add Step</button>
  </div>
  
  <div class="control-section">
    <h3>Initial State (α and β)</h3>
    <label>
      Qubit: 
      <select bind:value={selectedQubit} on:change={loadSelectedQubit}>
        {#each $circuit.qubits as qubit, i}
          <option value={i}>{qubit.id}</option>
        {/each}
      </select>
    </label>
    
    <div class="state-inputs">
      <div class="input-group">
        <label>α real: <input type="number" min="0" max="1" step="0.01" bind:value={alphaRe} /></label>
        <label>α imag: <input type="number" min="0" max="1" step="0.01" bind:value={alphaIm} /></label>
      </div>
      
      <div class="input-group">
        <label>β real: <input type="number" min="0" max="1" step="0.01" bind:value={betaRe} disabled /></label>
        <label>β imag: <input type="number" min="0" max="1" step="0.01" bind:value={betaIm} /></label>
      </div>
    </div>
    
    <div class="normalized-display">
    <!---  HERE--->
      <h4>Normalized Values (α² + β² = 1)</h4>
      <div class="norm-values">
        <div>
          <strong>α:</strong> {displayedNormalized.alphaNormRe.toFixed(4)} {displayedNormalized.alphaNormIm >= 0 ? '+' : ''}{displayedNormalized.alphaNormIm.toFixed(4)}i
        </div>
        <div>
          <strong>β:</strong> {displayedNormalized.betaNormRe.toFixed(4)} {displayedNormalized.betaNormIm >= 0 ? '+' : ''}{displayedNormalized.betaNormIm.toFixed(4)}i
        </div>
        <div style="margin-top: 0.3rem; font-size: 0.75rem; color: #999;">
          (Norm: {displayedNormalized.norm.toFixed(4)})
        </div>
      </div>
    </div>
    
    <button on:click={handleUpdateState}>Update State</button>
  </div>
</div>

<style>
  .controls {
    display: flex;
    gap: 2rem;
    padding: 1rem;
    background: #1a1a1a;
    border-bottom: 1px solid #444;
    flex-wrap: wrap;
  }
  
  .control-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .control-section h3 {
    margin: 0 0 0.5rem 0;
    color: #fff;
    font-size: 0.9rem;
  }
  
  .state-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .input-group {
    display: flex;
    gap: 0.5rem;
  }
  
  .normalized-display {
    background: #252525;
    border: 1px solid #1a5a99;
    border-radius: 4px;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
  
  .normalized-display h4 {
    margin: 0 0 0.3rem 0;
    color: #1a9bff;
    font-size: 0.8rem;
  }
  
  .norm-values {
    font-family: monospace;
    font-size: 0.8rem;
    color: #aaa;
  }
  
  .norm-values div {
    line-height: 1.4;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
  }
  
  input, select {
    padding: 0.3rem 0.5rem;
    background: #2a2a2a;
    color: #fff;
    border: 1px solid #444;
    border-radius: 4px;
    font-size: 0.85rem;
  }
  
  button {
    padding: 0.4rem 0.8rem;
    background: #1a5a99;
    color: #fff;
    border: 1px solid #1a5a99;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
  }
  
  button:hover {
    background: #1e6db5;
  }
</style>
