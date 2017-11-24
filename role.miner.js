
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
        var unmined = [];
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.sourceId) {
                assignedSourceIds.push(creep.memory.sourceId);
            }
        }
        var unminedSources = modelEnergySources.sources
            .filter(function(source) {
                return assignedSourceIds.indexOf(source.id) === -1;
            });
        if(unminedSources.length > 0) {
            return unminedSources[0];
        } else {
            return null;
        }
    }

};

module.exports = roleMiner;
