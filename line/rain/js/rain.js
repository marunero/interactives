import { Umbrella } from './umbrella.js';
import {WaterLine} from './waterline.js';

export class Rain {
    constructor(waterlineN) {
        this.waterlineN = waterlineN;
        this.waterlines = [];

        this.leftTime = 0;
        this.timeSpeed = 1;
        this.umbLeftWaterN = 0;
        this.umbLeftWater = [];

        this.rightTime = 0;
        this.umbRightWaterN = 0;
        this.umbRightWater = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.waterlineN = stageWidth * stageHeight / 1000 > 1000 ? stageWidth * stageHeight / 1000 : 1000;
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
        ctx.strokeStyle = 'rgba(199, 215, 235, 0.7)';
        ctx.lineWidth = 0.5;
        ctx.lineCap = 'round';

        for (let i = 0; i < this.waterlineN; i++){
            this.waterlines[i].update();
            
            let wl = this.waterlines[i];
            
            // if wl_lineTo point is in umbrella, slice it
            if (wl.y + wl.l * wl.vy <= y && Math.pow(wl.x + wl.l * wl.vx - x, 2) + Math.pow(wl.y + wl.l * wl.vy - y, 2) <= Math.pow(radius, 2)){
                // if all of waterline is in umbrella
                if (Math.sqrt(Math.pow(wl.x - x, 2) + Math.pow(wl.y - y, 2)) <= radius){
                    wl.l = 0;
                }
                else{
                    wl.l = (Math.sqrt(Math.pow(wl.x - x, 2) + Math.pow(wl.y - y, 2)) - radius) / Math.sqrt(Math.pow(wl.vx, 2) + Math.pow(wl.vy, 2));
                }
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
            this.umbLeftWater[i].umbUpdate();     

            let wl = this.umbLeftWater[i];

            if (wl.y >= this.stageHeight || wl.x <= 0 || wl.x >= this.stageWidth){
                this.umbLeftWater.splice(i, 1);
                this.umbLeftWaterN -= 1;
                i -= 1;
            }
            else{
                // if wl_lineTo point is in umbrella, slice it
                if (wl.y + wl.l * wl.vy <= y && Math.pow(wl.x + wl.l * wl.vx - x, 2) + Math.pow(wl.y + wl.l * wl.vy - y, 2) <= Math.pow(radius, 2)){
                    // if all of waterline is in umbrella
                    if (Math.sqrt(Math.pow(wl.x - x, 2) + Math.pow(wl.y - y, 2)) <= radius){
                        wl.l = 0;
                    }
                    else{
                        wl.l = (Math.sqrt(Math.pow(wl.x - x, 2) + Math.pow(wl.y - y, 2)) - radius) / Math.sqrt(Math.pow(wl.vx, 2) + Math.pow(wl.vy, 2));
                    }
                    if (wl.l <= 0.1){
                        this.umbLeftWater.splice(i, 1);
                        this.umbLeftWaterN -= 1;
                    }
                }

                ctx.beginPath();
                ctx.moveTo(wl.x, wl.y);
                ctx.lineTo(wl.x + wl.l * wl.vx, wl.y + wl.l * wl.vy);
                ctx.stroke();
            }
        }

        for (let i = 0; i < this.umbRightWaterN; i++){
            this.umbRightWater[i].umbUpdate();            
            let wl = this.umbRightWater[i];

            if (wl.y >= this.stageHeight || wl.x <= 0 || wl.x >= this.stageWidth){
                this.umbRightWater.splice(i, 1);
                this.umbRightWaterN -= 1;
                i -= 1;
            }

            else{
                // if wl_lineTo point is in umbrella, slice it
                if (wl.y + wl.l * wl.vy <= y && Math.pow(wl.x + wl.l * wl.vx - x, 2) + Math.pow(wl.y + wl.l * wl.vy - y, 2) <= Math.pow(radius, 2)){
                    // if all of waterline is in umbrella
                    if (Math.sqrt(Math.pow(wl.x - x, 2) + Math.pow(wl.y - y, 2)) <= radius){
                        wl.l = 0;
                    }
                    else{
                        wl.l = (Math.sqrt(Math.pow(wl.x - x, 2) + Math.pow(wl.y - y, 2)) - radius) / Math.sqrt(Math.pow(wl.vx, 2) + Math.pow(wl.vy, 2));
                    }
                    if (wl.l <= 0.1){
                        this.umbRightWater.splice(i, 1);
                        this.umbRightWaterN -= 1;
                    }
                }

                ctx.beginPath();
                ctx.moveTo(wl.x, wl.y);
                ctx.lineTo(wl.x + wl.l * wl.vx, wl.y + wl.l * wl.vy);
                ctx.stroke();
            }            
        }

        this.leftTime -= this.timeSpeed;
        this.rightTime -= this.timeSpeed;
        // make waterlines for each sides of umbrella with random period
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
        }
    }
}