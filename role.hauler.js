
var conf = require('conf');

// models
var modelEnergySources = require('model.energy_sources');


// GOVERNS HAULER BEHAVIOR

var roleHauler = {


    run: function(creep) {

        // assign miner if not yet assigned
        if(!creep.memory.minerId) {
            // code..
        }

        // ran out of energy while delivering, change to haul mode
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
            creep.say('🔄 pickup');
        }
        // reached max energy capacity while picking up, change to deliver mode
        // TODO: change conditional for instant pickup and constant delivery
        if(
            !creep.memory.delivering &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.delivering = true;
            creep.say('⚡ deliver');
        }

        // delivering mode
        if(creep.memory.delivering) {
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
        // pickup mode
        else {

            // TODO: implement pickup logic
            // if cannot pickup energy, move to assigned miner

            // var sources = modelEnergySources.sources;
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(
            //         sources[0],
            //         {visualizePathStyle: {stroke: '#ffaa00'}}
            //     );
            // }
        }

    }


};


module.exports = roleHarvester;
