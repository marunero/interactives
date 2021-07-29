import {Point} from './point.js'

export class Square {
    constructor(x, y, width, height, color, stageWidth, stageHeight) {
        this.x = x;
        this.y = y;
        this.initX = x;
        this.initY = y;

        this.width = width;
        this.height = height;
        this.initW = width;
        this.initH = height;
        this.dWidth = 0;
        this.dHeight = 0;
        this.ratio = 1.3;
        this.v = 1.1;

        this.expand = false;
        this.full = false;
        this.overZ = false;

        this.color = color;
        this.point = [];

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    init() {
        this.point = [];
        for (let i = 0; i < 4; i ++) {
            let a = 1;
            let b = 1;
            if (i == 1) {
                a = -1;
            }
            else if (i == 2) {
                a = -1;
                b = -1;
            }
            else if (i == 3) {
                b = -1;
            }
            const p = new Point(this.x + a * this.width / 2, this.y + b * this.height / 2);
            this.point[i] = p;
        }
    }


    draw(ctx) {
        if (this.full == true) {
            this.overZ = true;
            if (this.width * this.v < this.stageWidth) {
                this.width *= this.v;
                // TODO this.x = 
            }
            else{
                this.width = this.stageWidth;
                this.x = this.stageWidth / 2;
            }

            if (this.height * this.v < this.stageHeight) {
                this.height *= this.v;
                // TODO this.y = 
            }
            else{
                this.height = this.stageHeight;
                this.y = this.stageHeight / 2;
            }
        }
        else{
            if (this.expand == false) {
                if (this.width / this.v > this.initW){
                    this.width /= this.v;
                    // TODO this.x = 
                }
                else{;
                    this.width = this.initW;
                    this.overZ = false;
                    this.x = this.initX;
                }
    
                if (this.height / this.v > this.initH) {
                    this.height /= this.v;
                    // TODO this.y = 
                }
                else{
                    this.height = this.initH;
                    this.overZ = false;
                    this.y = this.initY;
                }
            }
            else{
                if (this.width * this.v < this.ratio * this.initW) {
                    this.width *= this.v;
                }
                else{
                    this.width = this.ratio * this.initW;
                }
    
                if (this.height * this.v < this.ratio * this.initH) {
                    this.height *= this.v;
                }
                else{
                    this.height = this.ratio * this.initH;
                }
            }
        }

        for (let i = 0; i < 4; i ++) {
            let a = 1;
            let b = 1;
            if (i == 1) {
                a = -1;
            }
            else if (i == 2) {
                a = -1;
                b = -1;
            }
            else if (i == 3) {
                b = -1;
            }
            this.point[i].x = this.x + a * this.width / 2;
            this.point[i].y = this.y + b * this.height / 2;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.point[0].x, this.point[0].y);
        for (let i = 1; i < 4; i ++) {
            ctx.lineTo(this.point[i].x, this.point[i].y);
        }
        ctx.lineTo(this.point[0].x, this.point[0].y);
        ctx.strokeStyle = 'black';
        //ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}