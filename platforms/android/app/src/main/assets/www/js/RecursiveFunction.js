function TryOption2(BackupPossible, GridSoFar, Full, ValidSoFar) {
    HowManyTimes++;
    if (HowManyTimes % 1000 === 0) {
        EndTime = (Date.now() - StartTime) / 1000;
        if (EndTime > 5) {
            tooLong =  !(confirm("This may take some time. Press Ok if you wish to continue"));

            if (!tooLong) {
                StartTime = Date.now();
            }
        }
    }






    let Possible = BackupPossible.map(function(arr) {
        return arr.slice();
    });

    let FullGrid = GridSoFar.map(function(arr) {
        return arr.slice();
    });

    if (!Full && ValidSoFar && (DoneGrid.length === 0) && (DonePossible.length === 0)) {
        // Get the poision of first multi option square
        let Found = 0;
        for (var p = 0; p < 9; p++) {
            for (var q = 0; q < 9; q++) {
                if ((BackupPossible[p][q].length > 1) && Found === 0) {
                    Found = 1;
                    break
                }
            }
            if (Found) {
                break
            }
        }

        if (!Found) {
            p = 8;
            q = 8;
        }
        // Set the guess options
        let StartOptions = BackupPossible[p][q];

        for (let Guess = 0; Guess < StartOptions.length; Guess++) {
            Possible = BackupPossible.map(function(arr) {
                return arr.slice();
            });

            FullGrid = GridSoFar.map(function(arr) {
                return arr.slice();
            });

            Possible[p][q] = [StartOptions[Guess]];
            let Finished = 0;

            while (!Finished) {
                //                        drawTable(FullGrid);

                Finished = 1;

                //Remove Rows
                [Possible, FullGrid] = removeRow(Possible, FullGrid);


                // Remove Cols
                [Possible, FullGrid] = removeCol(Possible, FullGrid);


                // Remove Squares
                [Possible, FullGrid] = removeSquare(Possible, FullGrid);

                // Update FullGrid
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        let Checking = Possible[i][j];
                        if ((Checking.length) === 1) {
                            Finished = 0;
                            FullGrid[i][j] = Checking[0];
                        }
                    }
                }

                if (Finished) {
                    [Done, Full, ValidSoFar] = finalCheck(FullGrid, Possible);

                    if (Done) {
                        DoneGrid = FullGrid;
                        DonePossible = Possible;
                        return;
                    } else if (!ValidSoFar) {
                        break;
                    } else {
                        TryOption2(Possible, FullGrid, Full, ValidSoFar);
                        if ((DoneGrid.length) && (DonePossible.length) || tooLong) {
                            return;
                        }
                    }
                }
            }

        }
    }
}