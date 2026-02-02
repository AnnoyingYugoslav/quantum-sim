export class Qubit {
    constructor(alpha, beta) {
        this.alpha = alpha;
        this.beta = beta;
    }

    normalize() {
        const norm = Math.sqrt(
        this.alpha.abs2() + this.beta.abs2()
        );
        this.alpha = this.alpha.scale(1 / norm);
        this.beta = this.beta.scale(1 / norm);
        return this;
    }
}
