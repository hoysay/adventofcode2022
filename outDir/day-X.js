"use strict";
// tsc && node ./outDir/day-X.js
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function getParentDirectoryString(currentDir) {
    const pieces = currentDir.split("/");
    const piecesToKeep = pieces.slice(0, pieces.length - 1);
    return piecesToKeep.join("/");
}
function getDirectoriesToContents(str) {
    const lines = str.split("\n");
    const directoryToContents = new Map();
    let currentDirectory = ".";
    let i = 1;
    // console.log("# lines", lines.length)
    while (i < lines.length) {
        // console.log("i", i)
        const currentLine = lines[i];
        // console.log(currentLine)
        if (currentLine.startsWith("$")) { // Actual command
            // Handle 'ls' command
            if (currentLine === "$ ls") {
                // Read subsequent output lines, organize by directory
                const outputLines = [];
                let j = i + 1;
                while (j < lines.length) {
                    let potentialOutputLine = lines[j];
                    if (potentialOutputLine !== undefined && !potentialOutputLine.startsWith("$")) {
                        outputLines.push(potentialOutputLine);
                        j++;
                    }
                    else {
                        break;
                    }
                }
                directoryToContents.set(currentDirectory, outputLines);
                // Update current index
                // console.log("setting i to", j)
                i = j;
            }
            else if (currentLine.startsWith("$ cd")) {
                if (currentLine.includes("..")) { // navigate up
                    currentDirectory = getParentDirectoryString(currentDirectory);
                }
                else {
                    const pieces = currentLine.split("cd ");
                    currentDirectory += `/${pieces[1]}`;
                }
                i++;
            }
        }
        else {
            console.log("This should never happen");
        }
    }
    return directoryToContents;
}
function stringRepresentsBaseFile(str) {
    if (str.includes(".")) {
        return true;
    }
    // starts with number
    // split by space => 2 pieces
    const pieces = str.split(" ");
    return !isNaN(parseInt(pieces[0]));
}
function sumFiles(arr) {
    let total = 0;
    arr.forEach(elem => {
        const pieces = elem.split(" ");
        total += parseInt(pieces[0]);
    });
    return total;
}
// function areAllDirectoriesSimplified(map: Map<string, string[]>): boolean {
//     let 
// }
function simplifyDirectories(directoryToContents) {
    // Get 'simple' directories.
    const simpleDirectorySizes = new Map(); // will be './...
    directoryToContents.forEach((contentsArr, dirKey) => {
        const onlyContainsFiles = contentsArr.every(elem => stringRepresentsBaseFile(elem));
        // console.log(dirKey, contentsArr, onlyContainsFiles)
        if (onlyContainsFiles) {
            // const pieces = dirKey.split("/");
            // const simpleKey = `dir ${pieces[pieces.length - 1]}`
            const value = sumFiles(contentsArr);
            simpleDirectorySizes.set(dirKey, value);
        }
    });
    //    console.log(simpleDirectorySizes);
    // Continue doing simple ones until the # of keys matches total?
    // Replace relative 'dir X' paths with absolute paths
    const directoryToContents2 = new Map();
    directoryToContents.forEach((contentsArr, dirKey) => {
        const newArr = [];
        contentsArr.forEach(elem => {
            if (elem.startsWith("dir ")) {
                newArr.push(`${dirKey}/${elem.split(" ")[1]}`);
            }
            else {
                newArr.push(elem);
            }
        });
        directoryToContents2.set(dirKey, newArr);
    });
    //    console.log(directoryToContents2);
    // Try to sub in absolute directory paths with real sizes. 
    directoryToContents2.forEach((contentsArr, dirKey) => {
        const newArr = [];
        contentsArr.forEach(elem => {
            if (elem.startsWith("./")) {
                const potentialFileSize = simpleDirectorySizes.get(elem);
                if (!potentialFileSize) {
                    newArr.push(elem);
                }
                else {
                    newArr.push(`${potentialFileSize} directory-${elem}-calculation`);
                }
            }
            else {
                newArr.push(elem);
            }
        });
        directoryToContents2.set(dirKey, newArr);
    });
    //    console.log(directoryToContents2);
    return directoryToContents2;
}
function isSimplificationComplete(map) {
    let result = true;
    map.forEach((contentsArr, dirKey) => {
        contentsArr.forEach(elem => {
            if (elem.startsWith("./")) {
                result = false;
            }
        });
    });
    return result;
}
function runInput(str) {
    const directoryToContents = getDirectoriesToContents(str);
    console.log(directoryToContents);
    let simplified = simplifyDirectories(directoryToContents);
    console.log("simplifeid");
    console.log(simplified);
    while (!isSimplificationComplete(simplified)) {
        simplified = simplifyDirectories(simplified);
    }
    console.log(simplified);
    // Calculate final sizes of directories
    const directoryToSize = new Map();
    simplified.forEach((contentsArr, dirKey) => {
        directoryToSize.set(dirKey, sumFiles(contentsArr));
    });
    console.log(directoryToSize);
    // Finally, do the filtering asked by the question.
    let finalResult = 0;
    directoryToSize.forEach((size, dir) => {
        if (size <= 100000) {
            console.log(dir);
            finalResult += size;
        }
    });
    console.log(finalResult);
    const allSizes = [];
    directoryToSize.forEach((size, dir) => {
        allSizes.push(size);
    });
    allSizes.sort((a, b) => a - b);
    console.log(allSizes);
    console.log(allSizes.find(elem => elem >= 4965705));
    // -- PART 2
    // current unused size is 25034295, we want unused size to be 30000000
    // need to find SMALLEST thing that's >= 4965705
    // Not sure if this accounts for nesting
}
/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(input_1.realInput);
//# sourceMappingURL=day-X.js.map