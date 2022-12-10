// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";


function runInput(str: string) {
    const commands = str.split("\n");

    const cycleNumToValue = new Map<number, number>();

    let currentCycle = 1;
    let currentRegisterValue = 1;
    let addOperationToFinish: number | undefined;
    commands.forEach(command => {
        if (addOperationToFinish) {
            currentRegisterValue += addOperationToFinish;
            addOperationToFinish = undefined;
        }


        if (command === "noop") {
            cycleNumToValue.set(currentCycle, currentRegisterValue);
            currentCycle ++;
        } else {
            cycleNumToValue.set(currentCycle, currentRegisterValue);
            cycleNumToValue.set(currentCycle+1, currentRegisterValue);
            currentCycle += 2; 

            addOperationToFinish = parseInt(command.split(" ")[1]);
        }
    })
    // Do we need to finish the last operation?

    for (let i = 1; i <= cycleNumToValue.size; i++) {
        console.log(i, "---", cycleNumToValue.get(i))
    }

    let total = 0;
    for (let i = 20; i <= 220; i += 40) {
        total += i * cycleNumToValue.get(i);
    }



    console.log(total)
}


/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
runInput(realInput);
