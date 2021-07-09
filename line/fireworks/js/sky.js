import { Fireworks } from "./fireworks.js";
import { Explosion } from "./explosion.js";

export class Sky {
    constructor() {
        this.fireworksN = 0;
        this.fireworks = [];
        this.explosionN = 0;
        this.explosion = [];
        this.fireLength = 6;
        this.firevX = 0;
        this.firevY = 2;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.fireworksN = 0;
    }

    addFireworks(targetX, targetY) {
        const fireworks = new Fireworks(targetX, this.stageHeight + this.fireLength * this.firevY, targetX, targetY, this.firevX, (-1) * this.firevY * this.stageHeight / (targetY / 1.3 + 250), this.fireLength);
        this.fireworks[this.fireworksN] = fireworks;
        this.fireworksN += 1;
    }

    addExplosion(sX, sY, repeatExplosion) {
        const explosion = new Explosion(sX, sY, Math.random() * 0.5 + 0.8, (Math.random() * 10 + 15), Math.random() * 360, Math.random() * 20 + 50, Math.random() * 10 + 80, Math.random() * 0.01 + 0.02, Math.random() * 2 + 6, repeatExplosion);
        explosion.init();
        this.explosion[this.explosionN] = explosion;
        this.explosionN += 1;
    }

    draw(ctx) {
        ctx.strokeStyle = 'rgba(199, 215, 235, 1)';
        ctx.lineWidth = 0.6;
        ctx.lineCap = 'round';

        for (let i = 0; i < this.fireworksN; i++){
            this.fireworks[i].update();
            let fw = this.fireworks[i];

            if (fw.y + fw.l * fw.vY <= fw.targetY) {
                this.fireworks.splice(i, 1);
                this.fireworksN -= 1;
                i -= 1;

                this.addExplosion(fw.targetX, fw.targetY, 0);
            }
            else{
                ctx.beginPath();
                ctx.moveTo(fw.x, fw.y);
                ctx.lineTo(fw.x + fw.l * fw.vX, fw.y + fw.l * fw.vY);
                ctx.stroke();
            }

        }
        ctx.lineWidth = 2;
        for (let i = 0; i < this.explosionN; i++) {
            this.explosion[i].update();
            let ex = this.explosion[i];

            if (ex.alpha <= 1) {
                this.explosion.splice(i, 1);
                this.explosionN -= 1;
                i -= 1;

                if (ex.repeatExplosion >= 1){
                    ex.repeatExplosion -= 1;
                    for (let j = 0; j < ex.n; j++){
                        this.addExplosion(ex.particle[j].x, ex.particle[j].y, ex.repeatExplosion);
                    }
                }
            }
            else {
                ctx.strokeStyle = 'hsla(' + ex.hue + ', 100%, ' + ex.brightness + '%, ' + ex.alpha + '%)';
                for (let j = 0; j < ex.n; j ++) {
                    let pj = ex.particle[j];
                    ctx.beginPath();
                    ctx.moveTo(pj.x, pj.y);
                    ctx.quadraticCurveTo(pj.x + pj.l * pj.vX, pj.y + pj.l * pj.vY, pj.x + pj.l * pj.vX, pj.y + pj.l * (pj.vY + pj.g));
                    //ctx.lineTo(pj.x + pj.vX, pj.y + pj.vY);
                    ctx.stroke();
                }
            }
        }
    }
}