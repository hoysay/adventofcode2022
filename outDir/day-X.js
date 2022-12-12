"use strict";
// tsc && node ./outDir/day-X.js
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function canMoveInDirection(heightMap, currentPosition, dir) {
    const lastRowIndex = heightMap.length - 1;
    const lastColIndex = heightMap[0].length - 1;
    const { rowIndex, colIndex } = currentPosition;
    const currentValue = heightMap[rowIndex][colIndex];
    if (dir === "up") {
        if (rowIndex === 0) {
            return false;
        }
        const upValue = heightMap[rowIndex - 1][colIndex];
        return currentValue + 1 >= upValue;
    }
    else if (dir === "down") {
        if (rowIndex === lastRowIndex) {
            return false;
        }
        const downValue = heightMap[rowIndex + 1][colIndex];
        return currentValue + 1 >= downValue;
    }
    else if (dir === "left") {
        if (colIndex === 0) {
            return false;
        }
        const leftValue = heightMap[rowIndex][colIndex - 1];
        return currentValue + 1 >= leftValue;
    }
    else {
        if (colIndex === lastColIndex) {
            return false;
        }
        const rightValue = heightMap[rowIndex][colIndex + 1];
        return currentValue + 1 >= rightValue;
    }
}
function findStepCount(heightMap, start, target) {
    const queue = [{ pos: start, numSteps: 0 }];
    const visitedPositions = [];
    while (queue.length > 0) {
        const currentItem = queue.shift();
        console.log("considering item", currentItem);
        const currentPos = currentItem.pos;
        const currentNumSteps = currentItem.numSteps;
        if (visitedPositions.find(pos => pos.colIndex === currentPos.colIndex && pos.rowIndex === currentPos.rowIndex)) {
            console.log("already seen, ignoring");
            continue;
        }
        visitedPositions.push(currentPos);
        if (currentPos.rowIndex === target.rowIndex && currentPos.colIndex === target.colIndex) {
            // We made it
            return currentNumSteps;
        }
        if (canMoveInDirection(heightMap, currentPos, "up")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex - 1, colIndex: currentPos.colIndex },
                numSteps: currentNumSteps + 1,
            });
        }
        if (canMoveInDirection(heightMap, currentPos, "down")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex + 1, colIndex: currentPos.colIndex },
                numSteps: currentNumSteps + 1,
            });
        }
        if (canMoveInDirection(heightMap, currentPos, "left")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex, colIndex: currentPos.colIndex - 1 },
                numSteps: currentNumSteps + 1,
            });
        }
        if (canMoveInDirection(heightMap, currentPos, "right")) {
            queue.push({
                pos: { rowIndex: currentPos.rowIndex, colIndex: currentPos.colIndex + 1 },
                numSteps: currentNumSteps + 1,
            });
        }
    }
    return Number.MAX_SAFE_INTEGER;
}
function runInput(str) {
    // Parse input into a 2-D array representing the height map
    let heightMap = [];
    let startPosition = undefined;
    let endPosition = undefined;
    const lines = str.split("\n");
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const mapRow = [];
        const currentLine = lines[lineIndex];
        for (let charIndex = 0; charIndex < currentLine.length; charIndex++) {
            const currentChar = currentLine[charIndex];
            let numberToAdd = currentChar.charCodeAt(0);
            if (currentChar === "S") {
                startPosition = { rowIndex: lineIndex, colIndex: charIndex };
                numberToAdd = "a".charCodeAt(0);
            }
            else if (currentChar === "E") {
                endPosition = { rowIndex: lineIndex, colIndex: charIndex };
                numberToAdd = "z".charCodeAt(0);
            }
            mapRow.push(numberToAdd);
        }
        heightMap.push(mapRow);
    }
    console.log(heightMap);
    console.log(findStepCount(heightMap, startPosition, endPosition));
    //     if (!startPosition || !endPosition) { return; }
    //     console.log(stepsToTarget(heightMap, startPosition, endPosition, [startPosition]))
    // }
}
/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(input_1.realInput);
//# sourceMappingURL=day-X.js.map