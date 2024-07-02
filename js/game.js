
let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let manualControl = false;
let storyControl = false;
let soundControl = false;
let background_music = new Audio('audio/bgmusic.mp3');
background_music.volume = 0.2;

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Displays the start screen and hides the game canvas.
 */
function showStartScreen() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
}

/**
 * Starts the game initializies the game world.
 */
function startGame() {
    gameStarted = true;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('menu-button').style.display = 'flex';
    document.getElementById('sound-button').style.display = 'flex';
    if (soundControl === true) {
        background_music.play();
    }
    init();
}

/**
 * Shows the main menu and stops the game.
 */
function showMenu() {
    gameStarted = false;
    clearAllIntervals();
    document.getElementById('winButton').style.display = 'none';
    document.getElementById('loseButton').style.display = 'none';
    document.getElementById('menu-button').style.display = 'none';
    document.getElementById('sound-button').style.display = 'none';
    showStartScreen();
}

/**
 * Toggles the display of the controls.
 */
function showManual() {
    if (manualControl === false) {document.getElementById('manual').style.display = 'flex';
        document.getElementById('manual-button').innerHTML = 'Close How to Play';
        document.getElementById('gameExplanation').style.display = 'none';
        document.getElementById('game-story').innerHTML = 'Open Game Story';
        document.getElementById('controls').style.display = 'flex';
        manualControl = true;
        storyControl = false;
    } else {document.getElementById('manual').style.display = 'none';
        document.getElementById('manual-button').innerHTML = 'Open How to Play';
        document.getElementById('gameExplanation').style.display = 'none';
        document.getElementById('game-story').innerHTML = 'Open Game Story';
        manualControl = false;
        storyControl = false;
    }
}

/**
 * Toggles the display of the Game Story.
 */
function showGameStory() {
    if (storyControl === false) {document.getElementById('manual').style.display = 'flex';
        document.getElementById('manual-button').innerHTML = 'Open How to Play';
        document.getElementById('gameExplanation').style.display = 'flex';
        document.getElementById('game-story').innerHTML = 'Close Game Story';
        document.getElementById('controls').style.display = 'none';
        manualControl = false;
        storyControl = true;
    } else {document.getElementById('manual').style.display = 'none';
        document.getElementById('manual-button').innerHTML = 'Open How to Play';
        document.getElementById('gameExplanation').style.display = 'none';
        document.getElementById('game-story').innerHTML = 'Open Game Story';
        manualControl = false;
        storyControl = false;
    }
}



/**
 * Toggles sound control and updates the icon.
 */
function handleSounds() {
    let soundIcon = document.getElementById('soundControlIcon');
    let soundIconInGame = document.getElementById('soundIconInGame');
    if (soundControl === false) {
        soundControl = true;
        soundIcon.src = "img/icons/unmute.png";
        soundIconInGame.src = "img/icons/unmute.png";
        background_music.play();
    } else {
        soundControl = false;
        soundIcon.src = "img/icons/mute.png";
        soundIconInGame.src = "img/icons/mute.png";
        background_music.pause();
    }
}

/**
 * Opens the impressum
 */
function openImpressum() {
    document.getElementById('impressumOverlay').style.display = 'flex';
}

/**
 * Closes the impressum
 */
function closeImpressum() {
    document.getElementById('impressumOverlay').style.display = 'none';
}

/**
 * Restarts the game
 */
function restartGame() {
    gameStarted = false;
    clearAllIntervals();
    document.getElementById('winButton').style.display = 'none';
    document.getElementById('loseButton').style.display = 'none';
    setTimeout(() => {
        gameStarted = true;
        init();
    }, 100);
}

/**
 * Initializes the game world and canvas.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
    if (e.key === 'a') keyboard.a = true;
    if (e.key === 'd') keyboard.d = true;
    if (e.key === 'k') keyboard.k = true;
    if (e.key === ' ') keyboard.space = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === 'a') keyboard.a = false;
    if (e.key === 'd') keyboard.d = false;
    if (e.key === 'k') keyboard.k = false;
    if (e.key === ' ') keyboard.space = false;
});

document.getElementById('up-button').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.space = true;
});
document.getElementById('up-button').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.space = false;
});

document.getElementById('left-button').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.a = true;
});
document.getElementById('left-button').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.a = false;
});

document.getElementById('right-button').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.d = true;
});
document.getElementById('right-button').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.d = false;
});

document.getElementById('bottle-button').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.k = true;
});
document.getElementById('bottle-button').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.k = false;
});


document.getElementById('game-story').addEventListener('onclick', (event) => {
    event.preventDefault();
});

document.getElementById('play-button').addEventListener('onclick', (event) => {
    event.preventDefault();
});
document.getElementById('manual-button').addEventListener('onclick', (event) => {
    event.preventDefault();
});
document.getElementById('soundControl').addEventListener('onclick', (event) => {
    event.preventDefault();
});
document.getElementById('impressum').addEventListener('onclick', (event) => {
    event.preventDefault();
});
