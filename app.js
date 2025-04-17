const Gameboard = (function(){
    let rows = 3;
    let columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++){
        board.push(Array(columns).fill(""));
    }

    const getBoard = () => board;

    const placeMove = (row, column, player) => {
        if (!board[row][column]){
            board[row][column] = player.symbol;
        } else {
            console.log(board);
            console.log("Invalid move");
        }
    }

    return {
        getBoard,
        placeMove,
    }
})();

const Game = (function(playerOne = "Player One", playerTwo = "Player Two"){
    let turn = 0;
    let board = Gameboard;
    const players = [
        {
            name: playerOne,
            symbol: "O",
        },
        {
            name: playerTwo,
            symbol: "X",
        }
    ];

    const getActivePlayer = () => players[turn];

    const switchPlayers = () => {
        turn === 0 ? turn = 1 : turn = 0;
        printRound();
    }

    const playRound = (row, column) => {
        board.placeMove(row, column, getActivePlayer());
        switchPlayers();
    }

    const printRound = () => {
        console.log(board.getBoard());
        console.log(`It's ${getActivePlayer().name}'s turn`);
    }

    return {
        getActivePlayer,
        switchPlayers,
        playRound,
        printRound
    }
})();

const gameplay = Game;
console.log(Game.printRound())
console.log(Game.playRound(0, 0));
console.log(Game.playRound(2, 0));
