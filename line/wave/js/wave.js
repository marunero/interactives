export class Wave {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.v = 0.4;

    }

    update() {
        this.r += this.v;
    }
}