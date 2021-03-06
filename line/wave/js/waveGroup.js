import { Wave } from './wave.js';

export class WaveGroup {
    constructor() {
        this.wave = [];
        this.waveN = 0;
    }

    resize(stageWidth, stageHeight) {
        this.wave = [];
        this.waveN = 0;
    }

    addWave(x, y) {
        const wave = new Wave(x, y);
        this.wave[this.waveN] = wave;
        this.waveN += 1;
    }

    addDustWave(x, y) {
        const wave = new Wave(x, y);
        wave.v /= 2;
        wave.lightness += 20;
        this.wave[this.waveN] = wave;
        this.waveN += 1;
    }

    draw(ctx) {
        for (let i = 0; i < this.waveN; i ++) {
            this.wave[i].update();

            if (this.wave[i].lightness > 99) {
                this.wave.splice(i, 1);
                this.waveN -= 1;
                i -= 1;
            } 
            else{
                let w = this.wave[i];
    
                ctx.beginPath();
                ctx.strokeStyle = "hsl(" + w.color + ", 69%, " + w.lightness + "%)";
                ctx.lineWidth = 1;
                ctx.lineCap = 'round';
                ctx.moveTo(w.x + w.r, w.y);
                ctx.arc(w.x, w.y, w.r, 0, 2 * Math.PI, false);
                ctx.stroke();
            }
        }
    }
}