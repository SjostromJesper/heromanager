module.exports = class Decision {

    constructor(props) {
        //this.remainingTickCost = this.getTickCost();
    }

    perform(creatureTick){
        throw new Error("no");
    }

    //0 could represent a free action
    //1 represents a decision that can be performed in one tick
    //moving to another tile would take more time and might take 5 ticks
    getTickCost(){
        throw new Error("implement me");
    }

    getRemainingTickCost(){
        return this.remainingTickCost;
    }

    getLabels(){
        throw new Error("no");
    }

    //return a list of decisions that need to be performed in order to meet the requirements
    //for making this decision.
    //for example. eating requires food, so if we have no food, return the decisions that would get you food.
    //The decision to hunt or to fish are examples of decisions that would be returned in that case.
    //however, they might also
    //
    //an empty list means we fulfill all requirements, so this should be called recusively until we have decisions that
    //we meet all requirements for
    getRequirements(creatureTick){
        throw new Error("implement me");
    }
}
