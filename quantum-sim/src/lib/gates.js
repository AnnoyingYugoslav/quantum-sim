import { Complex } from './complex.js';
import { Gate } from './gate.js';

const ONE = new Complex(1, 0);
const ZERO = new Complex(0, 0);
const I = new Complex(0, 1);
const MINUS_I = new Complex(0, -1);
const INV_SQRT2 = new Complex(1 / Math.sqrt(2), 0);

export const Gates = {
    X: new Gate(
        ZERO, ONE,
        ONE, ZERO
    ),

    Y: new Gate(
        ZERO, MINUS_I,
        I, ZERO
    ),

    Z: new Gate(
        ONE, ZERO,
        ZERO, ONE.scale(-1)
    ),

    S: new Gate(
        ONE, ZERO,
        ZERO, Complex.expi(Math.PI / 2)
    ),

    T: new Gate(
        ONE, ZERO,
        ZERO, Complex.expi(Math.PI / 4)
    ),

    H: new Gate(
        INV_SQRT2, INV_SQRT2,
        INV_SQRT2, INV_SQRT2.scale(-1)
    ),
};
