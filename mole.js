let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 30; // ⏱ timer

// 🎵 Load sounds (Add these at the top)
const hitSound = new Audio('hit.mp3');      // sound when hitting a mole
const missSound = new Audio('miss.mp3');    // sound when clicking wrong tile
const bgMusic = new Audio('bg-music.mp3');  // background music
bgMusic.loop = true;
bgMusic.volume = 0.3;

// 🎵 Start background music when the game starts (first click)
document.addEventListener('click', () => {
    bgMusic.play();
}, { once: true });

window.onload = function() {
    setGame();

    // ⏱ Start timer
    let timerInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(timerInterval);
            return;
        }
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) {
            document.getElementById("score").innerText = "GAME OVER: " + score;
            gameOver = true;
            document.getElementById("restart-btn").style.display = "block";
            clearInterval(timerInterval);
        }
    }, 1000);
}

function setGame() {
    // set up the grid in html
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);  // 1 sec
    setInterval(setPlant, 2000); // 2 sec
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        // 🪓 Mole hit!
        hitSound.currentTime = 0;
        hitSound.play();

        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currPlantTile) {
        // 💀 Hit a plant (game over)
        missSound.currentTime = 0;
        missSound.play();

        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    } else {
        // 👇 Optional: play miss sound if clicked on empty tile
        missSound.currentTime = 0;
        missSound.play();
    }
}

document.getElementById("restart-btn").addEventListener("click", () => {
    score = 0;
    gameOver = false;
    timeLeft = 30;
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("restart-btn").style.display = "none";

    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";
    
    // Restart timer
    timerInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(timerInterval);
            return;
        }
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) {
            document.getElementById("score").innerText = "GAME OVER: " + score;
            gameOver = true;
            document.getElementById("restart-btn").style.display = "block";
            clearInterval(timerInterval);
        }
    }, 1000);
});


