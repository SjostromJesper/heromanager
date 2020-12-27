const Item = require("./Item.js");

module.exports = class LogBook extends Item{

    constructor() {
        super();
        this.name = "";
        this.logs = [];
    }

    getLabels() {
        return super.getLabels().push(...["BOOK"]);
    }

    getLogs() {
        return this.logs;
    }

    addNewLog(logTitle, logContent) {
        this.logs.push({title: logTitle, content: logContent})
    }

    isFull(){
        return this.logs.length > 1000; //idunno
    }
}
