
var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx = canvas.getContext("2d");

interface Drawable {
    draw(canvas)
}

/*
General properties of all items. Necessary for collision detection.
 */
class ScreenItem implements Drawable{
    x: number;
    y: number;
    r: number; //radius
    step(){}
    draw(canvas){}
}

class Bubble extends ScreenItem{
    constructor (public x: number, public y: number){
        super()
    }

    dy: number = 2; dx: number = 0; radius: number = 10;

    //Once the bubble hits the bottom it should stop being updated.
    stationary: boolean = false;
    id: number = Math.floor(Math.random() * 100000);

    step(){
        this.y += this.dy;
       }

    draw(canvas: HTMLCanvasElement){
        ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "black" ;
        ctx.fill();
        ctx.closePath();
    }
}

let toDisplay: Array<Bubble> = [];

//creates a new bubble and adds to gameItems
function bubbleMaker(){
    for (let i = 0; i < 50; i++){
        let w: number = Math.floor(Math.random()*canvas.width);
        let h: number = Math.floor(Math.random()*(-1000));
        toDisplay.push(new Bubble(w, h))
    }
}
bubbleMaker();

function draw(){

    //randomly create bubbles
    if (Math.random() < 0.01){
        bubbleMaker();
        }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //things to draw
    toDisplay.forEach(i => i.step());
    //update position on screen
    toDisplay.forEach(_ => _.draw(canvas));

    toDisplay = toDisplay.filter(x => x.y < (canvas.height ));

    requestAnimationFrame(draw)
}

draw();
