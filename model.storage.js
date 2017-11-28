


// HOLDS STORAGE DATA AND STORAGE DATA METHODS

var modelStorage = {};


modelStorage.proc = function() {
    this.storage = this.getStorage();
};


modelStorage.getStorage = function() {
    var storage = Game.spawns['Spawn1'].room.storage;
    return storage;
};


module.exports = modelStorage;
