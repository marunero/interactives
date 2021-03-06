import { Rain } from "./rain.js";
import { Umbrella } from "./umbrella.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        const num = document.body.clientWidth * document.body.clientHeight / 1000 > 1000 ? document.body.clientWidth * document.body.clientHeight / 1000 : 1000;
        this.rain = new Rain(num);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.umbX = document.body.clientWidth / 2;
        this.umbY = document.body.clientHeight / 1.2;
        this.umbrella = new Umbrella(this.umbX, this.umbY);

        this.isUmbDown = false;
        this.moveX = 0;
        this.moveY = 0;
        this.offmoveX = 0;
        this.offmoveY = 0;
        this.accX = 0;
        this.accY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);
        
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.umbX = this.stageWidth / 2;
        this.umbY = this.stageHeight / 1.2;

        this.rain.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.umbrella.update(this.umbX, this.umbY);
        this.umbrella.draw(this.ctx);

        this.rain.draw(this.ctx, this.umbrella.x, this.umbrella.y, this.umbrella.radius);

        requestAnimationFrame(this.animate.bind(this));
    }
    
    onDown(e) {
        // if this.umbrella is clicked 
        if (this.umbrella.clicked(e.clientX, e.clientY)){
            this.isUmbDown = true;
        }
        this.offsetX = e.clientX;
        this.offsetY = e.clientY;
        this.offmoveX = this.moveX;
        this.offmoveY = this.moveY;
    }

    onMove(e) {
        if (this.isUmbDown){
            this.moveX = e.clientX - this.offsetX;
            this.moveY = e.clientY - this.offsetY;
            
            this.umbX += this.moveX;
            this.umbY += this.moveY;
            
            this.offsetX = e.clientX;
            this.offsetY = e.clientY;
        }
    }

    onUp(e) {
        this.isUmbDown = false;
        this.moveX = 0;
        this.moveY = 0;
        this.offmoveX = 0;
        this.offmoveY = 0;
        this.accX = 0;
        this.accY = 0;
    }
}

window.onload = () => {
    new App();
}