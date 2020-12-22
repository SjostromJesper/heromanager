
module.exports = class Item {

    constructor() {
        this.name = "";
    }

    getName(){
        return this.name;
    }

    setName(name)
    {
        this.name = name;
    }

    getLabels(){
        throw new Error("implement me");
    }

}