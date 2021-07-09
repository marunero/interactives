export class Particle {
    constructor(x, y, vX, vY, l) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.l = l;
        this.g = 0.01;
    }

    update() {
        this.x += this.vX;
        this.y += this.vY;
        this.vY += this.g;
    }
}