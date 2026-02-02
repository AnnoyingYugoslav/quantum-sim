import { Qubit } from '../lib/qubit.js';
import { Complex } from '../lib/complex.js';
import { Gates } from '../lib/gates.js';

export function simulateCircuit(circuit) {
  return circuit.qubits.map(qubitLine => {
    const initialState = qubitLine.initialState;
    const alpha = new Complex(initialState.alpha.re, initialState.alpha.im);
    const beta = new Complex(initialState.beta.re, initialState.beta.im);
    
    let q = new Qubit(alpha, beta);

    const history = [];

    for (const step of qubitLine.steps) {
      if (step.gate) {
        const gate = typeof Gates[step.gate] === 'function'
          ? Gates[step.gate](step.params)
          : Gates[step.gate];

        q = gate.apply(q).normalize();
      }

      history.push(q);
    }

    return {
      qubitId: qubitLine.id,
      history
    };
  });
}
