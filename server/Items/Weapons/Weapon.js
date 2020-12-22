const Item = require("../Item.js");

module.exports = class Weapon extends Item{

    getDamage(){
        throw new Error("Implement me");
    }

    getLabels() {
        return "WEAPON";
    }
}