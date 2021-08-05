export class Wave {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.v = 0.6;

        this.color = 197;
        this.lightness = 53;
    }

    update() {
        this.r += this.v;
        this.lightness += 0.2;
    }
}