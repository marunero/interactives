import { Umbrella } from './umbrella.js';
import {WaterLine} from './waterline.js';

export class Rain {
    constructor(totalN) {
        this.totalN = totalN;
        this.waterlines = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.init();
    }

    init() {
        for (let i = 0; i < this.totalN; i++){
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
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        for (let i = 0; i < this.totalN; i++){
            this.waterlines[i].update();
            
            let wl = this.waterlines[i];
            
            // if (wl_lineTo_point in Umbrella) {
            //     wl.l -= 1;
            //     if (wl.l <= 0.1){
            //         reset(wl);
            //     }
            // }

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
    }
}