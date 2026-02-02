<script>
  export let results;
  export let circuit;
  
  function getMeasurementResult(state) {
    if (!state) return null;
    // Calculate probability of measuring |0⟩ vs |1⟩ using Complex.abs2 when available
    const prob0 = (state.alpha && typeof state.alpha.abs2 === 'function')
      ? state.alpha.abs2()
      : (state.alpha?.re ?? 0) * (state.alpha?.re ?? 0) + (state.alpha?.im ?? 0) * (state.alpha?.im ?? 0);
    const prob1 = (state.beta && typeof state.beta.abs2 === 'function')
      ? state.beta.abs2()
      : (state.beta?.re ?? 0) * (state.beta?.re ?? 0) + (state.beta?.im ?? 0) * (state.beta?.im ?? 0);

    // Guard: normalize tiny floating errors
    const total = prob0 + prob1;
    const p0 = total > 0 ? prob0 / total : 1;

    // Use probability to randomly choose 0 or 1
    return Math.random() < p0 ? 0 : 1;
  }
  
  function generateMeasurements() {
    if (!results || !circuit) return [];
    
    return results.map((result, qubitIdx) => {
      const last = result.history && result.history.length > 0 ? result.history[result.history.length - 1] : null;
      return {
        qubitId: circuit.qubits[qubitIdx].id,
        measurement: getMeasurementResult(last)
      };
    });
  }
</script>

<div class="results-panel">
  <h3>Simulation Results</h3>
  
  {#if results}
    <div class="measurement-section">
      <h4>Final Measurement</h4>
      <div class="measurement-display">
        <div class="qubit-ids">
          {#each generateMeasurements() as m}
            <span class="qubit-label">{m.qubitId}</span>
          {/each}
        </div>
        <div class="qubit-values">
          {#each generateMeasurements() as m}
            <span class="qubit-value">{m.measurement ?? '-'}</span>
          {/each}
        </div>
      </div>
    </div>
  {/if}
  
  {#if !results}
    <p class="no-results">Run simulation to see results</p>
  {:else}
    <div class="results-content">
      {#each results as result, i}
        <div class="result-item">
          <h4>Qubit {i} History</h4>
          {#if result.history}
            <div class="history">
              {#each result.history as state, stepIdx}
                <div class="state-step">
                  <strong>Step {stepIdx}:</strong>
                  {#if state}
                    <div class="state-values">
                      <div>α: {state.alpha?.re?.toFixed(3) || '0'} {state.alpha?.im ? (state.alpha.im >= 0 ? '+' : '') + state.alpha.im.toFixed(3) + 'i' : ''}</div>
                      <div>β: {state.beta?.re?.toFixed(3) || '0'} {state.beta?.im ? (state.beta.im >= 0 ? '+' : '') + state.beta.im.toFixed(3) + 'i' : ''}</div>
                    </div>
                  {:else}
                    <div>No state data</div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .results-panel {
    background: #1a1a1a;
    border: 1px solid #555;
    border-radius: 4px;
    padding: 1rem;
    margin-top: 1rem;
    max-height: 40vh;
    overflow-y: auto;
  }
  
  .results-panel h3 {
    margin: 0 0 1rem 0;
    color: #fff;
    font-size: 1.1rem;
  }
  
  .measurement-section {
    background: #252525;
    border: 2px solid #1a5a99;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .measurement-section h4 {
    margin: 0 0 0.75rem 0;
    color: #1a9bff;
    font-size: 0.95rem;
  }
  
  .measurement-display {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .qubit-ids {
    display: flex;
    gap: 0.5rem;
  }
  
  .qubit-values {
    display: flex;
    gap: 0.5rem;
  }
  
  .qubit-label, .qubit-value {
    flex: 1;
    padding: 0.5rem;
    background: #1a1a1a;
    border: 1px solid #444;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    min-width: 40px;
  }
  
  .qubit-value {
    border: 1px solid #1a5a99;
    background: #0d2840;
  }
  
  .no-results {
    color: #999;
    text-align: center;
    padding: 2rem;
  }
  
  .results-content {
    display: grid;
    gap: 1rem;
  }
  
  .result-item {
    background: #252525;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 0.75rem;
  }
  
  .result-item h4 {
    margin: 0 0 0.5rem 0;
    color: #1a9bff;
    font-size: 0.95rem;
  }
  
  .history {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .state-step {
    background: #1a1a1a;
    padding: 0.5rem;
    border-left: 3px solid #1a5a99;
    border-radius: 2px;
    font-size: 0.85rem;
  }
  
  .state-step strong {
    color: #1a9bff;
  }
  
  .state-values {
    margin-top: 0.3rem;
    margin-left: 1rem;
    font-family: monospace;
    color: #aaa;
  }
  
  .state-values div {
    font-size: 0.8rem;
  }
</style>
