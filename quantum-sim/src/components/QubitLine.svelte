<script>
  import StepCell from './StepCell.svelte';
  export let qubit;
  export let qubitIndex;
  export let steps;
  export let result;
</script>

<div class="line">
  <div class="label">{qubit.id}</div>

  {#each Array(steps) as _, stepIndex}
    <StepCell
      step={qubit.steps[stepIndex]}
      state={result?.history?.[stepIndex]}
      {qubitIndex}
      {stepIndex}
    />
  {/each}
</div>

<style>
  .line {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #333;
  }
  .label {
    width: 60px;
    font-weight: bold;
    color: #fff;
    padding-right: 0.5rem;
  }
</style>
