
var modelRoom = require('model.room');


// HOLDS CREEP DATA AND CREEP DATA METHODS

var modelCreep = {};


modelCreep.GENERAL_CREEP_TEMPLATE = [
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE,WORK,CARRY,
    // MOVE,MOVE
];

// drop mining template
modelCreep.MINER_CREEP_TEMPLATE = [
    MOVE,WORK,WORK,WORK,WORK,WORK,WORK
];

// with WORK
modelCreep.HAULER_CREEP_TEMPLATE = [
    MOVE,WORK,MOVE,CARRY,
    MOVE,CARRY,MOVE,CARRY,
    MOVE,CARRY,MOVE,CARRY,
];

modelCreep.BASIC_CREEP_TEMPLATE = [
    MOVE,MOVE,WORK,CARRY
];


modelCreep.proc = function() {
    modelCreep.generateCreepLists();
    modelCreep.generateCreepTemplates();
};


// private
modelCreep.generateCreepLists = function() {
    this.creeps = modelRoom.room.find(FIND_MY_CREEPS);
    this.miners = this.creeps.filter(function(creep) {
        return creep.memory.role === 'miner';
    });
    this.haulers = this.creeps.filter(function(creep) {
        return creep.memory.role === 'hauler';
    });
    this.upgraders = this.creeps.filter(function(creep) {
        return creep.memory.role === 'upgrader';
    });
    this.builders = this.creeps.filter(function(creep) {
        return creep.memory.role === 'builder';
    });
};


// private
modelCreep.generateCreepTemplates = function() {

    var creepCount = this.creeps.length;
    var minCreepCountBeforeSpecialization = 4;

    var generalCreepTemplate = creepCount < minCreepCountBeforeSpecialization ?
        this.BASIC_CREEP_TEMPLATE :
        this.GENERAL_CREEP_TEMPLATE;

    var haulerCreepTemplate = creepCount < minCreepCountBeforeSpecialization ?
        this.BASIC_CREEP_TEMPLATE :
        this.HAULER_CREEP_TEMPLATE;

    var minerCreepTemplate = creepCount < minCreepCountBeforeSpecialization ?
        this.BASIC_CREEP_TEMPLATE :
        this.MINER_CREEP_TEMPLATE;

    this.generalCreep = this.getCreepParts(
        generalCreepTemplate
    );
    this.haulerCreep = this.getCreepParts(
        haulerCreepTemplate
    );
    this.minerCreep = this.getCreepParts(
        minerCreepTemplate
    );
    this.upgraderCreep = this.getCreepParts(
        generalCreepTemplate
    );
    this.builderCreep = this.getCreepParts(
        generalCreepTemplate
    );

};


// private
modelCreep.getCreepParts = function(creepTemplate) {

    var template = [];
    var cost = 0;
    var minCost = 250;
    var eStored = Math.max(modelRoom.room.energyAvailable, minCost);

    // add items from creep template to result template while affordable
    var i = 0;
    template.push(creepTemplate[i]);
    cost += BODYPART_COST[creepTemplate[i]];
    while(cost + BODYPART_COST[creepTemplate[i + 1]] <= eStored) {
        i += 1;
        template.push(creepTemplate[i]);
        cost += BODYPART_COST[creepTemplate[i]];
    }

    return template;

};


module.exports = modelCreep;
