import { Grid } from "./grid.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        this.Grid = new Grid(document.body.clientWidth, document.body.clientHeight, 5, 4);
        this.fullScreen = false;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerdown', this.onDown.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.Grid.resize(this.stageWidth, this.stageHeight);
        this.fullScreen = false;
        this.fullIndex = 0;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.Grid.draw(this.ctx);
        
        requestAnimationFrame(this.animate.bind(this));
        
    }

    onDown(e) {
        if (this.fullScreen == false){
            this.fullScreen = true;
            for (let i = 0; i < this.Grid.nx; i++) {
                for (let j = 0; j < this.Grid.ny; j ++) {
                    const s = this.Grid.square[i * this.Grid.ny + j];
                    
                    if (s.x - s.initW / 2 < e.clientX && s.x + s.initW / 2 > e.clientX) {
                        if (s.y - s.initH / 2 < e.clientY && s.y + s.initH / 2 > e.clientY) {
                            this.Grid.square[i * this.Grid.ny + j].full = true;
                            this.Grid.square[i * this.Grid.ny + j].expand = true;
                            this.Grid.square[i * this.Grid.ny + j].overZ = true;
                            this.fullIndex = i * this.Grid.ny + j;
                        }
                    }
                }
            }
        }
        else{
            this.fullScreen = false;
            this.Grid.square[this.fullIndex].full = false;
            this.Grid.square[this.fullIndex].expand = false;
        }
    }
    onUp(e) {

    }
    onMove(e) {
        if (this.fullScreen == false) {
            for (let i = 0; i < this.Grid.nx; i++) {
                for (let j = 0; j < this.Grid.ny; j ++) {
                    const s = this.Grid.square[i * this.Grid.ny + j];
                    
                    if (s.x - s.initW / 2 < e.clientX && s.x + s.initW / 2 > e.clientX) {
                        if (s.y - s.initH / 2 < e.clientY && s.y + s.initH / 2 > e.clientY) {
                            this.Grid.square[i * this.Grid.ny + j].expand = true;
                        }
                        else{
                            this.Grid.square[i * this.Grid.ny + j].expand = false;
                        }
                    }
                    else{
                        this.Grid.square[i * this.Grid.ny + j].expand = false;
                    }
                }
            }
        }
    }
}

window.onload = () => {
    new App();
}