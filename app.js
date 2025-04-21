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

const Game = (function(){
    let turn = 0;
    let board = Gameboard;
    const players = [
            {
                name: "Player One",
                symbol: "O",
            },
            {
                name: "Player Two",
                symbol: "X",
            }
        ];

    const setPlayerName = (playerOne, playerTwo) => {
        players[0].name = playerOne;
        players[1].name = playerTwo;
    };

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
        setPlayerName,
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

const Screen = (function(){
    const screenContainer = document.querySelector("#screen-container");
    const textContainer = document.querySelector("#text-container");
    const game = Game;

    //Create an initial game board
    const initialize = () => {
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                let tile = document.createElement("div");
                tile.innerText = "Y";
                tile.id =  `row-${row}_col-${col}`;
                screenContainer.appendChild(tile);
            }
        }

        let player1 = prompt("Set player 1's name");
        let player2 = prompt("Set player 2's name");

        if (player1 && player2) game.setPlayerName(player1, player2);
        const playerTurn = document.createElement("h2");
        playerTurn.id = "player-turn";
        textContainer.appendChild(playerTurn);
        changePlayers();

    }

    const changePlayers = () => {
        const playerTurn = document.querySelector("#player-turn");
        playerTurn.innerText = `It's ${game.getActivePlayer().name}'s turn`;
    }

    const updateMove = (selectedTile) => {
        selectedTile.innerText = game.getActivePlayer().symbol;
        let rowCol = selectedTile.id.match(/\d+/g);
        game.playRound(Number(rowCol[0]), Number(rowCol[1]));

    }

    //displayMessage function with message parameter
        //Create a dialog element
        //Set the innerHTML of the dialog with a <p> message and a close <button>
    return {
        initialize,
        changePlayers,
        updateMove,
    }
})();

window.addEventListener("load", Screen.initialize())
document.addEventListener("click", (e) => {
    if (e.target.parentNode.id == "screen-container" && e.target.innerText == "Y"){
        Screen.updateMove(e.target);
    }
})
