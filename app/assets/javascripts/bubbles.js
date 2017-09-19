var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var colors = ["white", "green", "yellow", "blue", "black"];
/*
General properties of all items. Necessary for collision detection.
 */
var GameItem = (function () {
    function GameItem() {
    }
    GameItem.prototype.step = function () { };
    GameItem.prototype.draw = function (canvas) { };
    return GameItem;
}());
var Bubble = (function (_super) {
    __extends(Bubble, _super);
    function Bubble(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.dy = 2;
        _this.dx = 0;
        _this.radius = 10;
        //Once the bubble hits the bottom it should stop being updated.
        _this.stationary = false;
        _this.id = Math.floor(Math.random() * 100000);
        _this.color = colors[Math.floor(Math.random() * colors.length)];
        return _this;
    }
    Bubble.prototype.step = function () {
        this.y += this.dy;
        this.collision();
    };
    Bubble.prototype.bubblestop = function () {
        this.stationary = true;
        this.dy = 0;
    };
    Bubble.prototype.collision = function () {
        var _this = this;
        var contactY = this.y + this.radius; //end of bubble
        //check for contact with other item.
        var notMe = gameItems.filter(function (x) { return x.x != _this.x && x.y != _this.y; })
            .filter(function (x) { return x.stationary; });
        for (var i = 0; i < notMe.length; i++) {
            if (contactY <= notMe[i].y &&
                contactY >= (notMe[i].y + notMe[i].r) &&
                this.x > notMe[i].x &&
                this.x < notMe[i].x + notMe[i].r) {
                this.bubblestop();
            }
        }
        //check for contact with bottom of screen.
        if (contactY > 300) {
            this.bubblestop();
        }
    };
    Bubble.prototype.draw = function (canvas) {
        ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    };
    return Bubble;
}(GameItem));
var gameItems = [];
//creates a new bubble and adds to gameItems
function bubbleMaker() {
    for (var i = 0; i < 100; i++) {
        var w = Math.floor(Math.random() * canvas.width);
        var h = Math.floor(Math.random() * (-1000));
        gameItems.push(new Bubble(w, h));
    }
}
bubbleMaker();
function draw() {
    //randomly create bubbles
    // if (Math.random() < 0.01){
    //     bubbleMaker()
    //     console.log(gameItems.length)
    // }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //things to draw
    var moving = gameItems.filter(function (x) { return x.stationary == false; });
    moving.forEach(function (i) { return i.step(); });
    //update position on screen
    gameItems.forEach(function (_) { return _.draw(canvas); });
    // for (let i=0; i<gameItems.length; i++){
    //     gameItems[i].draw(canvas)
    // }
    requestAnimationFrame(draw);
}
draw();
