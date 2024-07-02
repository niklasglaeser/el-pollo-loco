class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 40;
    x = 3800;
    speed = 4;
    world;
    energy = 100;
    isMoving = false;
    isImmobilized = false;
    isDead = false;
    endbossBar;
    bottle_break = new Audio('audio/bottle-break.mp3');
    chicken_hurt = new Audio('audio/chicken-hurt.mp3');
    endboss_death = new Audio('audio/game-won.mp3');

    offset = {
        top: 100,
        left: 70,
        right: 20,
        bottom: 10
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(world) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.endbossBar = new Statusbar();
        this.endbossBar.setEndbossBar();
        this.animate();
        this.endboss_death.volume = 0.5;
    }

    /**
     * Draws the endboss and its status bar on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The context of the canvas.
     */
    draw(ctx) {
        super.draw(ctx);
        this.endbossBar.x = this.x + 30;
        this.endbossBar.y = this.y + 15;
        this.endbossBar.draw(ctx);
    }

    /**
     * Handles the endboss being hit, decreasing its energy and playing the appropriate animations and sounds.
     */
    hit() {
        this.energy -= 20;
        if (soundControl === true) {
            this.bottle_break.playbackRate = 2;
            this.bottle_break.play();
            this.chicken_hurt.playbackRate = 2;
            this.chicken_hurt.play();
        }
        this.endbossBar.setPercentageEndboss(this.energy);
        this.handleEndbossDeath();
    }

    /**
    * Handles the death of the endboss by checking its energy level,
    * playing the death animation, and playing the death sound
    * If the endboss is not dead yet, it will be immobilized and play the hurt animation.
    */
    handleEndbossDeath() {
        if (this.energy <= 0) {
            this.energy = 0;
            this.playDeathAnimation();
            if (soundControl === true) {
                this.endboss_death.play();
            }
            this.isDead = true;
        } else {
            this.immobilizeAndAnimate();
        }
    }


    /**
     * Plays the death animation of the endboss and triggers the victory screen.
     */
    playDeathAnimation() {
        clearAllIntervals();
        this.playAnimationOnce(this.IMAGES_DEAD);
        setTimeout(() => {
            this.world.displayVictoryScreen();
        }, 700);
    }

    /**
     * Immobilizes the endboss and plays the hurt and attack animations.
     */
    immobilizeAndAnimate() {
        this.isImmobilized = true;
        this.playAnimationOnce(this.IMAGES_HURT);
        setTimeout(() => {
            this.playAnimationOnce(this.IMAGES_ATTACK);
            setTimeout(() => {
                this.isImmobilized = false;
                this.isMoving = true;
            }, this.IMAGES_ATTACK.length * 100);
        }, 500);
    }

    /**
     * Animates the endboss by playing the walking or alert animations based on its state.
     */
    animate() {
        setInterval(() => {
            if (!this.isImmobilized) {
                if (this.isMoving) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }
        }, 200);
    }

    /**
     * Initiates the endboss attack and moves it towards the character.
     */
    attackAndMoveTowardsCharacter() {
        this.playAnimationOnce(this.IMAGES_ATTACK);
        setTimeout(() => {
            this.isMoving = true;
            this.moveTowardsCharacter();
        }, this.IMAGES_ATTACK.length * 100);
    }

    /**
     * Moves the endboss towards the character.
     */
    moveTowardsCharacter() {
        setInterval(() => {
            if (this.isMoving && !this.isImmobilized) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}
