import {Square} from "./square.js";

export class Grid {
    constructor(stageWidth, stageHeight, nx, ny) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.nx = nx;
        this.ny = ny;
        
        this.square = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init() {
        for (let i = 0; i < this.nx; i ++ ) {
            for (let j = 0; j < this.ny; j ++) {
                let color = 'hsl(' + 360 / (this.nx * this.ny) * (i * this.ny + j) + ', 100%, 60%)';

                const s = new Square(this.stageWidth / this.nx * i + this.stageWidth / (2 * this.nx), this.stageHeight / this.ny * j + this.stageHeight / (2 * this.ny), this.stageWidth / this.nx, this.stageHeight / this.ny, color, this.stageWidth, this.stageHeight);
                s.init();
                this.square[i * this.ny + j] = s;
            }
        }
    }

    draw(ctx) {
        let expandi = -1;
        let overi = -1;
        for (let i = 0; i < this.nx; i ++) {
            for (let j = 0; j < this.ny; j ++) {
                if (this.square[i * this.ny + j].expand == true) {
                    expandi = i * this.ny + j;
                }
                if (this.square[i * this.ny + j].overZ == true) {
                    overi = i * this.ny + j;
                }
            }
        }

        for (let i = 0; i < this.nx; i ++) {
            for (let j = 0; j < this.ny; j ++) {
                if (expandi != i * this.ny + j || overi != i * this.ny + j) {
                    this.square[i * this.ny + j].draw(ctx);
                }
            }
        }

        if (expandi != -1) {
            this.square[expandi].draw(ctx);
        }
        if (overi != -1) {
            this.square[overi].draw(ctx);
        }
    }
}