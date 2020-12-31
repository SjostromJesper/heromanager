const Item = require("../Item.js");

class Gold extends Item{


    getMaxStackSize(){
        return 999999999999;
    }

    getLabels(){
        return [itemLabels.food];
    }
}