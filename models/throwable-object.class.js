class ThrowableObject extends MovableObject {

    IMAGES_FLYING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_FLYING);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 70;
        this.direction = direction;
        this.throw();
    }

    /**
     * Handles the throwing action of the object by setting its vertical speed,
     * applying gravity, and moving it in the specified direction while playing
     * the flying animation.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += this.direction * 10;
            this.playAnimation(this.IMAGES_FLYING);
        }, 25);
    }
}

