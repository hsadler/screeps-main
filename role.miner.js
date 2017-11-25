
// models
var modelEnergySources = require('model.energy_sources');


// GOVERNS HARVESTER BEHAVIOR

var roleMiner = {

    run: function(creep) {
        // assign source if not yet assigned
        if(!creep.memory.sourceId) {
            var source = this.getUnminedSource();
            if(source) {
                creep.memory.sourceId = source.id;
            }
        }
        // get assigned source
        var source = Game.getObjectById(creep.memory.sourceId);
        // if source exists, harvest, otherwise throw error
        if(source) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    source,
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        } else {
            console.log('Error: no source available for miner!');
        }
    },

    getUnminedSource: function() {
        // get list of ids for assigned energy sources
        var assignedSourceIds = [];
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.sourceId) {
                assignedSourceIds.push(creep.memory.sourceId);
            }
        }
        // get list of unmined energy sources by subtracting assigned
        // energy sources from total energy sources
        var unminedSources = modelEnergySources.sources
            .filter(function(source) {
                return assignedSourceIds.indexOf(source.id) === -1;
            });
        // return result
        if(unminedSources.length > 0) {
            return unminedSources[0];
        } else {
            return null;
        }
    }

};

module.exports = roleMiner;
