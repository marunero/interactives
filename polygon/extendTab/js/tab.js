export class Tab {
    constructor(centerX, centerY, width, height) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.height = height;
        this.initHeight = height;

        this.hover = false;
        this.change = true;
        this.v = 10;
        this.initV = 10;
    }

    update(stageWidth, stageHeight){
        if (this.hover){
            if (this.height < stageHeight){
                this.change = true;
            }
            else{
                this.change = false;
                this.v = this.initV;
            }

            if (this.change){
                this.height += this.v;
                this.v *= 1.1;
            }
        }
        else{
            if (this.height > this.initHeight){
                this.change = true;
            }
            else{
                this.height = this.initHeight;
                this.change = false;
                this.v = this.initV;
            }

            if (this.change){
                this.height -= this.v;
                this.v *= 1.1;
            }

        }
    }
}