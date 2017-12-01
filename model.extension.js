
var modelRoom = require('model.room');


// HOLDS EXTENSION DATA AND EXTENSION DATA METHODS

var modelExtension = {};


modelExtension.proc = function() {
    this.extensions = this.getExtensions();
};


modelExtension.getExtensions = function() {
    var structures = modelRoom.room.find(FIND_MY_STRUCTURES);
    return _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_EXTENSION;
    });
};


module.exports = modelExtension;
