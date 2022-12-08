// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";

function isTreeVisible(allTrees: number[][], rowIndex: number, colIndex: number): boolean {
    // Check obvious edge cases
    const numRows = allTrees.length;
    const numCols = allTrees[0].length;
    if (rowIndex === 0 || rowIndex === numRows - 1) {
        return true;
    } else if (colIndex === 0 || colIndex === numCols - 1) {
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

function getTreeScore(allTrees: number[][], rowIndex: number, colIndex: number): number {
    // Check obvious edge cases
    const numRows = allTrees.length;
    const numCols = allTrees[0].length;
    const currentValue = allTrees[rowIndex][colIndex];

    // TOP
    let topScore = 0;
    for (let i = rowIndex - 1; i >= 0; i--) {
        topScore++;
        const comparedValue = allTrees[i][colIndex];
        if (comparedValue >= currentValue) {
            break;
        }
    }

    // DOWN
    let bottomScore = 0;
    for (let i = rowIndex + 1; i < numRows; i++) {
        bottomScore++
        const comparedValue = allTrees[i][colIndex];
        if (comparedValue >= currentValue) {
            break;
        }
    }

    // LEFT
    let leftScore = 0;
    for (let j = colIndex - 1; j >= 0; j--) {
        leftScore++;
        const comparedValue = allTrees[rowIndex][j];
        if (comparedValue >= currentValue) {
            break;
        }
    }

    // RIGHT
    let rightScore = 0;
    for (let j = colIndex + 1; j < numCols; j++) {
        rightScore++;
        const comparedValue = allTrees[rowIndex][j];
        if (comparedValue >= currentValue) {
            break;
        }
    }

    console.log("top", topScore, "bottom", bottomScore, "left", leftScore, "right", rightScore)
    return topScore * bottomScore * leftScore * rightScore;


}

function runInput(str: string) {
    const trees: number[][] = [];

    const rows = str.split("\n");
    rows.forEach((elem, index) => {
        const contents: number[] = [];
        for (let i = 0; i < elem.length; i++) {
            contents.push(parseInt(elem[i]));
        }
        trees[index] = contents;
    })

    let bestScore = 0;

    for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
        for (let colIndex = 0; colIndex < trees[0].length; colIndex++) {
            console.log(rowIndex, colIndex, "----", trees[rowIndex][colIndex])

            // const isVisible = isTreeVisible(trees, rowIndex, colIndex)
            // if (isVisible) {
            //     total++;
            // }
            const currentScore = getTreeScore(trees, rowIndex, colIndex);
            if (currentScore > bestScore) {
                bestScore = currentScore;
            }
        }
    }

    console.log(bestScore);
}


/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(realInput);
