var conf = require('conf');

// models
var modelEnergySources = require('mode.energy_sources');


// GOVERNS BUILDER BEHAVIOR

var roleBuilder = {

    run: function(creep) {

        // ran out of energy while building
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        // at max energy capacity
        if(
            !creep.memory.building &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        // build mode
        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // construction sites need building
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(
                        targets[0],
                        {visualizePathStyle: {stroke: '#ffffff'}}
                    );
                }
            }
            // move to idle flag
            else {
                creep.moveTo(
                    Game.flags[conf.IDLE_CREEP_FLAG],
                    {visualizePathStyle: {stroke: '#ffffff'}}
                );
            }
        }
        // harvest mode
        else {
            var sources = modelEnergySources.sources;
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    sources[0],
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }

    }
};

module.exports = roleBuilder;
