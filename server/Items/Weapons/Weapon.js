const Item = require("../Item.js");

module.exports = class Weapon extends Item{

    constructor() {
        super();
        this.weaponProperties = []
        this.damageDice = [];
    }

    getDamage(){
        throw new Error("Implement me");
    }

    getMaxStackSize(){
        return 1;
    }

    getLabels() {
        return itemLabels.weapon;
    }
}