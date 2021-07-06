import { Fireworks } from "./fireworks.js";

export class Sky {
    constructor() {
        this.fireworksN = 0;
        this.fireworks = [];
        this.fireLength = 6;
        this.firevX = 0;
        this.firevY = 4;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.fireworksN = 0;
    }

    addFireworks(targetX, targetY) {
        const fireworks = new Fireworks(targetX, this.stageHeight + this.fireLength * this.firevY, targetX, targetY, this.firevX, (-1) * this.firevY, this.fireLength);
        this.fireworks[this.fireworksN] = fireworks;
        this.fireworksN += 1;
    }

    draw(ctx) {
        ctx.strokeStyle = 'rgba(199, 215, 235, 1)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        for (let i = 0; i < this.fireworksN; i++){
            this.fireworks[i].update();
            let fw = this.fireworks[i];

            if (fw.y + fw.l * fw.vY <= fw.targetY) {
                this.fireworks.splice(i, 1);
                this.fireworksN -= 1;
                i -= 1;
            }
            else{
                ctx.beginPath();
                ctx.moveTo(fw.x, fw.y);
                ctx.lineTo(fw.x + fw.l * fw.vX, fw.y + fw.l * fw.vY);
                ctx.stroke();
            }

        }

    }
}