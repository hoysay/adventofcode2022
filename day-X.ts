// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";

interface Position {
    rowIndex: number;
    colIndex: number;
}

interface QueueItem {
    pos: Position;
    numSteps: number;
}

type Direction = "up" | "down" | "left" | "right";

function canMoveInDirection(heightMap: number[][], currentPosition: Position, dir: Direction): boolean {
    const lastRowIndex = heightMap.length - 1;
    const lastColIndex = heightMap[0].length - 1;

    const { rowIndex, colIndex } = currentPosition;
    const currentValue = heightMap[rowIndex][colIndex];

    if (dir === "up") {
        if (rowIndex === 0) { return false; }

        const upValue = heightMap[rowIndex - 1][colIndex];
        return currentValue + 1 >= upValue;
    } else if (dir === "down") {
        if (rowIndex === lastRowIndex) { return false }


        const downValue = heightMap[rowIndex + 1][colIndex];
        return currentValue + 1 >= downValue;
    } else if (dir === "left") {
        if (colIndex === 0) { return false; }


        const leftValue = heightMap[rowIndex][colIndex - 1];
        return currentValue + 1 >= leftValue;
    } else {
        if (colIndex === lastColIndex) { return false; }

        const rightValue = heightMap[rowIndex][colIndex + 1];
        return currentValue + 1 >= rightValue;
    }
}

// i jankily copied a BFS implementation and applied it here
function findStepCount(heightMap: number[][], start: Position, target: Position): number {
    const queue: QueueItem[] = [{ pos: start, numSteps: 0 }];
    const visitedPositions: Position[] = [];
    
    while (queue.length > 0) {
        const currentItem = queue.shift();
        // console.log("considering item", currentItem)
        const currentPos = currentItem.pos;
        const currentNumSteps = currentItem.numSteps;

        if (visitedPositions.find(pos =>
            pos.colIndex === currentPos.colIndex && pos.rowIndex === currentPos.rowIndex)) {
            // console.log("already seen, ignoring");
            continue;
        }

        visitedPositions.push(currentPos);
        if (currentPos.rowIndex === target.rowIndex && currentPos.colIndex === target.colIndex) {
            return currentNumSteps;
        }

        if (canMoveInDirection(heightMap, currentPos, "up")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex - 1, colIndex: currentPos.colIndex },
                numSteps: currentNumSteps + 1,
            })
        }
        if (canMoveInDirection(heightMap, currentPos, "down")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex + 1, colIndex: currentPos.colIndex },
                numSteps: currentNumSteps + 1,
            })
        }
        if (canMoveInDirection(heightMap, currentPos, "left")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex, colIndex: currentPos.colIndex - 1 },
                numSteps: currentNumSteps + 1,
            })
        }
        if (canMoveInDirection(heightMap, currentPos, "right")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex, colIndex: currentPos.colIndex + 1 },
                numSteps: currentNumSteps + 1,
            })
        }
    }
    return Number.MAX_SAFE_INTEGER
}


function runInput(str: string) {
    // Parse input into a 2-D array representing the height map
    let heightMap: number[][] = [];
    let startPosition: Position | undefined = undefined;
    let endPosition: Position | undefined = undefined;

    const lines = str.split("\n");
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const mapRow: number[] = [];
        const currentLine = lines[lineIndex];

        for (let charIndex = 0; charIndex < currentLine.length; charIndex++) {
            const currentChar = currentLine[charIndex];
            let numberToAdd = currentChar.charCodeAt(0);
            if (currentChar === "S") {
                startPosition = { rowIndex: lineIndex, colIndex: charIndex };
                numberToAdd = "a".charCodeAt(0);
            } else if (currentChar === "E") {
                endPosition = { rowIndex: lineIndex, colIndex: charIndex };
                numberToAdd = "z".charCodeAt(0);
            }
            mapRow.push(numberToAdd);
        }

        heightMap.push(mapRow);
    }

    console.log(heightMap)

    // Find all the locations w/ 'a' as the starting point.
    const potentialStarts:Position[] = [];
    for( let rowIndex = 0; rowIndex < heightMap.length; rowIndex++) {
        for (let colIndex = 0; colIndex < heightMap[0].length; colIndex++) {
            if (heightMap[rowIndex][colIndex] === 97) {
                // 'a' corresponds to 97, i didn't translate down to zero-index lol
                potentialStarts.push({rowIndex, colIndex})
            }
        }
    }

    // uhh there are like 600+, so hopefully this finishes quickly :^) 
    console.log(potentialStarts.length);

    const allResults: number[] = [];
    for (let i =0 ; i < potentialStarts.length; i++) {
        console.log("on potential start", i)
        allResults.push(findStepCount(heightMap, potentialStarts[i], endPosition))
    }
    console.log(allResults.sort((a,b)=>a-b)[0])
}

/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
    runInput(realInput);
