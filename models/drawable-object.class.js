class DrawableObject {
  x = 160;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;

  offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
  };

    /**
     * Loads an image from the specified path and sets it as the object's image.
     * 
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths and stores them in the image cache.
     * 
     * @param {string[]} arr - The array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the canvas using coordinates
     * 
     * @param {CanvasRenderingContext2D} ctx - The context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the object's frame on the canvas for debugging purposes.
     * Only applies to Character, Chicken, Endboss, ThrowableObject, and SmallChicken.
     * 
     * @param {CanvasRenderingContext2D} ctx - The context of the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SmallChicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
}