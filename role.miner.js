
// models
var modelEnergySources = require('model.energy_sources');


// GOVERNS HARVESTER BEHAVIOR

var roleMiner = {

    run: function(creep) {

        var sources = modelEnergySources.sources;

        // TODO: select energy source depending on miner index
        // var source = ???;

        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(
                source,
                {visualizePathStyle: {stroke: '#ffaa00'}}
            );
        }
    }

};

module.exports = roleMiner;
