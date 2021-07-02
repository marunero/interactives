export class WaterLine {
    constructor(x, y, l, vx, vy, stageWidth, stageHeight) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.vx = vx;
        this.vy = vy;
        this.initVy = vy;

        this.stagewidth = stageWidth;
        this.stageheight = stageHeight;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.11;
        if (this.x > this.stagewidth || this.y > this.stageheight){
            this.x = Math.random() * this.stagewidth;
            this.y = -10;
            this.vy = this.initVy;
        }
    }

    umbUpdate(x, y, radius) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.11;
    }
}