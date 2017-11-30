
var modelRoom = require('model.room');


// HOLDS STORAGE DATA AND STORAGE DATA METHODS

var modelStorage = {};


modelStorage.proc = function() {
    this.storage = this.getStorage();
};


modelStorage.getStorage = function() {
    var storage = modelRoom.room.storage;
    return storage;
};


module.exports = modelStorage;
