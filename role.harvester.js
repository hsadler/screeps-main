var conf = require('conf');


var roleHarvester = {

    run: function(creep) {
        // harvest from node
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    sources[0],
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }
        // transport to base
        else {
            // get targets with available capacity
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN
                    ) && structure.energy < structure.energyCapacity;
                }
            });
            // target with capacity exists
            if(targets.length > 0) {
                if(
                    creep.transfer(targets[0], RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE
                ) {
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
    }

};

module.exports = roleHarvester;
