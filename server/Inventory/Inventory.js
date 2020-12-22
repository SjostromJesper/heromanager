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
}