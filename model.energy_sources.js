
var modelRoom = require('model.room');


// HOLDS ENERGY SOURCE DATA AND ENERGY SOURCE DATA METHODS

var modelEnergySources = {};


modelEnergySources.proc = function() {
    this.sources = this.getSources();
};


modelEnergySources.getSources = function() {
    return modelRoom.room.find(FIND_SOURCES);
};


module.exports = modelEnergySources;
