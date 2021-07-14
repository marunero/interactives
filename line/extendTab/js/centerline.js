import { Tab } from "./tab.js";

export class CenterLine {
    constructor(n) {
        this.n = n;
        this.tab = [];
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init() {
        for (let i = 0; i < this.n; i ++){
            const tab = new Tab(this.stageWidth / this.n * i + this.stageWidth / (this.n * 2), this.stageHeight / 2, this.stageWidth / this.n, this.stageHeight / 20);
            this.tab[i] = tab;
        }
    }

    update(x) {
        for (let i = 0; i < this.n; i ++){
            const t = this.tab[i];
            if ((t.centerX - (t.width / 2) <= x) && (t.centerX + (t.width / 2)) >= x){
                this.tab[i].hover = true;
            }
            else{
                this.tab[i].hover = false;
            }
        }
        
    }

    draw(ctx) {

        for (let i = 0; i < this.n; i ++){
            this.tab[i].update(this.stageWidth, this.stageHeight);
            const t = this.tab[i];
            ctx.fillStyle = 'hsla(' + 360 / this.n * i + ', 100%, 67%)';
            ctx.fillRect(t.centerX  - t.width / 2, t.centerY - t.height / 2, t.width, t.height);
        }
    }
}