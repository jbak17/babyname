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
/*
General properties of all items. Necessary for collision detection.
 */
var ScreenItem = (function () {
    function ScreenItem() {
    }
    ScreenItem.prototype.step = function () { };
    ScreenItem.prototype.draw = function (canvas) { };
    return ScreenItem;
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
        return _this;
    }
    Bubble.prototype.step = function () {
        this.y += this.dy;
    };
    Bubble.prototype.draw = function (canvas) {
        ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    };
    return Bubble;
}(ScreenItem));
var toDisplay = [];
//creates a new bubble and adds to gameItems
function bubbleMaker() {
    for (var i = 0; i < 50; i++) {
        var w = Math.floor(Math.random() * canvas.width);
        var h = Math.floor(Math.random() * (-1000));
        toDisplay.push(new Bubble(w, h));
    }
}
bubbleMaker();
function draw() {
    //randomly create bubbles
    if (Math.random() < 0.01) {
        bubbleMaker();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //things to draw
    toDisplay.forEach(function (i) { return i.step(); });
    //update position on screen
    toDisplay.forEach(function (_) { return _.draw(canvas); });
    toDisplay = toDisplay.filter(function (x) { return x.y < (canvas.height); });
    requestAnimationFrame(draw);
}
draw();
