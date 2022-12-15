// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";

type CaveItem = "rock" | "air" | "sand" | "source";

class Cave {
    data: CaveItem[][];
    minColIndex: number;

    // Input is True for rock, False for air
    constructor(parsedBools: boolean[][], minColIndex: number) {
        this.data = [];
        for (let rowIndex = 0; rowIndex < parsedBools.length; rowIndex++) {
            const rowItems: CaveItem[] = []
            for (let colIndex = 0; colIndex < parsedBools[0].length; colIndex++) {
                rowItems.push(parsedBools[rowIndex][colIndex] ? "rock" : "air");
            }
            this.data.push(rowItems);
        }

        this.data[0][500] = "source"

        this.minColIndex = minColIndex;
    }

    printCave(startRow?: number) {
        const numRows = this.data.length;
        const numCols = this.data.length > 0 ? this.data[0].length : 0;

        for (let rowIndex = startRow ?? 0; rowIndex < numRows; rowIndex++) {
            let rowString = "";
            for (let colIndex = this.minColIndex; colIndex < numCols; colIndex++) {
                const currentItem = this.data[rowIndex][colIndex];
                if (currentItem === "rock") {
                    rowString += "#"
                } else if (currentItem === "air") {
                    rowString += "."
                } else if (currentItem === "sand") { rowString += "o" }
                else { rowString += "+" }
            }
            console.log(rowString);
        }
    }

    // Return true if the sand reaches abyss
    dropSand(): boolean {
        let currentIndex = { rowIndex: 0, colIndex: 500 };

        let nextIndex = this.dropSandHelper(currentIndex);
        while (nextIndex.rowIndex !== currentIndex.rowIndex || nextIndex.colIndex !== currentIndex.colIndex) {
            // We're able to drop to a new place
            currentIndex = nextIndex;
            nextIndex = this.dropSandHelper(currentIndex);
        }


        // Not able to drop anymore
        if (this.isAbyss(nextIndex)) {
            return true;
        } else {
            this.data[nextIndex.rowIndex][nextIndex.colIndex] = "sand";
            return false;
        }
    }

    // Take in a current index, return the next location for the grain.
    dropSandHelper(currentIndex: CaveIndex): CaveIndex {
        // console.log("in drop helper", currentIndex)
        // If we're in the abyss, return starting position (b/c it's 'staying still')
        if (this.isAbyss(currentIndex)) {
            console.log("is abyss", currentIndex);
            return currentIndex;
        }


        // If the space directly below the currentIndex is 'air', fall there.
        const directlyBelow = { rowIndex: currentIndex.rowIndex + 1, colIndex: currentIndex.colIndex };
        if (this.isAir(directlyBelow)) {
            return directlyBelow;
        }

        // Otherwise if the space down-left is 'air', fall there
        const downLeft = { rowIndex: currentIndex.rowIndex + 1, colIndex: currentIndex.colIndex - 1 };
        if (this.isAir(downLeft)) {
            return downLeft;
        }

        // Otherwise if the space down-right is 'air', fall there
        const downRight = { rowIndex: currentIndex.rowIndex + 1, colIndex: currentIndex.colIndex + 1 };
        if (this.isAir(downRight)) {
            return downRight;
        }

        // blocked
        return currentIndex;
    }

    isAbyss(index: CaveIndex) {
        return index.rowIndex >= this.data.length - 1;
    }

    isAir(index: CaveIndex) {
        return this.data[index.rowIndex][index.colIndex] === "air";
    }
}

interface CaveIndex {
    rowIndex: number;
    colIndex: number;
}

// Take a single path (e.g. '498,4 -> 498,6 -> 496,6'), and return 
// the positions (in terms of 2D-array indices, not input positions).
function parsePathStringToRockLocations(str: string): CaveIndex[] {
    const result: CaveIndex[] = [];
    const vertices = str.split(" -> ");
    for (let i = 0; i < vertices.length - 1; i++) {
        const currVertex = vertices[i].split(",");
        const currVertexRow = parseInt(currVertex[1]);
        const currVertexCol = parseInt(currVertex[0]);


        const nextVertex = vertices[i + 1].split(",");
        const nextVertexRow = parseInt(nextVertex[1]);
        const nextVertexCol = parseInt(nextVertex[0]);

        if (currVertexCol === nextVertexCol) {
            // Fill in horizontally
            const start = Math.min(currVertexRow, nextVertexRow);
            const end = Math.max(currVertexRow, nextVertexRow);
            for (let row = start; row <= end; row++) {
                result.push({
                    rowIndex: row,
                    colIndex: currVertexCol,
                });
            }
        } else {
            // Fill in horizontally
            const start = Math.min(currVertexCol, nextVertexCol);
            const end = Math.max(currVertexCol, nextVertexCol);
            for (let col = start; col <= end; col++) {
                result.push({
                    rowIndex: currVertexRow,
                    colIndex: col,
                });
            }
        }
    }

    return result;
}


function runInput(str: string) {
    const paths = str.split("\n");

    const rockIndices: CaveIndex[] = [];
    let minColIndex = 10000;
    let maxColIndex = 0;
    let maxRowIndex = 0;

    paths.forEach(elem => {
        const rockLocations = parsePathStringToRockLocations(elem);
        rockLocations.forEach(rock => {
            rockIndices.push(rock);

            if (rock.colIndex < minColIndex) { minColIndex = rock.colIndex }
            if (rock.colIndex > maxColIndex) { maxColIndex = rock.colIndex }
            if (rock.rowIndex > maxRowIndex) { maxRowIndex = rock.rowIndex }
        })
        rockIndices.push(...rockLocations);
    })


    let parsedBools: boolean[][] = [];
    for (let rowIndex = 0; rowIndex <= maxRowIndex; rowIndex++) {
        const rowBools: boolean[] = [];
        for (let colIndex = 0; colIndex <= maxColIndex + 100; colIndex++) {
            const hasRockAtCurrentLocation = rockIndices.find(elem => elem.rowIndex === rowIndex && elem.colIndex === colIndex)
            if (hasRockAtCurrentLocation) {
                rowBools.push(true);
            } else {
                rowBools.push(false);
            }
        }
        parsedBools.push(rowBools);
    }


    const cave = new Cave(parsedBools, minColIndex);
    cave.printCave()

    let total = 0;
    let shouldStop = cave.dropSand();
    while (!shouldStop) {
        shouldStop = cave.dropSand()

        if (total >= 990) {
            console.log("on count", total)
            cave.printCave(140);
        }
        total++;
    }
    console.log(total)
}

/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(realInput);

