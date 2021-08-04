export class Wave {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.v = 0.4;

        this.color = 197;
        this.lightness = 63;
    }

    update() {
        this.r += this.v;
        this.lightness += 0.2;
    }
}