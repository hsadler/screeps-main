

// HOLDS GAME DATA AND GAME DATA METHODS

var modelGame = {};


// methods

modelGame.proc = function() {
    modelGame.extensionStructures = modelGame.getExtensionStructures();
    modelGame.totalEnergyCapacity = modelGame.getTotalEnergyCapacity();
    modelGame.totalEnergyStored = modelGame.getTotalEnergyStored();
};

modelGame.getExtensionStructures = function() {
    return Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return structure.structureType === STRUCTURE_EXTENSION;
            }
        });
};

modelGame.getTotalEnergyCapacity = function() {
    var sum = 0;
    sum += Game.spawns['Spawn1'].energyCapacity;
    modelGame.extensionStructures.forEach(function(extension) {
        sum += extension.energyCapacity;
    });
    return sum;
};


modelGame.getTotalEnergyStored = function() {
    var sum = 0;
    sum += Game.spawns['Spawn1'].energy;
    modelGame.extensionStructures.forEach(function(extension) {
        sum += extension.energy;
    });
    return sum;
};


module.exports = modelGame;
