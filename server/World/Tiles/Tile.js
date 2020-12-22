module.exports = class Tile {
    constructor() {
        this.events = [];
        this.color = this.getColor()
        this.id = null;
    }

    getId(){
        throw new Error("implement me");
    }

    getColor() {
        throw new Error("implement me")
    }

    getRandomEvent() {
        throw new Error("implement me")
    }

    getDecisions() {
        throw new Error("implement me")
    }
}
