export class Fireworks {
    constructor(startX, startY, targetX, targetY, vX, vY, l) {
        this.x = startX;
        this.y = startY;
        this.vX = vX;
        this.vY = vY;
        this.startX = startX;
        this.startY = startY;

        this.targetX = targetX;
        this.targetY = targetY;

        this.l = l;
    }

    update() {
        this.x += this.vX;
        this.y += this.vY;
    }
}