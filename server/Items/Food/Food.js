const Item = require("../Item.js");

class Food extends Item{

    getMaxStackSize(){
        return 20;
    }

    getFoodValue(){
        return 200;
    }

    getLabels(){
        return [itemLabels.food];
    }
}