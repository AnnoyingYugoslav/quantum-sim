<script>
  import QubitLine from './QubitLine.svelte';
  export let circuit;
  export let results;
</script>

<div class="circuit">
  {#each circuit.qubits as qubit, qubitIndex}
    <QubitLine
      {qubit}
      {qubitIndex}
      steps={circuit.stepCount}
      result={results?.[qubitIndex]}
    />
  {/each}
</div>

<style>
  .circuit {
    overflow: auto;
    max-height: 70vh;
    border: 1px solid #555;
    background: #1a1a1a;
    padding: 1rem 0;
  }
</style>
