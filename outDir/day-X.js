"use strict";
// tsc && node ./outDir/day-X.js
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
// Decide whether next character is # or .
function getRenderedCharacter(crtPixelIndex, spriteCenter) {
    // Which column is CRT looking at
    const crtColumnNumber = crtPixelIndex % 40;
    let spriteLeft = (spriteCenter >= 0) ? spriteCenter - 1 : undefined;
    let spriteRight = (spriteCenter < 40) ? spriteCenter + 1 : undefined;
    if (crtColumnNumber === spriteLeft || crtColumnNumber === spriteCenter || crtColumnNumber === spriteRight) {
        return "#";
    }
    return " ";
}
function runInput(str) {
    const commands = str.split("\n");
    const cycleNumToSpriteCenter = new Map();
    let currentCycle = 1;
    let currentRegisterValue = 1;
    let addOperationToFinish;
    commands.forEach(command => {
        if (addOperationToFinish) {
            currentRegisterValue += addOperationToFinish;
            addOperationToFinish = undefined;
        }
        if (command === "noop") {
            cycleNumToSpriteCenter.set(currentCycle, currentRegisterValue);
            currentCycle++;
        }
        else {
            cycleNumToSpriteCenter.set(currentCycle, currentRegisterValue);
            cycleNumToSpriteCenter.set(currentCycle + 1, currentRegisterValue);
            currentCycle += 2;
            addOperationToFinish = parseInt(command.split(" ")[1]);
        }
    });
    // for (let i = 1; i <= cycleNumToSpriteCenter.size; i++) {
    //     console.log(i, "---", cycleNumToSpriteCenter.get(i))
    // }
    let totalStr = "";
    for (let cycleNum = 1; cycleNum <= cycleNumToSpriteCenter.size; cycleNum++) {
        const crtPixelIndex = cycleNum - 1;
        const spriteCenter = cycleNumToSpriteCenter.get(cycleNum);
        const nextChar = getRenderedCharacter(crtPixelIndex, spriteCenter);
        if (totalStr.length % 41 === 0) {
            totalStr = totalStr + "\n" + nextChar;
        }
        else {
            totalStr += nextChar;
        }
    }
    console.log(totalStr);
}
/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(input_1.realInput);
//# sourceMappingURL=day-X.js.map