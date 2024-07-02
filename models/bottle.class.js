class Bottle extends DrawableObject {

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = 120;
        this.offset = { top: 20, left: 50, right: 50, bottom: 0 };
    }
}