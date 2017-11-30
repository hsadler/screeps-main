

// HOLDS GAME DATA AND GAME DATA METHODS (ALL ROOMS)

var modelGame = {};


// methods

modelGame.proc = function() {
    this.extensionStructures = this.getExtensionStructures();
    this.totalEnergyCapacity = this.getTotalEnergyCapacity();
    this.totalEnergyStored = this.getTotalEnergyStored();
};

modelGame.getExtensionStructures = function() {
    return _.filter(Game.structures, function(structure) {
        return structure.structureType === STRUCTURE_EXTENSION;
    });
};

modelGame.getTotalEnergyCapacity = function() {
    var sum = 0;
    _.each(Game.rooms, function(room) {
        sum += room.energyCapacityAvailable;
    });
    return sum;
};


modelGame.getTotalEnergyStored = function() {
    var sum = 0;
    _.each(Game.rooms, function(room) {
        sum += room.energyAvailable;
    });
    return sum;
};


module.exports = modelGame;
