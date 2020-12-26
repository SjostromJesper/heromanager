module.exports = class DecisionMaker {

//See which decision a creature would make right now
    getDecision(creatureTick, availableDecisions) {
        let allDecisions = [decisions.move, decisions.flee];

        let weightedDecisionMap = new Map();
        let creature = creatureTick.getActingCreature();

        //initialize all decisions //TODO default should be 0
        availableDecisions.forEach(decision => {
            weightedDecisionMap.set(decision, 1);
        });

        //Consider the creatures goal, it might not have a current goal
        let goal = creature.getGoal();
        if (goal) {
            allDecisions.forEach(decision => {
                let decisionProbability = goal.getProbability(decision);
                weightedDecisionMap.set(decision, decisionProbability);
            });
        }

        //Then also consider the creatures other quirks and it's environment


        //Consider the creature status, for example if it's hungry, it's more likely to want to eat
        let hungerWeight = creature.getCreatureStatus().getMaxHunger() - creature.getCreatureStatus().getHunger();
        weightedDecisionMap.set(decisions.eat, weightedDecisionMap.get(decisions.eat) + hungerWeight);

        //if a creature is hungry, "Eat" would have a high weight
        //although we need food to eat, so if we can't eat because of some requirement
        //we need to shift the priority of that decision to a decision that would fulfill that requirement
        let choice = getByChance(weightedDecisionMap);
        console.log(choice)
        console.log("chose: " + choice.constructor.name);
        return choice;


//Returnera något Decision i mappen baserat på dess probability
//
// Kanske ha en flagga för om vi tillåter negativa värden eller inte
//
// exempel
// flee: 9; //90%
// move: 1; //10%
        function getByChance(m) {
            let options = [];
            let weights = [];

            const map = m;

            map.forEach((value, key) => {
                console.log("option: " + key.constructor.name + " has weight: " + value);
                options.push(key);
                weights.push(value);
            });

            let chosenIndex = chooseWithChance(weights);

            return options[chosenIndex];
        }

        function chooseWithChance(args) {
            let argCount = args.length;
            let sumOfChances = 0;
            for (let i = 0; i < argCount; i++) {
                sumOfChances += args[i];
            }

            let randomDouble = Math.random() * sumOfChances;
            while (sumOfChances > randomDouble) {
                sumOfChances -= args[argCount - 1];
                argCount--;
            }
            return argCount;
        }

        //return the decision with the highest probability
        function getHighestProbability(map) {
            let bestDecision = null;
            let highest = 0;
            for (let decision in map) {
                let decisionProbability = map.get(decision);
                if (decisionProbability > highest) {
                    highest = decisionProbability
                    bestDecision = decision;
                }
            }
            return bestDecision;
        }
    }
}
