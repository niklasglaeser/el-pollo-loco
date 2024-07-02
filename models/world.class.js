class World {
    character;
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new Statusbar();
    coinBar = new Statusbar();
    bottleBar = new Statusbar();
    throwableObjects = [];
    endbossEngaged = false;
    victory = false;
    defeat = false;
    collect_bottle = new Audio('audio/collect-bottle.mp3');
    collect_coin = new Audio('audio/collect.mp3');
    collectedBottles;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = initLevel();
        this.setWorld();
        this.run();
        this.draw();
        this.collect_bottle.volume = 1.0;
        this.collect_coin.volume = 1.0;
    }

    /**
     * Sets the world context for various objects and initializes the status bars.
     */
    setWorld() {
        this.character = new Character();
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {enemy.world = this;}
        });
        this.healthBar.setHealthBar();
        this.coinBar.setCoinbar();
        this.bottleBar.setBottleBar();
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {enemy.endbossBar.setEndbossBar();}
        });
    }

    /**
     * Runs the game logic by setting intervals to check for collisions, throw objects, and endboss trigger.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossTrigger();
        }, 1000 / 60);
    }

    /**
     * Checks for collisions with items/ enemys.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkChickenCollision(enemy);
            this.checkEndbossCollision(enemy);
        });
        this.checkCollectableCollision();
    }

    /**
     * Checks for collisions between the character and chickens.
     * 
     * @param {MovableObject} enemy - The enemy object to check collision with.
     */
    checkChickenCollision(enemy) {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken && !enemy.isDead) {
            if (this.character.isCollidingTop(enemy)) {
                this.character.bounceOff();
                enemy.die();
                this.character.y = 140;
                return;
            } 
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.character.isHurt()) {
                this.character.hit();
                this.healthBar.setPercentageHealth(this.character.energy);
                return;
            }
        }
    }

    /**
     * Checks for collisions between the character and the endboss.
     * 
     * @param {MovableObject} enemy - The enemy object to check collision with.
     */
    checkEndbossCollision(enemy) {
        if (enemy instanceof Endboss) {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                this.character.hitByEndboss();
                this.healthBar.setPercentageHealth(this.character.energy);
            }
            this.throwableObjects.forEach((bottle, index) => {
                if (bottle.isColliding(enemy)) {
                    enemy.hit();
                    enemy.endbossBar.setPercentageEndboss(enemy.energy);
                    this.throwableObjects.splice(index, 1);
                }
            });
        }
    }

    /**
     * Checks for collisions between the character and collectable items.
     */
    checkCollectableCollision() {
        this.level.collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                this.checkBottleOrCoin(collectable, index);
            }
        });
    }

    /**
    * Checks the type of collectable (Coin or Bottle) and updates the corresponding status bar.
    * Plays a sound if sound control is enabled.
    * 
    * @param {Collectable} collectable - The collectable object to check.
    */
    checkBottleOrCoin(collectable, index) {
        if (collectable instanceof Coin) {this.coinBar.setPercentageCoins(Math.min(this.coinBar.coinPercentage + 20, 100));
            this.level.collectables.splice(index, 1);
            if (soundControl === true) {
                this.collect_coin.playbackRate = 2;
                this.collect_coin.play();
            }
        } else if (collectable instanceof Bottle) {
            if (this.character.collectedBottles < 5) {this.character.collectBottle();
                this.level.collectables.splice(index, 1);
                if (soundControl === true) {
                    this.collect_bottle.playbackRate = 2;
                    this.collect_bottle.play();
                }
            }
        }
    }

    /**
     * Checks if the throw action is triggered and throws a bottle.
     */
    checkThrowObjects() {
        if (this.keyboard.k) {
            this.character.throwBottle();
        }
    }

    /**
     * Checks if the endboss should be engaged based on the character's position.
     */
    checkEndbossTrigger() {
        if (!this.endbossEngaged && this.character.x >= 3200) {
            this.endbossEngaged = true;
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss) {
                    enemy.attackAndMoveTowardsCharacter();
                }
            });
        }
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.createMap();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Creates the game map by adding objects to the canvas.
     */
    createMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    }

    /**
     * Adds multiple objects to the map.
     * 
     * @param {MovableObject[]} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map.
     * 
     * @param {MovableObject} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImage(mo);
        }
    }

    /**
     * Flips the image horizontally for drawing.
     * 
     * @param {MovableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image back to its original state.
     * 
     * @param {MovableObject} mo - The object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Displays the victory screen and stops the game.
     */
    displayVictoryScreen() {
        this.victory = true;
        gameStarted = false;
        clearAllIntervals();
        document.getElementById('winButton').style.display = 'flex';
        document.getElementById('menu-button').style.display = 'flex';
    }

    /**
     * Displays the defeat screen and stops the game.
     */
    displayDefeatScreen() {
        this.defeat = true;
        gameStarted = false; 
        clearAllIntervals();
        document.getElementById('loseButton').style.display = 'flex';
        document.getElementById('menu-button').style.display = 'flex';
    }
}