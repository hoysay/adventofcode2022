// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";

interface Position {
    rowIndex: number;
    colIndex: number;
}

// Takes input of "R 4\nU 4..", and returns discrete one-distance moves.
function getHeadMoves(inputStr: string): string[] {
    const result: string[] = [];

    const lines = inputStr.split("\n");
    lines.forEach(elem => {
        const pieces = elem.split(" ");
        const numSteps = parseInt(pieces[1]);
        for (let i = 0; i < numSteps; i++) {
            result.push(pieces[0]);
        }
    })

    return result;
}

// return new Tail Position
function getTailPosition(newHeadPosition: Position, tailPosition: Position): Position {
    // Same node => OK, no move necessary
    if (newHeadPosition.rowIndex === tailPosition.rowIndex && newHeadPosition.colIndex === tailPosition.colIndex) {
        return tailPosition;
    }

    // Adjacent => OK, no move necessary
    const rowDiff = Math.abs(newHeadPosition.rowIndex - tailPosition.rowIndex);
    const colDiff = Math.abs(newHeadPosition.colIndex - tailPosition.colIndex);
    if (rowDiff <= 1 && colDiff <= 1) {
        return tailPosition
    }

    // Otherwise, need to move Tail to 'catch up'
    if (rowDiff === 0) {
        if (newHeadPosition.colIndex > tailPosition.colIndex) {
            return {
                rowIndex: tailPosition.rowIndex,
                colIndex: tailPosition.colIndex + 1,
            }
        } else {
            return {
                rowIndex: tailPosition.rowIndex,
                colIndex: tailPosition.colIndex - 1,
            }
        }
    } else if (colDiff === 0) {
        if (newHeadPosition.rowIndex > tailPosition.rowIndex) {
            return {
                rowIndex: tailPosition.rowIndex + 1,
                colIndex: tailPosition.colIndex,
            }
        } else {
            return {
                rowIndex: tailPosition.rowIndex - 1,
                colIndex: tailPosition.colIndex,
            }
        }
    } else { // 'not touching, and aren't in same row or column' => tail always moves 1 step diagonally to keep up
        // which direction (NW, NE, SE, SW) to go?
        if (newHeadPosition.rowIndex < tailPosition.rowIndex) {
            if (newHeadPosition.colIndex < tailPosition.colIndex) {
                return { // NW
                    rowIndex: tailPosition.rowIndex - 1,
                    colIndex: tailPosition.colIndex - 1,
                }
            } else {
                return { // NE
                    rowIndex: tailPosition.rowIndex - 1,
                    colIndex: tailPosition.colIndex + 1,
                }
            }
        } else {
            if (newHeadPosition.colIndex < tailPosition.colIndex) {
                return { // SW
                    rowIndex: tailPosition.rowIndex + 1,
                    colIndex: tailPosition.colIndex - 1,
                }
            }
            else {
                return { // SE
                    rowIndex: tailPosition.rowIndex + 1,
                    colIndex: tailPosition.colIndex + 1,
                }
            }
        }
    }
}

function runInput(str: string) {
    const allHeadMoves = getHeadMoves(str);
    
    const tailVisitedLocations = new Set<string>();

    // Start at {1000, 1000} to account for potential changes in direction
    let headPosition: Position = { rowIndex: 1000, colIndex: 1000 };
    let tailPosition: Position = { rowIndex: 1000, colIndex: 1000 };
    console.log(headPosition, tailPosition)

    tailVisitedLocations.add("1000-1000");

    allHeadMoves.forEach(move => {
        console.log("----")
        // console.log("head", headPosition, "tail", tailPosition);
        console.log(move);

        // Calculate new Head Position
        if (move === "R") {
            headPosition.colIndex += 1;
        } else if (move === "L") {
            headPosition.colIndex -= 1;
        } else if (move === "U") {
            headPosition.rowIndex -= 1;
        } else { // D
            headPosition.rowIndex += 1;
        }

        const newTailPosition = getTailPosition(headPosition, tailPosition);
        console.log("new head", headPosition, "new tail", newTailPosition);
        tailPosition = newTailPosition;

        tailVisitedLocations.add(`${newTailPosition.rowIndex}-${newTailPosition.colIndex}`)



    });

    console.log(tailVisitedLocations.size);

}


/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(realInput);
