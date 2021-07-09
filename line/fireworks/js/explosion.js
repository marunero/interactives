import { Particle } from "./particle.js";

export class Explosion {
    constructor(sX, sY, v, n, hue, brightness, alpha, decay, fireL) {
        this.sX = sX;
        this.sY = sY;
        this.v = v;
        this.n = n;
        this.particle = [];
        this.angle = Math.PI * 2 / n;
        this.hue = hue;
        this.brightness = brightness;
        this.alpha = alpha;
        this.decay = decay;
        this.fireL = fireL;
    }

    init() {
        for (let i = 0; i < this.n; i++) {
            const particle = new Particle(this.sX, this.sY, this.v * Math.cos(this.angle * i), this.v * Math.sin(this.angle * i), this.fireL);
            this.particle[i] = particle;
        }
    }

    update() {
        for (let i = 0; i < this.n; i++) {
            this.particle[i].update();
        this.alpha -= this.decay;
        }
    }
}