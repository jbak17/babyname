
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
    stationary: boolean;
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
        this.collision()
       }

    bubblestop(){
        this.stationary = true;
        this.dy = 0;
    }

    collision(){
        let contactY = this.y + this.radius; //end of bubble
        //check for contact with other item.
        let notMe = gameItems.filter(x => x.x != this.x && x.y != this.y)
            .filter(x => x.stationary);

        for (let i= 0; i< notMe.length; i++){
            if (contactY <= notMe[i].y &&
                contactY >= (notMe[i].y + notMe[i].r) &&
                this.x > notMe[i].x &&
                this.x < notMe[i].x+notMe[i].r){
                this.bubblestop()
            }
        }
        //check for contact with bottom of screen.
        if( contactY > 300) {
            this.bubblestop();
        }
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
    for (let i = 0; i < 100; i++){
        let w: number = Math.floor(Math.random()*canvas.width);
        let h: number = Math.floor(Math.random()*(-1000));
        gameItems.push(new Bubble(w, h))
    }
}
bubbleMaker()

function draw(){

    //randomly create bubbles
    // if (Math.random() < 0.01){
    //     bubbleMaker()
    //     console.log(gameItems.length)
    // }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //things to draw
    let moving = gameItems.filter(x => x.stationary == false);
    moving.forEach(i => i.step());
    //update position on screen
    gameItems.forEach(_ => _.draw(canvas));
    // for (let i=0; i<gameItems.length; i++){
    //     gameItems[i].draw(canvas)
    // }

    requestAnimationFrame(draw)
}

draw();
