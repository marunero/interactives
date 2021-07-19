import { Slide } from "./slide.js";
import { Line } from "./line.js";

export class Slider {
    constructor(stageWidth, stageHeight) {
        this.slideN = 0;
        this.outSlides = [];
        this.inSlides = [];
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.lineN = 0;
        this.lines = [];
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init(){
        this.slideN = 1;
        const outSlide = new Slide(0, 0, this.stageWidth, this.stageHeight, 'white');
        const inSlide = new Slide(this.stageWidth / 4, this.stageHeight / 4, this.stageWidth / 2, this.stageHeight / 2, 'skyblue');
        this.outSlides[0] = outSlide;
        this.inSlides[0] = inSlide;

        this.lineN = 0;
    }

    addLine(direction){
        let x = 0;
        let y = 0;
        if (direction == 1){
            x = this.stageWidth;
        }
        else if (direction == 3){
            y = this.stageHeight;
        }

        const line = new Line(x, y, 1, 1, direction, this.stageWidth, this.stageHeight);
        this.lines[0] = line;
        this.lineN = 1;
    }

    draw(ctx) {
        for (let i = 0; i < this.slideN; i++) {
            const oS = this.outSlides[i];
            ctx.fillStyle = oS.color;
            ctx.fillRect(oS.x, oS.y, oS.width, oS.height);

            const iS = this.inSlides[i];
            ctx.fillStyle = iS.color;
            ctx.fillRect(iS.x, iS.y, iS.width, iS.height);
            
        }

        for (let i = 0; i < this.lineN; i++){
            this.lines[i].update();
            const l = this.lines[i];

            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            if (l.direction == 0 || l.direction == 1){
                ctx.lineTo(l.x, l.stageHeight);
            }
            else if (l.direction == 2 || l.direction == 3){
                ctx.lineTo(this.stageWidth, l.y);
            }
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}