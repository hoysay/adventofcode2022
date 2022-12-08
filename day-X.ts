// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";

// helper for '$ cd ..'
function getParentDirectoryString(currentDir: string): string {
    const pieces = currentDir.split("/");
    const piecesToKeep = pieces.slice(0, pieces.length - 1);
    return piecesToKeep.join("/");
}

// helper to split input string into initial mappings './a => [dir b, 444 a.txt, ...]'
function getDirectoriesToContents(str: string): Map<string, string[]> {
    const lines = str.split("\n");

    const directoryToContents = new Map<string, string[]>();

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
                const outputLines: string[] = [];
                let j = i + 1;

                while (j < lines.length) {
                    let potentialOutputLine = lines[j];
                    if (potentialOutputLine !== undefined && !potentialOutputLine.startsWith("$")) {
                        outputLines.push(potentialOutputLine);
                        j++;
                    } else { break; }
                }
                directoryToContents.set(currentDirectory, outputLines)

                // Update current index
                // console.log("setting i to", j)
                i = j;
            } else if (currentLine.startsWith("$ cd")) {
                if (currentLine.includes("..")) { // navigate up
                    currentDirectory = getParentDirectoryString(currentDirectory);
                } else {
                    const pieces = currentLine.split("cd ")
                    currentDirectory += `/${pieces[1]}`;
                }
                i++
            }
        } else {
            console.log("This should never happen")
        }

    }

    return directoryToContents;
}

function stringRepresentsBaseFile(str: string): boolean {
    if (str.includes(".")) { return true; }


    // starts with number
    // split by space => 2 pieces
    const pieces = str.split(" ");
    return !isNaN(parseInt(pieces[0]));
}

function sumFiles(arr: string[]): number {
    let total = 0;
    arr.forEach(elem => {
        const pieces = elem.split(" ");
        total += parseInt(pieces[0]);
    });
    return total;
}

// helper to take map of nested dirs, and sub in the 'simple' ones. returns 
// the simplified one
function simplifyDirectories(directoryToContents: Map<string, string[]>): Map<string, string[]> {
    // Get 'simple' directories.
    const simpleDirectorySizes = new Map<String, number>(); // will be './...
    directoryToContents.forEach((contentsArr, dirKey) => {
        const onlyContainsFiles = contentsArr.every(elem => stringRepresentsBaseFile(elem));

        if (onlyContainsFiles) {
            const value = sumFiles(contentsArr)
            simpleDirectorySizes.set(dirKey, value)
        }
    });


    // Replace relative 'dir X' paths with absolute paths - this is only useful 
    // on the first iteration I think
    const directoryToContents2 = new Map<string, string[]>();
    directoryToContents.forEach((contentsArr, dirKey) => {
        const newArr: string[] = [];
        contentsArr.forEach(elem => {
            if (elem.startsWith("dir ")) {
                newArr.push(`${dirKey}/${elem.split(" ")[1]}`)
            } else { newArr.push(elem) }
        })
        directoryToContents2.set(dirKey, newArr)
    })

    // Try to sub in absolute directory paths with real sizes. 
    directoryToContents2.forEach((contentsArr, dirKey) => {
        const newArr: string[] = [];
        contentsArr.forEach(elem => {
            if (elem.startsWith("./")) {
                const potentialFileSize = simpleDirectorySizes.get(elem);
                if (!potentialFileSize) { newArr.push(elem); }
                else {
                    newArr.push(`${potentialFileSize} directory-${elem}-calculation`)
                }
            } else { newArr.push(elem); }
        })
        directoryToContents2.set(dirKey, newArr);
    })
    //    console.log(directoryToContents2);

    return directoryToContents2;
}

function isSimplificationComplete(map: Map<string, string[]>): boolean {
    let result = true;
    map.forEach((contentsArr, dirKey) => {
        contentsArr.forEach(elem => {
            if (elem.startsWith("./")) { result = false; }
        })
    })

    return result;
}

function runInput(str: string) {
    const directoryToContents = getDirectoriesToContents(str);
    console.log(directoryToContents)

    // First round of simplification
    let simplified = simplifyDirectories(directoryToContents)

    console.log("simplifeid")
    console.log(simplified)

    // Continue until done
    while (!isSimplificationComplete(simplified)) {
        simplified = simplifyDirectories(simplified);
    }

    console.log(simplified);


    // Calculate final sizes of directories
    const directoryToSize = new Map<string, number>();
    simplified.forEach((contentsArr, dirKey) => {
        directoryToSize.set(dirKey, sumFiles(contentsArr));
    })

    console.log(directoryToSize);

    // Finally, do the filtering asked by the question.
    let finalResult = 0;
    directoryToSize.forEach((size, dir) => {
        if (size <= 100000) {
            console.log(dir);
            finalResult += size;
        }
    })
    console.log(finalResult);

    const allSizes: number[] = [];
    directoryToSize.forEach((size, dir) => {
        allSizes.push(size);
    })
    allSizes.sort((a, b) => a - b);
    console.log(allSizes.find(elem => elem >= 4965705));

    // -- PART 2
    // current unused size is 25034295, we want unused size to be 30000000
    // need to find SMALLEST thing that's >= 4965705
    // Not sure if this accounts for nesting
}


/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(realInput);
