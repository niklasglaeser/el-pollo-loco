class Statusbar extends DrawableObject {
    IMAGES_HEALTHBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    IMAGES_ENDBOSSBAR = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    healthPercentage = 100;
    coinPercentage = 0;
    bottlePercentage = 0;
    endbossPercentage = 100;

    constructor() {
        super();
        this.setHealthBar();
        this.setCoinbar();
        this.setBottleBar();
        this.setEndbossBar();
    }

    /**
     * Sets up the endboss status bar by loading images and setting the initial position and size.
     */
    setEndbossBar() {
        this.loadImages(this.IMAGES_ENDBOSSBAR);
        this.x = 260;
        this.y = 50;
        this.width = 200;
        this.height = 50;
        this.setPercentageEndboss(100);
    }

    /**
     * Sets up the health status bar by loading images and setting the initial position and size.
     */
    setHealthBar() {
        this.loadImages(this.IMAGES_HEALTHBAR);
        this.x = 260;
        this.y = 5;
        this.width = 200;
        this.height = 50;
        this.setPercentageHealth(100);
    }

    /**
     * Sets up the coin status bar by loading images and setting the initial position and size.
     */
    setCoinbar() {
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 20;
        this.y = 6;
        this.width = 200;
        this.height = 50;
        this.setPercentageCoins(0);
    }

    /**
     * Sets up the bottle status bar by loading images and setting the initial position and size.
     */
    setBottleBar() {
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 50;
        this.setPercentageBottles(0);
    }

    /**
     * Sets the health percentage and updates the health status bar image.
     * 
     * @param {number} percentage - The new health percentage.
     */
    setPercentageHealth(percentage) {
        this.healthPercentage = percentage;
        let path = this.IMAGES_HEALTHBAR[this.resolveImageIndex(this.healthPercentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Sets the endboss percentage and updates the endboss status bar image.
     * 
     * @param {number} percentage - The new endboss percentage.
     */
    setPercentageEndboss(percentage) {
        this.endbossPercentage = percentage;
        let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex(this.endbossPercentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Sets the coin percentage and updates the coin status bar image.
     * 
     * @param {number} percentage - The new coin percentage.
     */
    setPercentageCoins(percentage) {
        this.coinPercentage = percentage;
        let path = this.IMAGES_COINBAR[this.resolveImageIndex(this.coinPercentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Sets the bottle percentage and updates the bottle status bar image.
     * 
     * @param {number} percentage - The new bottle percentage.
     */
    setPercentageBottles(percentage) {
        this.bottlePercentage = percentage;
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex(this.bottlePercentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the given percentage.
     * 
     * @param {number} percentage - The percentage to resolve the image index for.
     * @returns {number} The index of the image corresponding to the given percentage.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}