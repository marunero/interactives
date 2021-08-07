import { WaveGroup } from "./waveGroup.js";
import { DustGroup } from "./dustGroup.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        this.WaveGroup = new WaveGroup();

        this.dustN = 2;
        this.DustGroup = new DustGroup(this.dustN, document.body.clientWidth, document.body.clientHeight);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.fps = 10;
        this.f = 0;
        this.lps = 60;
        this.l = [];
        for (let i = 0; i < this.dustN; i ++) {
            this.l[i] = Math.random() * this.lps;
        }
        

        document.addEventListener('pointermove', this.onMove.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
        this.WaveGroup.resize(this.stageWidth, this.stageHeight);
        this.DustGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.f += 1;
        for (let i = 0; i < this.dustN; i++) {
            this.l[i] += 1;
            if (this.l[i] >= this.lps) {
                this.l[i] = 0;
                this.WaveGroup.addDustWave(this.DustGroup.dust[i].x, this.DustGroup.dust[i].y);
            }
        }
        
        this.DustGroup.draw(this.ctx);
        
        this.WaveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }

    onMove(e) {
        if (this.f >= this.fps) {
            this.f = 0;
            this.WaveGroup.addWave(e.clientX, e.clientY);
        }
    }
}

window.onload = () => {
    new App();
}