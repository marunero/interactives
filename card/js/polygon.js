import {Point} from "./point.js";

export class Polygon {
    constructor(x, y, r, n) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.n = n;
        this.point = [];
        this.angle = 180;
        this.center = 0;
        this.spinRatio = 10;
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
        this.angle += t / this.spinRatio;
        this.center += t / this.spinRatio;
        if (this.angle > 360) {
            this.angle -= 360;
        }
        else if (this.angle < 0) {
            this.angle += 360;
        }
        
        if (this.center > 180 / this.n) {
            this.center -= 360 / this.n;
        }
        else if (this.center < (-1) * 180 / this.n) {
            this.center += 360 / this.n;
        }

        for (let i = 0; i < this.n; i++) {
            this.point[i].x = this.x + this.r * Math.cos(Math.PI / 180 * this.angle + 2 * i * Math.PI / this.n);
            this.point[i].y = this.y + this.r * Math.sin(Math.PI / 180 * this.angle + 2 * i * Math.PI / this.n);
        }
    }

    align() {
        this.angle -= this.center * 0.1;
        this.center *= 0.9;
    }

    draw(ctx) {        
        const r = 200;
        for (let i = 0; i < this.n; i++ ){
            if (i == 0){
                ctx.fillStyle = 'black';
            }
            else{
                ctx.fillStyle = "hsl(" + 360 * i / this.n + ", 100%, 70%";
            }
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