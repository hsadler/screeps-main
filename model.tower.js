

// HOLDS TOWER DATA AND TOWER DATA METHODS

var modelTower = {};


modelTower.proc = function() {
    this.towers = this.getTowers();
};


modelTower.getTowers = function() {
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return structure.structureType === STRUCTURE_TOWER;
            }
        });
    return towers;
};


module.exports = modelTower;
