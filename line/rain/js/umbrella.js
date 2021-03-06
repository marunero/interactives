export class Umbrella {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.accX = 0;
        this.accY = 0;
        this.radius = 60;
        this.rodLength = 60;
        this.handleRadius = 5;
    }

    resize(stageWidth, stageHeight) {
        this.x = stageWidth / 2;
        this.y = stageHeight / 2;
    }

    clicked(eX, eY) {
        if (eY <= this.y && Math.pow(eX - this.x, 2) + Math.pow(eY - this.y, 2) <= Math.pow(this.radius, 2)){
            return true;
        }
        if (eX <= this.x + this.handleRadius && eX >= this.x - this.handleRadius * 2){
            if (eY >= this.y && eY <= this.y + this.rodLength){
                return true;
            }
        }
        return false;
    }

    update(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
    }

    draw(ctx){
        // fabric
        ctx.beginPath();

        ctx.fillStyle = '#d8e9ef';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI, true);
        ctx.fill();
        
        ctx.closePath();

        // handle
        ctx.beginPath();
        ctx.strokeStyle = '#d8e9ef';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.rodLength);
        ctx.arc(this.x - this.handleRadius, this.y + this.rodLength, this.handleRadius, 0, Math.PI, false);
        ctx.stroke();
    }
}