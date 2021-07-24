import {Point} from "./point.js";

export class Polygon {
    constructor(x, y, r, n) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.n = n;
        this.point = [];
        this.angle = 0;
    }

    resize(x, y, r, n) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.n = n;
        this.point = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.n; i++) {
            const t = new Point(this.x + this.r * Math.cos(2 * i * (Math.PI) / (this.n)), this.y + this.r * Math.sin(2 * i * Math.PI / this.n));
            this.point[i] = t;
        }
    }

    spin(t) {
        this.angle += t / 5;
        
        for (let i = 0; i < this.n; i++) {
            this.point[i].x = this.x + this.r * Math.cos(Math.PI / 180 * this.angle + 2 * i * Math.PI / this.n);
            this.point[i].y = this.y + this.r * Math.sin(Math.PI / 180 * this.angle + 2 * i * Math.PI / this.n);
        }
    }

    draw(ctx) {        
        const r = 200;
        for (let i = 0; i < this.n; i++ ){
            ctx.fillStyle = "hsl(" + 360 * i / this.n + ", 100%, 70%";
            ctx.beginPath();
            ctx.moveTo(this.point[i].x + r * Math.cos(Math.PI / 180 * (45 + this.angle) + 2 * i * Math.PI / this.n), this.point[i].y + r * Math.sin(Math.PI / 180 * (45 + this.angle) + 2 * i * Math.PI / this.n));
            for (let j = 1; j < 4; j++ ) {
                ctx.lineTo(this.point[i].x + r * Math.cos(Math.PI / 180 * (45 + this.angle + 90 * j) + 2 * i * Math.PI / this.n), this.point[i].y + r * Math.sin(Math.PI / 180 * (45 + this.angle + j * 90) + 2 * i * Math.PI / this.n));
            }
            ctx.fill();
            ctx.closePath();
        }
    }
}