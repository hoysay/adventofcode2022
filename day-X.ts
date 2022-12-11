// tsc && node ./outDir/day-X.js

import { testInput, realInput } from "./input";

interface ItemResult {
    itemNumber: number;
    monkeyRecipient: number;
}

class Monkey {
    id: number;
    heldItems: number[];
    operation: (old: number) => number;
    testFunction: (x: number) => boolean;
    trueRecipient: number;
    falseRecipient: number;
    
    numInspections = 0;

    constructor(
        id: number,
        initialItems: number[],
        operationFunc: (old: number) => number,
        divisNumber: number,
        trueId: number,
        falseId: number
    ) {
        this.id = id;
        this.heldItems = initialItems;
        this.operation = operationFunc;
        this.testFunction = (x: number) => (x % divisNumber === 0);
        this.trueRecipient = trueId;
        this.falseRecipient = falseId;
    }

    handleNextItem(): ItemResult | undefined {
        if (this.heldItems.length === 0) {
            // should never happen
            return undefined
        }

        const currentItem = this.heldItems.shift();
        const updatedWorry = this.operation(currentItem);
        console.log(updatedWorry)
        this.numInspections += 1;

        const testResult = this.testFunction(updatedWorry);
        return {
            itemNumber: updatedWorry,
            monkeyRecipient: testResult ? this.trueRecipient : this.falseRecipient
        }
    }

    hasMoreItems(): boolean {
        return this.heldItems.length > 0;
    }

    catchItem(item: number) {
        // HARD-CODED: need to change b/w test and real (I didn't want to code 
        // the real calculation)
        this.heldItems.push(item % leastCommonMultipleRealMonkeys);
    }

    print() {
        let result = "\tmonkey " + this.id;
        result += "\n\titems: " + this.heldItems;
        result += "\n\tnumInspections: " + this.numInspections + "\n";
        console.log(result);
    }
}

function printMonkeys(monkeys: Monkey[]) {
    monkeys.forEach(m => m.print())
}


// updates monkeys in-place
function handleRound(monkeys: Monkey[]) {
    for (let i = 0; i < monkeys.length; i++) {
        const currentMonkey = monkeys[i];

        while (currentMonkey.hasMoreItems()) {
            const itemResult = currentMonkey.handleNextItem();
            console.log("monkey", i, "handling item with new worry", itemResult.itemNumber)
            console.log("=>going to pass item", itemResult.itemNumber, "to", itemResult.monkeyRecipient)
            if (!itemResult) { continue }

            const recipientMonkey = monkeys[itemResult.monkeyRecipient];
            recipientMonkey.catchItem(itemResult.itemNumber)

        }
    }
}

function runMonkeys(monkeys: Monkey[], numRounds: number) {
    console.log("start");
    printMonkeys(monkeys)
    for (let roundNum = 1; roundNum <= numRounds; roundNum++) {
        handleRound(monkeys)
        console.log("\nend of round", roundNum)
        printMonkeys(monkeys)
    }


    // Find monkey business result
    monkeys.sort((a, b) => b.numInspections - a.numInspections)
    console.log(monkeys[0].numInspections * monkeys[1].numInspections)
}



// I thought I'd be smart and hard-code inputs, but I had a sneaky typo 
// that wasted me 30 minutes (ample time to write a real parser :/ )
const testMonkeys: Monkey[] = [
    new Monkey(0, [79, 98], x => x * 19, 23, 2, 3),
    new Monkey(1, [54, 65, 75, 74], x => x + 6, 19, 2, 0),
    new Monkey(2, [79, 60, 97], x => x * x, 13, 1, 3),
    new Monkey(3, [74], x => x + 3, 17, 0, 1)
];

const realMonkeys: Monkey[] = [
    new Monkey(0, [89, 95, 92, 64, 87, 68], x => x * 11, 2, 7, 4),
    new Monkey(1, [87, 67], x => x + 1, 13, 3, 6),
    new Monkey(2, [95, 79, 92, 82, 60], x => x + 6, 3, 1, 6),
    new Monkey(3, [67, 97, 56], x => x * x, 17, 7, 0),
    new Monkey(4, [80, 68, 87, 94, 61, 59, 50, 68], x => x * 7, 19, 5, 2),
    new Monkey(5, [73, 51, 76, 59], x => x + 8, 7, 2, 1),
    new Monkey(6, [92], x => x + 5, 11, 3, 0),
    new Monkey(7, [99, 76, 78, 76, 79, 90, 89], x => x + 7, 5, 4, 5),
]

const leastCommonMultipleTestMonkeys = 96577;
const leastCommonMultipleRealMonkeys = 9699690;

// runMonkeys(testMonkeys, 20);
runMonkeys(realMonkeys, 10000);



// function runInput(str: string) {
// }


/** ----- MODIFY TO CHANGE TEST VS. REAL ----- */
// runInput(testInput);
// runInput(realInput);
