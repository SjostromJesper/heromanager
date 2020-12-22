const Item = require("../Item.js");

class Food extends Item{


    getFoodValue(){
        return 200;
    }

    getLabels(){
        return [itemLabels.food];
    }
}