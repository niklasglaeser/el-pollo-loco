class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;

  offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
  };

    /**
     * Applies gravity to the object by decreasing its y-coordinate and speedY.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} True if the object is above ground or an instance of ThrowableObject, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 140 || this.speedY > 0;
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     * 
     * @param {MovableObject} mo - The object to check collision with.
     * @returns {boolean} True if there is a collision, otherwise false.
     */
    isColliding(mo) {
        return  (this.x + this.width - this.offset.right) >= (mo.x + mo.offset.left) &&
                (this.x + this.offset.left) <= (mo.x + mo.width - mo.offset.right) &&
                (this.y + this.height - this.offset.bottom) >= (mo.y + mo.offset.top) &&
                (this.y + this.offset.top) <= (mo.y + mo.height - mo.offset.bottom);
    }

    /**
     * Checks if the object is currently hurt.
     * 
     * @returns {boolean} True if the object is hurt, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.7;
    }

    /**
     * Checks if the object is dead.
     * 
     * @returns {boolean} True if the object's energy is 0, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by increasing its x-coordinate.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation by cycling through the provided images.
     * 
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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
}
