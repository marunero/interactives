import { Umbrella } from './umbrella.js';
import {WaterLine} from './waterline.js';

export class Rain {
    constructor(waterlineN) {
        this.waterlineN = waterlineN;
        this.waterlines = [];

        this.leftTime = 0;
        this.timeSpeed = 1;
        this.umbLeftWaterN = 0;
        this.umbLeftTotalN = 0;
        this.umbLeftWater = [];

        this.rightTime = 0;
        this.umbRightWaterN = 0;
        this.umbRightTotalN = 0;
        this.umbRightWater = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.waterlineN = stageWidth * stageHeight / 1500;
        this.init();
    }

    init() {
        for (let i = 0; i < this.waterlineN; i++){
            const waterline = new WaterLine(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * 3,
                -1 + Math.random() * 2,
                Math.random() * 5 + 5,
                this.stageWidth,
                this.stageHeight,
            );
            this.waterlines[i] = waterline;
        }
    }

    draw(ctx, x, y, radius) {
        ctx.strokeStyle = 'rgba(199, 215, 235, 1)';
        ctx.lineWidth = 0.5;
        ctx.lineCap = 'round';

        for (let i = 0; i < this.waterlineN; i++){
            this.waterlines[i].update();
            
            let wl = this.waterlines[i];
            
            // if wl_lineTo point is in umbrella, reset it
            if (wl.y + wl.l * wl.vy <= y && Math.pow(wl.x + wl.l * wl.vx - x, 2) + Math.pow(wl.y + wl.l * wl.vy - y, 2) <= Math.pow(radius, 2)){
                wl.l = (Math.sqrt(Math.pow(wl.x - x, 2) + Math.pow(wl.y - y, 2)) - radius) / Math.sqrt(Math.pow(wl.vx, 2) + Math.pow(wl.vy, 2));
                if (wl.l <= 0.1){
                    wl.x = Math.random() * this.stagewidth;
                    wl.y = -20;
                    wl.l = Math.random() * 2;
                }
            }

            ctx.beginPath();
            ctx.moveTo(wl.x, wl.y);
            ctx.lineTo(wl.x + wl.l * wl.vx, wl.y + wl.l * wl.vy);
            ctx.stroke();
        }
        
        ctx.lineWidth = 1.5;

        for (let i = 0; i < this.umbLeftWaterN; i++){
            this.umbLeftWater[i].umbUpdate(x, y, radius);            
            
            let wl = this.umbLeftWater[i]

            ctx.beginPath();
            ctx.moveTo(wl.x, wl.y);
            ctx.lineTo(wl.x + wl.l * wl.vx, wl.y + wl.l * wl.vy);
            ctx.stroke();
        }

        for (let i = 0; i < this.umbRightWaterN; i++){
            this.umbRightWater[i].umbUpdate(x, y, radius);            
            
            let wl = this.umbRightWater[i]

            ctx.beginPath();
            ctx.moveTo(wl.x, wl.y);
            ctx.lineTo(wl.x + wl.l * wl.vx, wl.y + wl.l * wl.vy);
            ctx.stroke();
        }

        this.leftTime -= this.timeSpeed;
        this.rightTime -= this.timeSpeed;
        
        if (this.leftTime <= 0){
            this.leftTime = 6 + Math.random() * 17;

            const waterline = new WaterLine(
                x - radius,
                y,
                Math.random() * 2,
                0,
                1,
                this.stageWidth,
                this.stageHeight,
            );

            this.umbLeftWater[this.umbLeftWaterN] = waterline;
            this.umbLeftWaterN += 1;
            
            this.umbLeftTotalN += 1;
        }

        if (this.rightTime <= 0){
            this.rightTime = 6 + Math.random() * 17;

            const waterline = new WaterLine(
                x + radius,
                y,
                Math.random() * 2,
                0,
                1,
                this.stageWidth,
                this.stageHeight,
            );

            this.umbRightWater[this.umbRightWaterN] = waterline;
            this.umbRightWaterN += 1;
            
            this.umbRightTotalN += 1;
        }

        if (this.umbLeftWaterN >= 1){
            if (this.umbLeftWater[0].y > this.stageHeight){
                let t = this.umbLeftWater.shift();

                this.umbLeftWaterN -= 1;
            }
        }
        if (this.umbRightWaterN >= 1){
            if (this.umbRightWater[0].y > this.stageHeight){
                let t = this.umbRightWater.shift();

                this.umbRightWaterN -= 1;
            }
        }
    }
}