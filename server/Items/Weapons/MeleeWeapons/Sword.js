const Weapon = require("../Weapon.js");

module.exports = class Sword extends Weapon{

    constructor() {
        super();
        this.name = "";
    }

    getLabels() {
        return super.getLabels().push(...[itemLabels.sharp_tool, itemLabels.sword]);
    }
}