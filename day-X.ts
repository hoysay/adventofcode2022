// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";


function compare(left: any, right: any): boolean | undefined {
    if (typeof left === "number" && typeof right === "number") {
        if (left < right) { return true; }
        if (left > right) { return false; }
        return undefined;
    }

    else if (typeof left === typeof right) {


        for (let i = 0; i < left.length && i < right.length; i++) {
            const compareResult = compare(left[i], right[i]);
            if (compareResult !== undefined) { return compareResult; }
        }


        if (left.length < right.length) { return true; }
        if (left.length > right.length) { return false; }

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
    const pairs = str.split("\n");

    const onlyLines = pairs.filter(elem => elem !== "");
    const withExtra = [...onlyLines, "[[2]]", "[[6]]"];
    const mappedToAny = withExtra.map(elem => eval(elem));

    mappedToAny.sort((a, b) => compare(a, b) ? -1 : 1);

    let result = 1;
    mappedToAny.forEach((elem, index) => {
        if (compare(elem, eval("[[2]]")) === undefined) {
            result *= (index + 1);
        } else if (compare(elem, eval("[[6]]")) === undefined) {
            result *= (index + 1);
        }
    })

    console.log(result);


}

/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
    runInput(realInput);
