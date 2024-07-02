class Cloud extends MovableObject {

    y = 50;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 5000;
        this.animate();
    }

    /**
     * Initiates the cloud's movement animation.
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud to the left at a constant speed.
     */
    moveLeft() {
        setInterval(() => {
            if (gameStarted) this.x -= this.speed;
        }, 1000 / 60);
    }
}
