import { Sky } from "./sky.js";
import { Pointer } from "./pointer.js";
import { City } from "./city.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.sky = new Sky();
        this.city = new City(50, document.body.clientWidth, document.body.clientHeight);

        this.time = 0;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.sky.resize(this.stageWidth, this.stageHeight);
        this.city.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.sky.draw(this.ctx);
        this.city.draw(this.ctx);

        this.time += 1;
        if (this.time == 100){
            this.sky.addFireworks(this.stageWidth * Math.random(), this.stageHeight / 3 + this.stageHeight / 3 * Math.random());
            this.time = 0;
        }

        requestAnimationFrame(this.animate.bind(this));
    }
    
    onDown(e) {
        this.sky.addFireworks(e.clientX, e.clientY);
    }

    onMove(e) {
    }

    onUp(e) {

    }
}

window.onload = () => {
    new App();
}