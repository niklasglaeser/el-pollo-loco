class Character extends MovableObject {
    height = 280;
    width = 100;
    y = 140;
    speed = 10;
    isImmobilized = false;
    idleTime = 0;
    lastMoveTime = Date.now();
    collectedBottles = 0;
    canThrowBottle = true;
    isDeadAnimationPlayed = false;
    world;
    walking_sound = new Audio('audio/moving.mp3');
    character_death = new Audio('audio/game-over.mp3');
    character_hit = new Audio('audio/hit.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadCharacterAnimations();
        this.applyGravity();
        this.offset = {
            top: 100,
            left: 20,
            right: 20,
            bottom: 14,
        };
        this.setVolume();
        this.animate();
    }

    /**
     * Sets the volume for character hit and death sounds.
     */
    setVolume() {
        this.character_hit.volume = 0.2;
        this.character_death.volume = 0.2;
    }

    /**
     * Loads the character animations.
     */
    loadCharacterAnimations() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
    }

    /**
     * Animates the character.
     */
    animate() {
        setInterval(() => {
            this.checkImmobilized();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            let now = Date.now();
            let idleDuration = (now - this.lastMoveTime) / 1000;
            this.animateCharacterStatus(idleDuration);
        }, 150);
    }

    /**
     * Checks if the character is immobilized and handles movement.
     */
    checkImmobilized() {
        if (!this.isImmobilized) {
            this.checkRightMovement();
            this.checkLeftMovement();
            this.checkJumpMovement();
        }
    }

    /**
     * Checks for right movement input and moves the character right.
     */
    checkRightMovement() {
        if (this.world.keyboard.d && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (soundControl === true && !this.isAboveGround()) {
                this.walking_sound.playbackRate = 2.5;
                this.walking_sound.play();
            }
            this.lastMoveTime = Date.now();
        }
    }

    /**
     * Checks for left movement input and moves the character left.
     */
    checkLeftMovement() {
        if (this.world.keyboard.a && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (soundControl === true && !this.isAboveGround()) {
                this.walking_sound.playbackRate = 2.5;
                this.walking_sound.play();
            }
            this.lastMoveTime = Date.now();
        }
    }

    /**
     * Checks for jump input and makes the character jump.
     */
    checkJumpMovement() {
        if (this.world.keyboard.space && !this.isAboveGround()) {
            this.jump();
            this.lastMoveTime = Date.now();
        }
    }

    /**
     * Animates the character based on its current status.
     * 
     * @param {number} idleDuration - The duration for which the character has been idle.
     */
    animateCharacterStatus(idleDuration) {
        if (this.isDead()) {
            this.endGame();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.world.keyboard.a && !this.isAboveGround() || this.world.keyboard.d && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (idleDuration >= 15) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
    
    /**
     * Ends the game by playing the death animation and displaying the defeat screen.
     */
    endGame() {
        if (!this.isDeadAnimationPlayed) {
            this.playAnimationOnce(this.IMAGES_DEAD);
            if (soundControl === true) {
                this.character_death.play();
            }
            this.isDeadAnimationPlayed = true;
            setTimeout(() => {
                this.world.displayDefeatScreen();
            }, 850);
        }
    }

    /**
     * Handles character hit logic
     */
    hit() {
        if (!this.isImmobilized && !this.isHurt()) {
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
                this.immobilize();
                if (soundControl === true) {
                    this.character_hit.playbackRate = 1;
                    this.character_hit.play();
                }
            }
            if (this.energy === 0) {
                this.endGame();
            }
        }
    }

    /**
     * Handles character hit by endboss logic.
     */
    hitByEndboss() {
        if (!this.isImmobilized && !this.isHurt()) {
            this.energy -= 101;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
                this.immobilize();
                if (soundControl === true) {
                    this.character_hit.playbackRate = 1;
                    this.character_hit.play();
                }
            }
            if (this.energy === 0) {
                this.endGame();
            }
        }
    }

    /**
     * Immobilizes the character for a short duration.
     */
    immobilize() {
        this.isImmobilized = true;
        setTimeout(() => {
            this.isImmobilized = false;
        }, 400);
    }

    /**
     * Makes the character jump.
     */
    jump() {
        this.speedY = 20;
        this.playAnimationOnceJump(this.IMAGES_JUMPING);
    }
    

    /**
     * Makes the character bounce off.
     */
    bounceOff() {
        this.speedY = 20;
        this.playAnimationOnceJump(this.IMAGES_JUMPING);
    }

    /**
     * Increases the character's bottle count and updates the bottle bar.
     */
    collectBottle() {
        this.collectedBottles++;
        this.world.bottleBar.setPercentageBottles(Math.min(this.collectedBottles * 20, 100));
    }

    /**
     * Throws a bottle if available.
     */
    throwBottle() {
        if (this.collectedBottles > 0 && this.canThrowBottle) {
            let direction = this.otherDirection ? -1 : 1;
            let bottle = new ThrowableObject(this.x + 100 * direction, this.y + 60, direction);
            this.world.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.world.bottleBar.setPercentageBottles(Math.min(this.collectedBottles * 20, 100));
            this.canThrowBottle = false;
            setTimeout(() => {
                this.canThrowBottle = true;
            }, 1000);
        }
    }

    /**
     * Checks if the character is falling.
     * 
     * @returns {boolean} True if the character is falling, otherwise false.
     */
    isFalling() {
        return this.speedY > 0;
    }

    /**
     * Checks if the character is colliding from the top with another object.
     * 
     * @param {MovableObject} mo - The object to check collision with.
     * @returns {boolean} True if colliding from the top, otherwise false.
     */
    isCollidingTop(mo) {
        return (
            this.speedY < 0 &&
            this.y + this.height - this.offset.bottom >= mo.y &&
            this.y + this.height - this.offset.bottom <= mo.y + mo.height / 2 &&
            this.x + this.width - this.offset.right >= mo.x &&
            this.x + this.offset.left <= mo.x + mo.width
        );
    }

    /**
     * Plays an animation once by cycling through the provided images.
     * 
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimationOnce(images) {
        this.currentImage = 0;
        let interval = setInterval(() => {
            if (this.currentImage < images.length) {
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(interval);
            }
        }, 120);
    }

    /**
     * Plays an animation once by cycling through the provided images.
     * 
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimationOnceJump(images) {
        this.currentImage = 0;
        let interval = setInterval(() => {
            if (this.currentImage < images.length) {
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
    
}