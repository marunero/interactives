export class Dust {
    constructor(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init() {
        this.x = this.stageWidth / 4 + Math.random() * this.stageWidth / 2;
        this.y = this.stageHeight / 4 + Math.random() * this.stageHeight / 2;
        this.seta = Math.random() * 360;
        this.v = 0.4;
        this.r = 1 + Math.random() * 1;
        this.delta = this.r * 2;
        this.vx = this.v * Math.cos(this.seta * Math.PI / 180);
        this.vy = this.v * Math.sin(this.seta * Math.PI / 180);
    }

    reset() {
        this.x = this.delta * (-1);
        this.y = this.delta * (-1);

        let k = Math.random() * 4;
        if (k <= 1) {
            this.x = Math.random() * this.stageWidth;
        }
        else if (k <= 2) {
            this.x = this.stageWidth + this.delta;
            this.y = Math.random() * this.stageHeight;
        }
        else if (k <= 3) {
            this.x = Math.random() * this.stageWidth;
            this.y = this.stageHeight + this.delta;
        }
        else{
            this.y = Math.random() * this.stageHeight;
        }

        let centerX = this.stageWidth / 4 + Math.random() * this.stageWidth / 2;
        let centerY = this.stageHeight / 4 + Math.random() * this.stageHeight / 2;

        this.seta = Math.atan((centerY - this.y) / (centerX - this.x));
        this.vx = this.v * Math.cos(this.seta * Math.PI / 180);
        this.vy = this.v * Math.sin(this.seta * Math.PI / 180);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < (-1) * this.delta || this.x > this.stageWidth + this.delta || this.y < (-1) * this.delta || this.y > this.stageHeight + this.delta) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.moveTo(this.x + this.r, this.y);
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}