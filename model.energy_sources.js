

// HOLDS ENERGY SOURCE DATA AND ENERGY SOURCE DATA METHODS

var modelEnergySources = {};


// methods

modelEnergySources.proc = function() {
    modelEnergySources.sources = modelEnergySources.getSources();
};

modelEnergySources.getSources = function() {
    return Game.spawns['Spawn1'].room.find(FIND_SOURCES);
};


module.exports = modelEnergySources;
