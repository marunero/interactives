export class Line {
    constructor(x, y, v, dv, direction, stageWidth, stageHeight) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.dv = dv;

        // 0: left to right, 1: right to left, 2: up to down, 3: down to up
        this.direction = direction;
        
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        
        this.move = true;
    }

    update(){
        if (this.direction == 0){
            if (this.x < this.stageWidth){
                this.x += this.v;
            }
            else{
                this.move = false;
            }
        }
        else if (this.direction == 1){
            if (this.x > 0){
                this.x -= this.v;
            }
            else{
                this.move = false;
            }
        }
        else if (this.direction == 2){
            if (this.y < this.stageHeight){
                this.y += this.v;
            }
            else{
                this.move = false;
            }
        }
        else if (this.direction == 3){
            if (this.y > 0){
                this.y -= this.v;
            }
            else{
                this.move = false;
            }
        }

        this.v += this.dv;
    }
}