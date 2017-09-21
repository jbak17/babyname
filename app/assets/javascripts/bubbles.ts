
var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var colors: Array<String> = ["white", "green", "yellow", "blue", "black"];

interface Drawable {
    draw(canvas)
}

/*
General properties of all items. Necessary for collision detection.
 */
class GameItem implements Drawable{
    x: number;
    y: number;
    r: number; //radius
    step(){}
    draw(canvas){}
}

class Bubble extends GameItem{
    constructor (public x: number, public y: number){
        super()
    }

    dy: number = 2; dx: number = 0; radius: number = 10;

    //Once the bubble hits the bottom it should stop being updated.
    stationary: boolean = false;
    id: number = Math.floor(Math.random() * 100000);

    color: String = colors[Math.floor(Math.random() * colors.length)];

    step(){
        this.y += this.dy;
       }

    draw(canvas: HTMLCanvasElement){
        ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "green" ;
        ctx.fill();
        ctx.closePath();
    }
}


let gameItems: Array<Bubble> = [];

//creates a new bubble and adds to gameItems
function bubbleMaker(){
    for (let i = 0; i < 50; i++){
        let w: number = Math.floor(Math.random()*canvas.width);
        let h: number = Math.floor(Math.random()*(-1000));
        gameItems.push(new Bubble(w, h))
    }
}
bubbleMaker();

function draw_bubbles(){

    //randomly create bubbles
    if (Math.random() < 0.01){
        bubbleMaker();
        console.log(gameItems.length)
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //things to draw
    gameItems.forEach(i => i.step());
    //update position on screen
    gameItems.forEach(_ => _.draw(canvas));

    gameItems = gameItems.filter(x => x.y < (canvas.height ));

    requestAnimationFrame(draw)
}

draw_bubbles();
