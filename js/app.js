var colWidth = 101;
var rowHeight = 83;
var canvasWidth = 505
var canvasHeight = 606;
var numEnemies = 3; //sets the number of bugs

var Star = function() {
    this.star = "images/Star.png";

    this.randStar = function(){

        var randomRow = Math.random();
        //randomly assign the star to a row + column
        if (randomRow < 0.33) {
            this.y = 63;
        }
        else if (randomRow < 0.66) {
            this.y = 146;
        }
        else {
            this.y = 229;
        };

        var randomCol = Math.random();

        if (randomCol < 0.20) {
            this.x = 0;
        }
        else if (randomCol < 0.40) {
            this.x = 101;
        }
        else if (randomCol < 0.60) {
            this.x = 202;
        }
        else if (randomCol < 0.80) {
            this.x = 303;
        }
        else {
            this.x = 404;
        };
    };
    this.randStar();
};


Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.star), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    var randomRow  = Math.random();

    //randomly assign the enemies to a row + column
    if (randomRow < 0.33) {
        this.y = 63; //bug in first stone row
    }
    else if (randomRow < 0.66) {
        this.y = 146;
    }
    else {
        this.y = 229;
    }

    this.speed = Math.random()
    if (this.speed < 0.25) {
        this.speed = 60;
    }
    else if (this.speed < 0.50) {
        this.speed = 95;
    }
    else if (this.speed < 0.75) {
        this.speed = 200;
    }
    else {
        this.speed = 130;
    }
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x === player.x && this.y === player.y) {
        player.reset();
    }
    if (this.x > canvasWidth) {
        this.x = 0
    };
};
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// defines player starting position
var Player = function(){
    this.player = 'images/char-boy.png';
    this.x = 202;
    this.y = 395;
    this.score = 0;
};

Star.prototype.update = function(dt){
    star.collide();
};

//displays score at bottom of screen
Player.prototype.update = function(dt){
    player.collide();
    document.getElementById("score").innerText="Score: " + this.score;

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

//tells the game what to do when various keys are pressed
Player.prototype.handleInput = function (keys) {
    switch (keys) {

        case "left": //move left if the player would not go off board
            this.x = this.x - colWidth;
            if (this.x < 0) {
                this.x = 0;
            };
            break;
        case "right": //move right if player would not go off board
            this.x = this.x + colWidth;
            if (this.x > 404) {
                this.x = 404;
            };
            break;
        case "up": //move up or reset if player would go off board

            if (this.y === -10) {
                player.reset();
            }
            else {
                this.y = this.y - rowHeight;
            }
            if (this.y < 0 ) {
                this.y = -10;
                this.score = this.score + 1;
            };
            break;
        case "down": //move down or reset if player has reached top
            if (this.y === -10) {
                player.reset();
            }
            else {
                this.y = this.y + rowHeight;
            };
            if (this.y > 395) {
                this.y = 395;
            };
            break;
        case "space": //use the space bar to change the bug positions
            for (i = 0; i < numEnemies; i++) {
                var randomrow  = Math.random();
                if (randomrow < 0.33) {
                    allEnemies[i].y = 63;
                }
                else if (randomrow < 0.66) {
                    allEnemies[i].y = 146;
                }
                else {
                    allEnemies[i].y = 229;
                }

                enemy.speed = Math.random()
                if (enemy.speed < 0.25) {
                    allEnemies[i].speed = 60;
                }
                else if (enemy.speed < 0.50) {
                    allEnemies[i].speed = 95;
                }
                else if (enemy.speed < 0.75) {
                    allEnemies[i].speed = 200;
                }
                else {
                    allEnemies[i].speed = 130;
                };
            };
            break;
    };

};

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 395;
};

//function for what happens if the player hit a bug
Player.prototype.collide = function() {
    var pleft = this.x + 15;
    var pright = this.x + 85;

    //reset if player hits bug and subtract point from score
    for (i = 0; i < allEnemies.length; i++) {
        var bright = allEnemies[i].x + 90;
        var bleft = allEnemies[i].x;
        if (this.y === allEnemies[i].y ) {
            if (bright > pleft && bleft < pright) {
                this.score = this.score - 1;
                player.reset();
            };
        };
    };

};

Star.prototype.collide = function(){
    //add point to score and reset star if player hits star
   if (this.x === player.x && this.y === player.y) {
        player.score = player.score + 1;
        star.randStar();
    };
};

//instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
player = new Player();
star = new Star();

for (i = 0; i < numEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
