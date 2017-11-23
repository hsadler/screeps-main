
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


// methods

modelCreep.proc = function() {
    modelCreep.generalCreep = modelCreep.getCreepParts(
        modelCreep.GENERAL_CREEP_TEMPLATE
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
