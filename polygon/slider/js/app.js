import { Slider } from "./slider.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        
        this.Slider = new Slider(this.stageWidth, this.stageHeight, this.stageWidth / 4, this.stageHeight / 4, this.stageWidth * 3 / 4, this.stageHeight * 3 / 4);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.offsetX = 0;
        this.offsetY = 0;
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
        this.Slider.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.Slider.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }

    onDown(e) {
        this.offsetX = e.clientX;
        this.offsetY = e.clientY;
    }
    onUp(e) {
        let direction = 0;
        if (Math.abs(e.clientX - this.offsetX) >= Math.abs(e.clientY - this.offsetY)){
            if (e.clientX - this.offsetX > 0){
                direction = 0;
            }
            else{
                direction = 1;
            }
        }
        else{
            if (e.clientY - this.offsetY > 0){
                direction = 2;
            }
            else{
                direction = 3;
            }
        }
        
        this.Slider.addOutSlide(direction);
    }
}

window.onload = () => {
    new App();
}