
var canvas = <HTMLCanvasElement>document.getElementById("nameCanvas");
var ctx = canvas.getContext("2d");

let SPEED = 0.5;
let SPACING = 400;

interface Drawable {
    draw(canvas)
}

/*
General properties of all items. Necessary for collision detection.
 */
class TextBanner implements Drawable{
    x: number = 0-SPACING;
    y: number = canvas.height/2;
    text: string; //radius
    dx: number; //speed
    step(){}
    draw(canvas){
        ctx = canvas.getContext("2d");
        ctx.font = "45px Arial";
        ctx.fillStyle="black";
        ctx.fillText(this.text,this.x,this.y);
    }
}

class Name extends TextBanner{
    constructor (public text: string){
        super()
    }

    dx: number = SPEED; x = canvas.width - 100; y = canvas.height/2;


    step(){
        if (this.x > canvas.width + 100){
            this.x = -100;
        } else {
            this.x += this.dx;
        }
    }

}

//hold names to be added to banner.
let NameList: Array<Name> = [];


let counter: number = 0;

function draw(){
    let shortList = [];
    if (counter % SPACING == 0 && shortList.length != 0){
        let name: string = shortList[Math.floor(Math.random() * shortList.length)];
        NameList.push(new Name(name))
    }
    counter ++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //things to draw
    NameList.forEach(i => i.step());
    //update position on screen
    NameList.forEach(_ => _.draw(canvas));

    requestAnimationFrame(draw)
}

draw();
