
//Documents an entire combat, from start to finish
module.exports = class CombatLog {
    constructor() {
        this.title = "";
        this.logs = [];
    }

    getTitle(){
        return this.title;
    }

    addLog(log) {
        this.logs.push(log);
    }

    getLogs() {
        return this.logs;
    }

    startOfCombat(creature1, creature2) {
        this.title = creature1.getName() + " got into a fight with " + creature2.getName() + "!";
    }

    logInitiative(creature1, reaction1, creature2, reaction2) {

    }

}

//Documents a step in combat
module.exports = class Log {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}
