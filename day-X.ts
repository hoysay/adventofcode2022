// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";


function compare(left: any, right: any): boolean | undefined {
    if (typeof left === "number" && typeof right === "number") {
        if (left < right) { return true; }
        if (left > right) { return false;}
        return undefined;
    }

    else if (typeof left === typeof right) {


        for (let i = 0; i < left.length && i < right.length; i++) {
            const compareResult = compare(left[i], right[i]);
            if (compareResult !== undefined) { return compareResult;}
        }

     
        if (left.length < right.length) { return true;}
        if (left.length > right.length) { return false;}

        return undefined
    }

    if (typeof left === "number") {
        // Convert left into array
        return compare([left], right)
    } 

    return compare(left, [right])
}


// const x = compare(eval("[[1],[2,3,4]]"), eval("[[1],4]"))
// const x = compare(eval("[1]"), eval("[1]"))
// console.log(x)

function runInput(str: string) {
    const pairs = str.split("\n\n");

    let total = 0

    pairs.forEach((pairString, index) => {
        // Question is not 'zero-indexed'
        const pairIndex = index + 1;

        const pieces = pairString.split("\n");
        const leftPacket = pieces[0];
        const rightPacket = pieces[1];

        // console.log(pairIndex, leftPacket, rightPacket)

        const compareResult = compare(eval(leftPacket), eval(rightPacket))
        if (compareResult) {
            total += pairIndex;
        }
    })
    console.log(total);

}

/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
    runInput(realInput);
