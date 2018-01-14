


// let StartingFullGrid =
//     [[1,2,3,4,5,6,7,8,9],
//         [4,5,6,7,8,9,1,2,3],
//         [7,8,9,1,2,3,4,5,6],
//         [0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0]];
//
let HowManyTimes;
let DoneGrid;
let DonePossible;
let Finished;
let EndTime;
let tooLong;
let StartTime;
let backUpGrid = [];


function setUp() {


    HowManyTimes = 0;
    DoneGrid = [];
    DonePossible = [];
    Finished = 0;
    tooLong = false;
    let StartingFullGrid = TableToArray();

    // let StartingFullGrid =
    //        [[0,0,2,7,0,0,6,9,0],
    //         [0,0,0,0,1,0,4,0,0],
    //         [0,0,0,5,2,0,0,0,0],
    //         [6,1,0,0,0,0,0,2,0],
    //         [2,0,8,6,0,1,5,0,9],
    //         [0,9,0,0,0,0,0,6,7],
    //         [0,0,0,0,6,5,0,0,0],
    //         [0,0,9,0,8,0,0,0,0],
    //         [0,5,1,0,0,9,8,0,0]];
    StartTime = Date.now();
    let StartingPossible = make2DArray(9, 9);
    let FillPossible = [1, 2, 3, 4, 5, 6, 7, 8, 9];



    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (StartingFullGrid[i][j] === 0) {
                StartingPossible[i][j] = FillPossible.slice();
            } else {
                StartingPossible[i][j] = [];
            }
        }
    }


    while (!Finished) {
        Finished = 1;

//Remove Rows
        [StartingPossible, StartingFullGrid] = removeRow(StartingPossible, StartingFullGrid);


// Remove Cols
        [StartingPossible, StartingFullGrid] = removeCol(StartingPossible, StartingFullGrid);


// Remove Squares
        [StartingPossible, StartingFullGrid] = removeSquare(StartingPossible, StartingFullGrid);

// Update StartingFullGrid
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let Checking = StartingPossible[i][j];
                if ((Checking.length) === 1) {
                    Finished = 0;
                    StartingFullGrid[i][j] = Checking[0];
                }
            }
        }

        //console.log(console.table(StartingFullGrid))
        if (Finished) {
            [Done, _ignore, _ignore] = finalCheck(StartingFullGrid, StartingPossible);

            if (Done) {
                DoneGrid = StartingFullGrid;
                break
            } else {
                TryOption2(StartingPossible.slice(), StartingFullGrid.slice(), 0, 1);
            }
        }
    }

    // console.log(console.table(DoneGrid));
    console.log(HowManyTimes);
    if (DoneGrid.length !== 0) {
        drawTable(DoneGrid);
    } else {
        alert('Sorry, a solution couldnt be found');
    }

}


function drawTable(doneGrid) {
    if (doneGrid. length > 1) {
        let text = "";
        let table = document.getElementById('table');
        for (let i = 0; i < 9; i++) {
            text += '<tr>';
            for (let j = 0; j < 9; j++) {
                text += '<td>' + '<input type="text" name="' + i + '' + j + '" maxlength="1" size="2" value="' + doneGrid[i][j] + '"/></td>';
            }
            text += '</tr>';
        }
        table.innerHTML = text;
    }
}


function inputTable() {
    let text = "";
    let table = document.getElementById('table');
    for(let i = 0; i < 9; i++){
        if (i === 3 || i === 6) {
            text+='<tr class="horizontalSep">';
        } else {
            text+='<tr>';
        }
        for(let j = 0; j < 9; j++){
            text+='<td';
            if (j === 3 || j === 6) {
                text+= ' class="verticalSep"';
            }
            text+= '><input type="text" name="'+i +'' +j +'" maxlength="1" size="2" value=""/></td>';

        }
        text+='</tr>';
    }
    table.innerHTML = text;
}


