
var modelRoom = require('model.room');


// HOLDS SPAWN DATA AND SPAWN DATA METHODS

var modelSpawn = {};


modelSpawn.proc = function() {
    this.spawns = this.getSpawns();
};


modelSpawn.getSpawns = function() {
    return modelRoom.room.find(FIND_MY_SPAWNS);
};


module.exports = modelSpawn;
