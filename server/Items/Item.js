
module.exports = class Item {

    constructor() {
        this.name = "";
        this.amount = 1;
    }

    getName(){
        return this.name;
    }

    setName(name)
    {
        this.name = name;
    }

    setAmount(amount){
        if(amount > this.getMaxStackSize()){
            throw new Error("Can't have this many");
        }
        this.amount = amount;
    }

    getAmount(){
        return this.amount;
    }

    getMaxStackSize(){
        throw new Error("implement me");
    }

    getLabels(){
        throw new Error("implement me");
    }

}