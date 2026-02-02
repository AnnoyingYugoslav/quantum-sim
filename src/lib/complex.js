export class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    add(c) {
        return new Complex(this.re + c.re, this.im + c.im);
    }

    sub(c) {
        return new Complex(this.re - c.re, this.im - c.im);
    }

    mul(c) {
        return new Complex(
        this.re * c.re - this.im * c.im,
        this.re * c.im + this.im * c.re
        );
    }

    scale(s) {
        return new Complex(this.re * s, this.im * s);
    }

    conj() {
        return new Complex(this.re, -this.im);
    }

    abs2() {
        return this.re * this.re + this.im * this.im;
    }

    toString(precision = 2) {
        const r = this.re.toFixed(precision);
        const i = this.im.toFixed(precision);
        return `${r}${this.im >= 0 ? '+' : ''}${i}i`;
    }

    static expi(theta) {
        return new Complex(Math.cos(theta), Math.sin(theta));
    }
}