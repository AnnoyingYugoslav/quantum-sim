<script>
  import CircuitView from '../../components/CircuitView.svelte';
  import Controls from '../../components/Controls.svelte';
  import ResultsPanel from '../../components/ResultsPanel.svelte';
  import { circuit } from '../../state/circuitState.js';
  import { simulateCircuit } from '../../sim/simulateCircuit.js';
  import { tick } from 'svelte';

  let results = null;

  async function runSimulation() {
    results = null;
    await tick();

    results = simulateCircuit($circuit);
    console.log(results);
  }
  
  function handleUpdate() {
    // no-op; UI updates when the `circuit` store changes
  }
</script>

<Controls
  onRun={runSimulation}
  on:update={handleUpdate}
/>

<div class="container">
  <CircuitView
    circuit={$circuit}
    {results}
  />
  
  <ResultsPanel {results} circuit={$circuit} />
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  @media (max-width: 1200px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
</style>
