export class Slide {
    constructor(x, y, v, dv, width, height, color, direction, move, maxWidth, maxHeight) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.dv = dv;
        this.width = width;
        this.height = height;
        this.color = color;

        this.direction = direction;
        this.move = move;

        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;

        this.inSlide = false;
    }

    update(){
        if (this.move == true){
            if (this.direction == 0 || this.direction == 1){
                if (this.width < this.maxWidth){
                    this.width += this.v;
                    
                    if (this.width >= this.maxWidth) {
                        this.width -= this.width - this.maxWidth;
                        this.move = false;
                    }
                }
            }
            else if (this.direction == 2 || this.direction == 3){
                if (this.height < this.maxHeight){
                    this.height += this.v;

                    if (this.height >= this.maxHeight) {
                        this.height -= this.height - this.maxHeight;
                        this.move = false;
                    }
                }
            }
            this.v += this.dv;    
        }
    }
}