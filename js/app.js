//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8,],// rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],// columns
    [0, 4, 8], [2, 4, 6]// diagonals

]
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let squareIndex;



/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board');
//console.log(squareELs)
//console.log(messageEL)
// create the reset button
const resetBtnEl = document.createElement('button');
resetBtnEl.id = 'reset';
resetBtnEl.textContent = 'Reset Game';

document.body.appendChild(resetBtnEl);
/*-------------------------------- Functions --------------------------------*/

function init() {
    board = Array(9).fill('');
    //board = ['X', 'O','', 'X', 'O','','X','O','X'];
    turn = "X"; // current Player
    winner = false;
    tie = false;
    render();
    
    console.log('reset button clicked!')
}
init();
// It's task to render Dom elements and see the status of the game
function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((mark, index) => {
        const square = squareEls[index];
        square.textContent = mark
    })
}

function updateMessage() {
    if (winner === true && tie === false) {
        messageEl.textContent = `Congratulations ${turn} wins!`
    } else if (winner === false && tie === true) {
        messageEl.textContent = 'Its a tie!'
    } else if (winner === false && tie === false) {
        messageEl.textContent = `Current turn : ${turn}`
    }
}

function handleClick(event) {

    squareIndex = (parseInt(event.target.id))
    //console.log(board[squareIndex],"if has value")
    if (board[squareIndex] || winner === true) return;

    placePiece(squareIndex);
    checkForWinner();
    checkforTie();
    switchPlayerTurn();
    render();
    
}

function placePiece(index) {
    board[index] = turn
    console.log(board)
}

function checkForWinner() {
    for (const combo of winningCombos) {
        //console.log(combo);
        const [a,b,c] =combo;
        if(board[a] && board[a]===board[b]&& board[b]===board[c]) {
            winner = true;
            console.log('winner:' + winner);
            return;
        }
    }
}
function checkforTie() {
    if (winner === true) return;
    tie = board.every(square => square !== "");
    //console.log("Tie:" + tie);
}
function switchPlayerTurn() {
    if (winner) return;
    // turnary operator
    turn = turn === "X" ? "O" : "X"
// variable = if the condition true  pass this value: else this one
console.log('current turn:' + turn);
}

/*----------------------------- Event Listeners -----------------------------*/
//boardContainer.addEventListener('click',handleClick)
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);

})

resetBtnEl.addEventListener('click',init);



