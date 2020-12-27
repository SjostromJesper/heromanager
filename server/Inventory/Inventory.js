const Food = require('../Items/Food/Food.js');
const LogBook = require('../Items/LogBook.js');

module.exports = class Inventory{
    constructor(items){
        this.items = [];
        this.items.push(...items);
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

    getLogBooks(){
        return this.items.filter(item => item instanceof LogBook);
    }

    //use this method when we write to the logbook
    //a new book is created if there wasn't an empty book
    getCurrentLogBook(){
        let currentLogBooks = this.items.filter(item => item instanceof LogBook && !item.isFull());
        if(currentLogBooks && currentLogBooks.length() > 0){
            return currentLogBooks[0];
        }else{
            //there's
            this.items.add(new LogBook());
            return this.getCurrentLogBook();
        }
    }
}