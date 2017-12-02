
var conf = require('conf');
var utils = require('utils');

// models
var modelCreep = require('model.creep');
var modelSpawn = require('model.spawn');
var modelExtension = require('model.extension');
var modelTower = require('model.tower');
var modelStorage = require('model.storage');
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
                creep.memory.minerId = null;
            }
        }

        // ran out of energy while delivering, change to haul mode
        if(creep.memory.delivering && creep.carry.energy === 0) {
            creep.memory.delivering = false;
            creep.say('🔄  pickup');
        }
        // reached max energy capacity while picking up, change to deliver mode
        if(
            !creep.memory.delivering &&
            creep.carry.energy === creep.carryCapacity
        ) {
            creep.memory.delivering = true;
            creep.say('⚡  deliver');
        }

        // delivering mode
        if(creep.memory.delivering) {

            // get targets with available capacity
            var availSpawns = _.filter(modelSpawn.spawns, (spawn) => {
                return spawn.energy < spawn.energyCapacity;
            });
            var availExtensions = _.filter(modelExtension.extensions,
                (extension) => {
                    return extension.energy < extension.energyCapacity;
                });
            var availTowers = _.filter(modelTower.towers, (tower) => {
                return tower.energy < tower.energyCapacity;
            });

            // set priority group and closest target of group
            var target;
            if(availSpawns.length > 0) {
                target = this.getClosestTargetOfTargets(creep.pos, availSpawns);
            } else if(availExtensions.length > 0) {
                target = this.getClosestTargetOfTargets(creep.pos, availExtensions);
            } else if(availTowers.length > 0) {
                target = this.getClosestTargetOfTargets(creep.pos. availTowers);
            }

            // target with capacity exists
            if(target) {
                if(
                    creep.transfer(target, RESOURCE_ENERGY) ===
                    ERR_NOT_IN_RANGE
                ) {
                    creep.moveTo(
                        target,
                        {visualizePathStyle: {stroke: '#ffffff'}}
                    );
                }
            }
            // move to pickup
            else {
                // use storage if we have it
                if(modelStorage.storage) {
                    if(
                        creep.transfer(modelStorage.storage, RESOURCE_ENERGY) ===
                        ERR_NOT_IN_RANGE
                    ) {
                        creep.moveTo(
                            modelStorage.storage,
                            {visualizePathStyle: {stroke: '#ffffff'}}
                        );
                    }
                }
                // else, use pickup flag
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
                if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
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
    },


    getClosestTargetOfTargets: function(pos, targets) {
        var closest;
        var closestDistance;
        var currTargetDistance;
        _.each(targets, (target) => {
            if(!closest) {
                closest = target;
            } else {
                closestDistance = utils.getDistance(pos, closest.pos);
                currTargetDistance = utils.getDistance(pos, target.pos);
                if(currTargetDistance < closestDistance) closest = target;
            }
        });
        return closest;
    }


};


module.exports = roleHauler;
