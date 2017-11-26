
var modelGame = require('model.game');


// HOLDS CREEP DATA AND CREEP DATA METHODS

modelCreep = {};


// constants

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


// methods

modelCreep.proc = function() {
    modelCreep.generateCreepLists();
    modelCreep.generateCreepTemplates();
};


modelCreep.generateCreepLists = function() {
    modelCreep.miners = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'miner';
    });
    modelCreep.haulers = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'hauler';
    });
    modelCreep.upgraders = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'upgrader';
    });
    modelCreep.builders = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'builder';
    });
};


modelCreep.generateCreepTemplates = function() {

    var creepCount = Object.keys(Game.creeps).length;
    var genCreepTemplate = creepCount < 4 ?
        modelCreep.BASIC_CREEP_TEMPLATE :
        modelCreep.GENERAL_CREEP_TEMPLATE;

    // genCreepTemplate = modelCreep.BASIC_CREEP_TEMPLATE;

    modelCreep.generalCreep = modelCreep.getCreepParts(
        genCreepTemplate
    );
    modelCreep.minerCreep = modelCreep.getCreepParts(
        modelCreep.MINER_CREEP_TEMPLATE
    );
    modelCreep.haulerCreep = modelCreep.getCreepParts(
        modelCreep.HAULER_CREEP_TEMPLATE
    );
    modelCreep.upgraderCreep = modelCreep.getCreepParts(
        genCreepTemplate
    );
    modelCreep.builderCreep = modelCreep.getCreepParts(
        genCreepTemplate
    );
};


// TODO: update to better account for avail energy
modelCreep.getCreepParts = function(creepTemplate) {

    var template = [];
    var cost = 0;
    var eCapacity = modelGame.totalEnergyCapacity;

    // add items from creep template to result template while affordable
    var i = 0;
    template.push(creepTemplate[i]);
    cost += BODYPART_COST[creepTemplate[i]];
    while(cost + BODYPART_COST[creepTemplate[i + 1]] <= eCapacity) {
        i += 1;
        template.push(creepTemplate[i]);
        cost += BODYPART_COST[creepTemplate[i]];
    }

    return template;

};


module.exports = modelCreep;
