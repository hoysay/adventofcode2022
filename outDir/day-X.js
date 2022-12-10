"use strict";
// tsc && node ./outDir/day-X.js
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function runInput(str) {
    const commands = str.split("\n");
    const cycleNumToValue = new Map();
    let currentCycle = 1;
    let currentRegisterValue = 1;
    let addOperationToFinish;
    commands.forEach(command => {
        if (addOperationToFinish) {
            currentRegisterValue += addOperationToFinish;
            addOperationToFinish = undefined;
        }
        if (command === "noop") {
            cycleNumToValue.set(currentCycle, currentRegisterValue);
            currentCycle++;
        }
        else {
            cycleNumToValue.set(currentCycle, currentRegisterValue);
            cycleNumToValue.set(currentCycle + 1, currentRegisterValue);
            currentCycle += 2;
            addOperationToFinish = parseInt(command.split(" ")[1]);
        }
    });
    // Do we need to finish the last operation?
    for (let i = 1; i <= cycleNumToValue.size; i++) {
        console.log(i, "---", cycleNumToValue.get(i));
    }
    let total = 0;
    for (let i = 20; i <= 220; i += 40) {
        total += i * cycleNumToValue.get(i);
    }
    console.log(total);
}
/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(input_1.realInput);
//# sourceMappingURL=day-X.js.map