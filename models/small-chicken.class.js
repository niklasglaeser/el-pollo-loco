class SmallChicken extends MovableObject {

    height = 80;
    width = 80;
    y = 335;
    energy = 100;
    isDead = false;
    chicken_death = new Audio('audio/chicken-death.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 800 + Math.random() * 8000;
        this.speed = 0.5 + Math.random() * 2;
        this.animate();
        this.offset = { top: 60, left: 20, right: 50, bottom: 0 };
    }


    /**
     * Handles the death of the small chicken.
     */
    die() {
        if (soundControl === true) {
            this.chicken_death.playbackRate = 3;
            this.chicken_death.play();
        }
        this.energy = 0;
        this.isDead = true;
        this.loadImage(this.IMAGES_DEAD[0]);
        setTimeout(() => {
            world.level.enemies.splice(world.level.enemies.indexOf(this), 1);
        }, 400);
    }

    /**
     * Animates the small chicken by moving it left and playing the walking animation.
     */
    animate() {
        setInterval(() => {
            if (this.energy > 0 && gameStarted) this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy > 0 && gameStarted) this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
