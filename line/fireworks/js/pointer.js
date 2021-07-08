export class Pointer {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = 5;
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {        
        ctx.strokeStyle = "#d8e9ef";
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        ctx.moveTo(this.x, this.y);
        ctx.beginPath();
        ctx.arc(this.x - ctx.lineWidth, this.y + ctx.lineWidth, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();        
    }
}