const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartBtn = document.getElementById("restartBtn");

const clickSound = new Audio("ting.mp3");
const winSound = new Audio("music.mp3");
const drawSound=new Audio("gameover.mp3");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["","","","","","","","",""];

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

function handleCellClick(e){
    const index = e.target.dataset.index;

    if(gameState[index] !== "" || !gameActive) return;

    clickSound.currentTime = 0;
    clickSound.play();

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);

    checkWinner();
}

function checkWinner(){
    let roundWon = false;

    winningCombinations.forEach(combination=>{
        const [a,b,c] = combination;

        if(gameState[a] && 
           gameState[a] === gameState[b] && 
           gameState[a] === gameState[c]){

            roundWon = true;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
        }
    });

    if(roundWon){
        
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        winSound.play();
        return;
    }

    if(!gameState.includes("")){
         drawSound.play();
        statusText.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame(){
    winSound.pause();
    currentPlayer = "X";
    gameActive = true;
    gameState = ["","","","","","","","",""];
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent = "";
        cell.classList.remove("X","O","winner");
    });
}