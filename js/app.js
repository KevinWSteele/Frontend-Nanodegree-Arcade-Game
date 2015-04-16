var colWidth = 101;
var rowHeight = 83;
var canvasWidth = 505
var canvasHeight = 606;

var numEnemies = 3;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   
    
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    var randomrow  = Math.random();
    if (randomrow < 0.33) {
        this.y = 63; //bug in first stone row
    }
    else if (randomrow < 0.66) {
        this.y = 146;
        
    }
    else {
        this.y = 229;
    }
    
    this.speed = Math.random()
    if (this.speed < 0.25) {
        this.speed = 20;
     }
     if (this.speed < 0.50) {
        this.speed = 80;
     }
    if (this.speed < 0.75) {
        this.speed = 200;
    }
    else {
        this.speed = 130;
    }
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x === player.x && this.y === player.y) {
        player.reset();
    }
    if (this.x > canvasWidth) { 
        this.x = 0
    }
    
        //code
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.player = 'images/char-boy.png';
    this.x = 202;
    this.y = 395;
    this.score = 0;
}

Player.prototype.update = function(dt){
    player.collide();
    document.getElementById("score").innerText="Score: " + this.score;
   
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

Player.prototype.handleInput = function (keys){
    switch (keys) {
    
        case "left":
            this.x = this.x - colWidth;
            if (this.x < 0) {
                this.x = 0;
            };
            break;
        case "right":
            this.x = this.x + colWidth;
            if (this.x > 404) {
                this.x = 404;
            };
            break;
        case "up":
            
            if (this.y === -10) {
                
                player.reset();}
            else {
               this.y = this.y - rowHeight; 
            }
            if (this.y < 0 ) {
                this.y = -10;
                this.score = this.score + 1;
                };
            
            
            break;
        case "down":
            if (this.y === -10) {
                player.reset();
            }
            else {
            this.y = this.y + rowHeight;};
            if (this.y > 395) {
            this.y = 395 ;
            }
        break;
        //case
    };
    
};

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 395;
}
// Now

Player.prototype.collide = function(){
    var pleft = this.x + 15;
    var pright = this.x + 85;
    for (i = 0; i < allEnemies.length; i++){
    if (this.y === allEnemies[i].y ) {
        var bright = allEnemies[i].x + 90;
        var bleft = allEnemies[i].x
       if (bright > pleft && bleft < pright) {
        this.score = this.score - 1;
        player.reset();
       };
    };
    };
}
//instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
player = new Player();

for (i = 0; i < numEnemies; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
