import { Building } from "./building.js";

export class City {
    constructor(n, stageWidth, stageHeight) {
        this.n = n;
        this.building = [];
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init() {
        for (let i = 0; i < this.n; i++){
            const r = Math.random() * 25;
            const c = 'rgb(' + r + ',' + r + ',' + r + ')';
            
            const building = new Building(Math.random() * this.stageWidth, this.stageHeight, Math.random() * (this.stageWidth / 80) + (this.stageWidth / 60), Math.random() * (this.stageHeight / 10) + (this.stageHeight / 20), c);
            this.building[i] = building;
        }
    }

    draw(ctx){
        for (let i = 0; i < this.n; i++){
            ctx.fillStyle = this.building[i].color;
            const b = this.building[i];
            ctx.fillRect(b.x - b.width, b.y - b.height, b.width, b.height);
        }
    }
}