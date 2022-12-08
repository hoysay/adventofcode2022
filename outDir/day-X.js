"use strict";
// tsc && node ./outDir/day-X.js
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function isTreeVisible(allTrees, rowIndex, colIndex) {
    // Check obvious edge cases
    const numRows = allTrees.length;
    const numCols = allTrees[0].length;
    if (rowIndex === 0 || rowIndex === numRows - 1) {
        return true;
    }
    else if (colIndex === 0 || colIndex === numCols - 1) {
        return true;
    }
    const currentValue = allTrees[rowIndex][colIndex];
    // TOP
    let isVisibleFromTop = true;
    for (let i = rowIndex - 1; i >= 0; i--) {
        const comparedValue = allTrees[i][colIndex];
        if (comparedValue >= currentValue) {
            isVisibleFromTop = false;
            // console.log(rowIndex, colIndex, "blocked on top", comparedValue, currentValue)
            break;
        }
    }
    // DOWN
    let isVisibleFromBottom = true;
    for (let i = rowIndex + 1; i < numRows; i++) {
        const comparedValue = allTrees[i][colIndex];
        if (comparedValue >= currentValue) {
            isVisibleFromBottom = false;
            break;
        }
    }
    // LEFT
    let isVisibleFromLeft = true;
    for (let j = colIndex - 1; j >= 0; j--) {
        const comparedValue = allTrees[rowIndex][j];
        if (comparedValue >= currentValue) {
            isVisibleFromLeft = false;
            break;
        }
    }
    // RIGHT
    let isVisibleFromRight = true;
    for (let j = colIndex + 1; j < numCols; j++) {
        const comparedValue = allTrees[rowIndex][j];
        if (comparedValue >= currentValue) {
            isVisibleFromRight = false;
            break;
        }
    }
    // console.log("top", isVisibleFromTop, "bottom", isVisibleFromBottom, "left", isVisibleFromLeft, "right", isVisibleFromRight)
    return isVisibleFromRight || isVisibleFromBottom || isVisibleFromLeft || isVisibleFromTop;
}
function runInput(str) {
    // 1. GET TREES
    const trees = [];
    const rows = str.split("\n");
    rows.forEach((elem, index) => {
        const contents = [];
        for (let i = 0; i < elem.length; i++) {
            contents.push(parseInt(elem[i]));
        }
        trees[index] = contents;
    });
    let total = 0;
    for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
        for (let colIndex = 0; colIndex < trees[0].length; colIndex++) {
            // console.log(rowIndex, colIndex);
            const isVisible = isTreeVisible(trees, rowIndex, colIndex);
            if (isVisible) {
                total++;
            }
        }
    }
    console.log(total);
}
/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(input_1.realInput);
//# sourceMappingURL=day-X.js.map