export class Particle {
    constructor(x, y, vX, vY) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.g = 0.1;
    }

    update() {
        this.x += this.vX;
        this.y += this.vY;
        this.y += this.g;
    }
}