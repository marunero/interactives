import { Dust } from './dust.js';

export class DustGroup {
    constructor(n, stageWidth, stageHeight) {
        this.dust = [];
        this.dustN = n;
        
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init() {
        for (let i = 0; i < this.dustN; i ++) {
            const dust = new Dust(this.stageWidth, this.stageHeight);
            dust.init();
            this.dust[i] = dust;
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.dustN; i ++) {
            this.dust[i].update();
            this.dust[i].draw(ctx);
        }
    }
}