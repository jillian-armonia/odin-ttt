const Gameboard = (function(){
    let rows = 3;
    let columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++){
        board.push(Array(columns).fill(""));
    }

    const getBoard = () => board;

    const placeMove = (row, column, player) => {
        board[row][column] = player.symbol;
    }

    const checkAvailable = () => {
        let counter = 0;
        board.forEach(row => row.forEach(cell => {
            if (!cell) counter++;
        }));
        return counter;
    }

    return {
        getBoard,
        placeMove,
        checkAvailable,
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
        if (!board.getBoard()[row][column]){
            let logic = GameLogic(board, row, column, getActivePlayer());
            board.placeMove(row, column, getActivePlayer());
            if (logic.winOrTie()){
                console.log(board.getBoard());
                return
            } else switchPlayers();
        } else {
            printRound();
            console.log("Last move was invalid")
        }

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

const GameLogic = function(gameboard, row, column, player){
    const winMessage = `${player.name} wins!`;
    const tieMessage = `It's a tie!`;
    const board = gameboard.getBoard();

    const checkRow = () => {
        if (board[row].every(value => value == player.symbol)) return player.symbol;
        else false;
    };

    const checkColumn = () => {
        for (let i = 0; i < 3; i++){
            if (board[i][column] !== player.symbol) return false;
        }
        return player.symbol;
    };

    const checkDiag = () => {
        let diag1 = [[0, 0], [2, 2]];
        let diag2 = [[0, 2], [2, 0]];

        if (board[1][1] == player.symbol){
            if (diag1.every(pair => board[pair[0]][pair[1]] == player.symbol) || diag2.every(pair => board[pair[0]][pair[1]] == player.symbol)){
                return player.symbol;
            } else false
        }

    }

    const winOrTie = () => {
        if (checkRow() || checkColumn() || checkDiag()){
            console.log(winMessage);
            return true;
        } else if (gameboard.checkAvailable() <= 0){
            console.log(tieMessage);
            return true;
        } else return false;
    };

    return {
        winOrTie,
    }
}

const gameplay = Game;
gameplay.playRound(2,0);
gameplay.playRound(0,2);
gameplay.playRound(1,1);
gameplay.playRound(2,2);
gameplay.playRound(1,2);
gameplay.playRound(1,0);
gameplay.playRound(0,1);
gameplay.playRound(2,1);
gameplay.playRound(0,0);
