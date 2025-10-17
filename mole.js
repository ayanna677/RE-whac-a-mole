let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 30;
let timerInterval;

// 🎵 Load sounds
const hitSound = new Audio('hit.mp3');
const missSound = new Audio('miss.mp3');
const bgMusic = new Audio('bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

// 🎵 Start background music on first click
document.addEventListener('click', () => {
    bgMusic.play();
}, { once: true });

window.onload = function() {
    setGame();
    startTimer();
    setupRestartButton();
};

function setGame() {
    const board = document.getElementById("board");
    board.innerHTML = ""; // Clear previous tiles if restarting
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        hitSound.currentTime = 0;
        hitSound.play();
        score += 10;
        document.getElementById("score").innerText = score;
    } else if (this == currPlantTile) {
        missSound.currentTime = 0;
        missSound.play();
        endGame();
    } else {
        missSound.currentTime = 0;
        missSound.play();
    }
}

// ⏱ Timer functions
function startTimer() {
    document.getElementById("timer").innerText = timeLeft;
    timerInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(timerInterval);
            return;
        }
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

// 🛑 End game function
function endGame() {
    gameOver = true;
    document.getElementById("score").innerText = "GAME OVER: " + score;
    document.getElementById("restart-btn").style.display = "block";
    clearInterval(timerInterval);
}

// 🔄 Restart button
function setupRestartButton() {
    document.getElementById("restart-btn").addEventListener("click", () => {
        score = 0;
        gameOver = false;
        timeLeft = 30;
        document.getElementById("score").innerText = score;
        document.getElementById("timer").innerText = timeLeft;
        document.getElementById("restart-btn").style.display = "none";

        currMoleTile = null;
        currPlantTile = null;

        setGame();
        startTimer();
    });
}

#game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

#board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
    margin-bottom: 20px;
}

#board div {
    width: 100px;
    height: 100px;
    background-color: #8B4513;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

#restart-btn {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#restart-btn:hover {
    background-color: #ff0000;
}
