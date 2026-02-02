import { writable, get } from 'svelte/store';

const initialCircuit = {
    qubits: [
        {
        id: 'q0',
        initialState: {
            alpha: { re: 1, im: 0 },
            beta: { re: 0, im: 0 }
        },
        steps: [
            { gate: null },
            { gate: null },
            { gate: null },
            { gate: null },
            { gate: null }
        ]
        }
    ],
    stepCount: 5
};

export const circuit = writable(initialCircuit);

export function addQubit() {
    circuit.update(c => {
        const newId = `q${c.qubits.length}`;
        c.qubits.push({
            id: newId,
            initialState: {
                alpha: { re: 1, im: 0 },
                beta: { re: 0, im: 0 }
            },
            steps: Array(c.stepCount).fill(null).map(() => ({ gate: null }))
        });
        return c;
    });
    return get(circuit);
}

export function addStep() {
    circuit.update(c => {
        c.stepCount++;
        c.qubits.forEach(qubit => {
            qubit.steps.push({ gate: null });
        });
        return c;
    });
    return get(circuit);
}

export function updateInitialState(qubitIndex, alpha, beta) {
    circuit.update(c => {
        if (qubitIndex < c.qubits.length) {
            c.qubits[qubitIndex].initialState = { alpha, beta };
        }
        return c;
    });
    return get(circuit);
}

export function updateGate(qubitIndex, stepIndex, gate) {
    circuit.update(c => {
        if (qubitIndex < c.qubits.length && stepIndex < c.qubits[qubitIndex].steps.length) {
            c.qubits[qubitIndex].steps[stepIndex].gate = gate;
        }
        return c;
    });
    return get(circuit);
}
