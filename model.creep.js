
var modelGame = require('model.game');


// HOLDS CREEP DATA AND CREEP DATA METHODS

modelCreep = {};


// constants

modelCreep.GENERAL_CREEP_TEMPLATE = [
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE,WORK,CARRY,
    MOVE,MOVE
];

// drop mining template
modelCreep.MINER_CREEP_TEMPLATE = [
    MOVE,WORK,WORK,WORK,WORK,WORK,WORK
];


// methods

modelCreep.proc = function() {

    // get lists of creep types
    modelCreep.miners = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'miner';
    });
    modelCreep.harvesters = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'harvester';
    });
    modelCreep.upgraders = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'upgrader';
    });
    modelCreep.builders = _.filter(Game.creeps, function(creep) {
        return creep.memory.role == 'builder';
    });

    // generate creep templates
    modelCreep.generalCreep = modelCreep.getCreepParts(
        modelCreep.GENERAL_CREEP_TEMPLATE
    );
    modelCreep.minerCreep = modelCreep.getCreepParts(
        modelCreep.MINER_CREEP_TEMPLATE
    );

};


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
