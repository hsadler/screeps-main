
var modelRoom = require('model.room');


// HOLDS TOWER DATA AND TOWER DATA METHODS

var modelTower = {};


modelTower.proc = function() {
    this.towers = this.getTowers();
};


modelTower.getTowers = function() {
    var towers = modelRoom.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return structure.structureType === STRUCTURE_TOWER;
            }
        });
    return towers;
};


module.exports = modelTower;
