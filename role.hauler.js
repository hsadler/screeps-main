
var conf = require('conf');

// models
var modelCreep = require('model.creep');
var modelEnergySources = require('model.energy_sources');


// GOVERNS HAULER BEHAVIOR

var roleHauler = {


    run: function(creep) {

        // assign miner if not yet assigned or reassign if miner is dead
        if(!creep.memory.minerId || !Game.getObjectById(creep.memory.minerId)) {
            var miner = this.getUnassignedMiner();
            if(miner) {
                creep.memory.minerId = miner.id;
            } else {
                creep.memory.minerId = null
            }
        }

        // ran out of energy while delivering, change to haul mode
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
            creep.say('🔄  pickup');
        }
        // reached max energy capacity while picking up, change to deliver mode
        if(
            !creep.memory.delivering &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.delivering = true;
            creep.say('⚡  deliver');
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
                var ePickupFlag = Game.flags[conf.ENERGY_PICKUP_FLAG];
                if(creep.pos.isEqualTo(ePickupFlag)) {
                    creep.drop(RESOURCE_ENERGY);
                } else {
                    creep.moveTo(
                        ePickupFlag,
                        {visualizePathStyle: {stroke: '#ffffff'}}
                    );
                }
            }
        }
        // pickup mode
        else {
            // act as hauler if we have paired miner
            if(creep.memory.minerId) {
                var miner = Game.getObjectById(creep.memory.minerId);
                // if cannot pickup energy, move to assigned miner
                var target = miner.pos.findClosestByRange(
                    FIND_DROPPED_RESOURCES,
                    {filter: RESOURCE_ENERGY}
                );
                if(target) {
                    if(creep.pickup(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(
                            miner,
                            {visualizePathStyle: {stroke: '#ffaa00'}}
                        );
                    }
                }
            }
            // else, act as harvester
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

    },


    getUnassignedMiner: function() {
        // get list of ids for assigned miner creeps
        var assignedMinerIds = [];
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.minerId) {
                assignedMinerIds.push(creep.memory.minerId);
            }
        }
        // get list of unassigned miners by subtracting assigned
        // miners from total miners
        var unassignedMiners = modelCreep.miners
            .filter(function(miner) {
                return assignedMinerIds.indexOf(miner.id) === -1;
            });
        // return result
        if(unassignedMiners.length > 0) {
            return unassignedMiners[0];
        } else {
            return null;
        }
    }


};


module.exports = roleHauler;