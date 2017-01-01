const kBoardSize = 8; // Width and height of board
const kMoves = [
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1]
]

function checkBoard(board) {
    var open = [];
    for (var i = 0; i < board.length; i++) {
        for (var k = 0; k < board[i].length; k++) {
            if (!board[i][k]) {
                open.push([i,k]);
            }
        }
    }
    return {
        open: open
    }
}

function cloneArray(arr) {
    return arr.map(function(subArr) {
        return subArr.slice();
    });
}

function move(board, loc, moves) {
    let nBoard = cloneArray(board); // Clone board so we aren't usingj an old board
    let nMoves = cloneArray(moves);
    nMoves.push(loc);               // add this space to moves history
    nBoard[loc[0]][loc[1]] = true;  // set this as visited

    var boardStatus = checkBoard(nBoard);

    // End condition (last turn)
    if (boardStatus.open.length == 1) {
        console.log('last move');
        console.log(moves);
        let last = boardStatus.open[0];
        // piece is reachable on the x axis
        if (Math.abs(last[0]-loc[0]) == 1) {
            // piece is reachable on the y axis
            if (Math.abs(last[1]-loc[1]) == 2) {
                console.log('Game over. Win!');
                process.exit(0);
            } else {
                console.log('Game over. Loss!');
            }
        } else if (Math.abs(last[0]-loc[0]) == 2) {
            if (Math.abs(last[1]-loc[1]) == 1) {
                console.log('Game over. Win!');
                process.exit(0);
            } else {
                console.log('Game over. Loss!');
            }
        } else {
            console.log('Game over. Loss!');
        }
        return;
    }

    for (var i = 0; i < kMoves.length; i++) {
        let col = kMoves[i][0]+loc[0],
            row = kMoves[i][1]+loc[1];

        // if space exists
        if (nBoard[col] != undefined && nBoard[col][row] != undefined) {
            if (nBoard[col][row] == false) { // space hasn't been visited
                move(nBoard, [col, row], nMoves);
            }
        }
    }
}

// Create the board
var board = new Array(kBoardSize);
for (var i = 0; i < board.length; i++) {
    board[i] = new Array(kBoardSize);
    for (var k = 0; k < board[i].length; k++) {
        board[i][k] = false;
    }
}

move(board, [0,0], [])
