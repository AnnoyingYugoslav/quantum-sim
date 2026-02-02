<script>
  export let state;

  // Bloch vector components
  const x = 2 * (state.alpha.re * state.beta.re + state.alpha.im * state.beta.im);
  const y = 2 * (state.alpha.im * state.beta.re - state.alpha.re * state.beta.im);
  const z = state.alpha.abs2() - state.beta.abs2();
</script>

<div class="bloch">
  <div>XY: {x.toFixed(2)}, {y.toFixed(2)}</div>
  <div>XZ: {x.toFixed(2)}, {z.toFixed(2)}</div>
  <div>YZ: {y.toFixed(2)}, {z.toFixed(2)}</div>
</div>

<style>
  .bloch {
    font-size: 8px;
    opacity: 0.7;
  }
</style>
