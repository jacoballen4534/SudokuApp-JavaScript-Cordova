function make2DArray (rows, cols){
    let arr = new Array (rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr
}


function checkRow (PossibleRow, FilledRow) {
    let CantBeInRow = [];
    for (let i = 0; i < 9; i++) {
        if (FilledRow[i] !== 0) {
            CantBeInRow.push(FilledRow[i]);
        }
    }

    for (let j = 0; j < 9; j++) {
        let RemoveFrom = PossibleRow[j];
        if (RemoveFrom.length) {
            for (let p = 0; p < CantBeInRow.length; p++) {
                for (let q = RemoveFrom.length; q >= 0; q--) {
                    if (RemoveFrom[q] === CantBeInRow[p]) {
                        RemoveFrom.splice(q, 1);
                    }
                }
            }
        }
        PossibleRow[j] = RemoveFrom.slice();
    }
    return PossibleRow;
}

function removeRow(Possible, FullGrid) {
    for (let i = 0; i < 9; i++) {
        Possible[i] = checkRow(Possible[i], FullGrid[i]);
    }
    return [Possible, FullGrid];
}

function removeCol(Possible, FullGrid) {
    for (let i = 0; i < 9; i++) {
        let PossibleCol = [];
        let FullGridCol = [];

        for (let j = 0; j < 9; j++) {
            PossibleCol[j] = Possible[j][i];
            FullGridCol[j] = FullGrid[j][i]
        }
        PossibleCol = checkRow(PossibleCol, FullGridCol);

        for (let j = 0; j < 9; j++) {
            Possible[j][i] = PossibleCol[j];
        }

    }
    return [Possible, FullGrid];
}

function removeSquare(Possible, FullGrid) {
    let PossibleSquare = [];
    let FullGridSquare = [];
    let countin;
    let countout;

    for (let row = 3; row <= 9; row += 3) {
        for (let col = 3; col <= 9; col += 3) {
            countin = 0;
            for (let i = row - 3; i < row; i++) {
                for (let j = col - 3; j < col; j++) {
                    PossibleSquare[countin] = Possible[i][j];
                    FullGridSquare[countin] = FullGrid[i][j];
                    countin++;
                }
            }
            PossibleSquare = checkRow(PossibleSquare, FullGridSquare);

            countout = 0;
            for (let p = row - 3; p < row; p++) {
                for (let q = col - 3; q < col; q++) {
                    Possible[p][q] = PossibleSquare[countout];
                    countout++;
                }
            }
        }
    }
    return [Possible, FullGrid];
}



function finalCheck(FullGrid) {
    let Done = 0;
    let ValidSoFar = 1;
    let Full = 1;

    for (let CheckRow = 0; CheckRow < 9; CheckRow++) {
        for (let CheckCol = 0; CheckCol < 9; CheckCol++) {
            if (FullGrid [CheckRow][CheckCol] === 0) {
                Full = 0;
                break;
            }
        }
        if (!Full) {
            break
        }
    }

    if (Full) {
        let ValidRow = 0;
        let ValidCol = 0;
        let ValidSquare = 0;
        let FullGridCol = [];
        //Check Rows and Cols
        for (let i = 0; i < 9; i++) {
            ValidRow += (CheckIfValid(FullGrid[i]));

            for (let j = 0; j < 9; j++) {
                FullGridCol[j] = FullGrid[j][i]
            }
            ValidCol += (CheckIfValid(FullGridCol));
        }

        // Check Squares
        let countin;
        let FullGridSquare = [];
        for (let row = 3; row <= 9; row += 3) {
            for (let col = 3; col <= 9; col += 3) {
                countin = 0;
                for (let i = row - 3; i < row; i++) {
                    for (let j = col - 3; j < col; j++) {
                        FullGridSquare[countin] = FullGrid[i][j];
                        countin++;
                    }
                }
                ValidSquare += (CheckIfValid(FullGridSquare));
            }
        }

        let ProperFinished = (ValidRow === 9) && (ValidCol === 9) && (ValidSquare === 9);

        if (!ProperFinished) {
            ValidSoFar = 0;
        }

        if (ProperFinished && ValidSoFar) {
            Done = 1;
        }
    }
    return [Done, Full, ValidSoFar];
}


function CheckIfValid(checking) {
    let Valid = 1;
    for (let i = 1; i < 10; i++) {
        let Count = 0;
        for (let j = 0; j < 9; j++) {
            if (checking[j] !== i) {
                Count++;
            }
        }

        if (Count !== 8) {
            Valid = 0;
            return Valid
        }
    }
    return Valid
}


function TableToArray() {
    let StartingFullGrid = [];

    for (let i = 0; i < 9; i++) {
        StartingFullGrid[i] = [];
        backUpGrid[i] = [];

        for (let j = 0; j < 9; j++) {
            let number = parseInt(document.getElementsByName(i + '' +j)[0].value);
            if (isNaN(number)) {
                StartingFullGrid [i][j] = 0;
                backUpGrid [i][j] = '';
            } else {
                StartingFullGrid [i][j] = number;
                backUpGrid [i][j] = number;
            }
        }
    }
    return StartingFullGrid;
}

