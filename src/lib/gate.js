import { Qubit } from './qubit.js';
export class Gate {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    apply(qubit) {
        return new Qubit(
        this.a.mul(qubit.alpha).add(this.b.mul(qubit.beta)),
        this.c.mul(qubit.alpha).add(this.d.mul(qubit.beta))
        );
    }
}
