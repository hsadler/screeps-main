
// models
var modelRoom = require('model.room');
var modelCreep = require('model.creep');
var modelEnergySources = require('model.energy_sources');


// GOVERNS MINER BEHAVIOR

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
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
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
        var assignedSourceIds = modelCreep.creeps.filter((creep) => {
            return creep.memory.sourceId;
        }).map((creep) => { return creep.memory.sourceId; });
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
