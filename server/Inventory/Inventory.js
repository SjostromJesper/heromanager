const Food = require('../Items/Food/Food.js');

module.exports = class Inventory{
    constructor(items){
        this.items = items;
    }

    addItem(item){
        this.items.push(item);
    }

    getItems(){
        return this.items;
    }

    //pass a function that takes an inventory item and returns a boolean.
    has(requirement){
        return this.items.some(requirement);
    }

    hasFood(){
        return this.has((item) => item instanceof Food);
    }
}