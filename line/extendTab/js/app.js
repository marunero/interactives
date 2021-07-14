import { CenterLine } from "./centerline.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        this.CenterLine = new CenterLine(5);
        this.hoverIndex = 0;


        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        
        document.addEventListener('pointermove', this.onMove.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.CenterLine.resize(this.stageWidth, this.stageHeight);    
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.CenterLine.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }

    onMove(e) {
        this.CenterLine.update(e.clientX);
    }
}

window.onload = () => {
    new App();
}