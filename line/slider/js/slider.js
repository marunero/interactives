import { Slide } from "./slide.js";

export class Slider {
    constructor(stageWidth, stageHeight, x1, y1, x2, y2) {
        this.outSlideN = 0;
        this.inSlideN = 0;
        this.outSlides = [];
        this.inSlides = [];
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init(){
        this.outSlideN = 1;
        this.inSlideN = 1;
        
        const outSlide = new Slide(0, 0, 1, 1, this.stageWidth, this.stageHeight, Math.random() * 180, 0, false, this.stageWidth, this.stageHeight);
        const inSlide = new Slide(this.x1, this.y1, 1, 1, this.x2 - this.x1, this.y2 - this.y1, parseInt(outSlide.color) + 180, 0, false, this.x2 - this.x1, this.y2 - this.y1);
        this.outSlides[0] = outSlide;
        this.inSlides[0] = inSlide;
    }

    addOutSlide(direction){
        let x = 0;
        let y = 0;
        let width = this.stageWidth;
        let height = 0;
        if (direction == 0 || direction == 1){
            width = 0;
            height = this.stageHeight;
        }

        if (direction == 1){
            x = this.stageWidth;
        }
        else if (direction == 3){
            y = this.stageHeight;
        }

        const newOutSlide = new Slide(x, y, 1, 1, width, height, Math.random() * 360, direction, true, this.stageWidth, this.stageHeight);
        this.outSlides[this.outSlideN] = newOutSlide;
        this.outSlideN += 1;
    }

    draw(ctx) {
        for (let i = 0; i < this.outSlideN; i++) {
            this.outSlides[i].update();

            const oS = this.outSlides[i];
            
            if (oS.move == true && oS.inSlide == false){
                let x = 0;
                let y = 0;
                let w = 0;
                let h = 0;
                let threshold = false;
                
                if (oS.direction == 0 || oS.direction == 1) {
                    if (oS.width >= (this.stageWidth - (this.x2 - this.x1)) / 2) {
                        x = this.x1;
                        if (oS.direction == 1) {
                            x = this.x2; 
                        }
                        y = this.y1;
                        
                        w = oS.width - ((this.stageWidth - (this.x2 - this.x1)) / 2);
                        h = this.y2 - this.y1;
                        threshold = true;
                    }
                }
                else if (oS.direction == 2 || oS.direction == 3) {
                    if (oS.height >= (this.stageHeight - (this.y2 - this.y1)) / 2) {
                        y = this.y1;
                        if (oS.direction == 3) {
                            y = this.y2; 
                        }
                        x = this.x1;
                        
                        w = this.x2 - this.x1;
                        h = oS.height - ((this.stageHeight - (this.y2 - this.y1)) / 2);
                        threshold = true;
                    }
                }

                if (threshold == true) {
                    const newInSlide = new Slide(x, y, this.outSlides[i].v, this.outSlides[i].dv, w, h, parseInt(this.outSlides[i].color) + 90 * (1 + Math.random()), this.outSlides[i].direction, true, this.x2 - this.x1, this.y2 - this.y1);
                    if (newInSlide.color > 360) {
                        newInSlide.color -= 360;
                    }
                    this.inSlides[this.inSlideN] = newInSlide;
                    this.inSlideN += 1;
                    this.outSlides[i].inSlide = true;
                }                
            }
            
            if (this.outSlides[i].move == false && i >= 1) {
                this.outSlides.splice(0, i);
                this.outSlideN -= i;
                i = 0;
            }

            ctx.fillStyle = 'hsla(' + oS.color + ', 100%, 70%';
            if (oS.direction == 1){
                ctx.fillRect(oS.x - oS.width, oS.y, oS.width, oS.height);
            }
            else if (oS.direction == 3){
                ctx.fillRect(oS.x, oS.y - oS.height, oS.width, oS.height);
            }
            else{
                ctx.fillRect(oS.x, oS.y, oS.width, oS.height);
            }
        }

        for (let i = 0; i < this.inSlideN; i++){
            this.inSlides[i].update();

            if (this.inSlides[i].move == false && i >= 1) {
                this.inSlides.splice(0, i);
                this.inSlideN -= i;
                i = 0;
            }

            const iS = this.inSlides[i];
            ctx.fillStyle = 'hsla(' + iS.color + ', 100%, 70%';
            if (iS.direction == 1){
                ctx.fillRect(iS.x - iS.width, iS.y, iS.width, iS.height);
            }
            else if (iS.direction == 3){
                ctx.fillRect(iS.x, iS.y - iS.height, iS.width, iS.height);
            }
            else{
                ctx.fillRect(iS.x, iS.y, iS.width, iS.height);
            }
        }
    }
}