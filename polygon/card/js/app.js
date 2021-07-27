import { Polygon } from "./polygon.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        this.n = 20;
        this.x = document.body.clientWidth / 2 + document.body.clientWidth;
        this.y = document.body.clientHeight / 2;
        this.r = document.body.clientWidth;
        this.Polygon = new Polygon(this.x, this.y, this.r, this.n);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.mouseDown = false;
        this.offsetY = 0;
        this.v = 0;
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
        this.Polygon.resize(this.x, this.y, this.r, this.n);

    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.Polygon.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
        this.Polygon.spin(this.v);
        if (this.v > 0.5) {
            this.v -= 1;
        }
        else if (this.v < -0.5) {
            this.v += 1;
        }
        else{
            this.v = 0;
        }

        if (this.mouseDown == false && this.v <= 10) {
            this.Polygon.align();
        }
    }

    onDown(e) {
        this.mouseDown = true;
        this.offsetY = e.clientY;
    }
    onUp(e) {
        this.mouseDown = false;
        this.offsetY = 0;
    }
    onMove(e) {
        if (this.mouseDown == true) {
            this.v = this.offsetY - e.clientY;
            
            this.offsetY = e.clientY;
        }
        
    }
}

window.onload = () => {
    new App();
}