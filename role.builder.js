var conf = require('conf');

// models
var modelRoom = require('model.room');
var modelEnergySources = require('model.energy_sources');
var modelPickupFlag = require('model.pickup_flag');
var modelStorage = require('model.storage');


// GOVERNS BUILDER BEHAVIOR

var roleBuilder = {


    run: function(creep) {

        // get idle creep flag
        var roomFlags = modelRoom.room.find(FIND_FLAGS);
        var idleCreepFlag = _.find(roomFlags, (flag) => {
            return flag.name = conf.IDLE_CREEP_FLAG;
        });

        // ran out of energy while building, change to pickup mode
        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄  pickup');
        }
        // at max energy capacity, change to build mode
        if(this.shouldBuildMode(creep)) {
            creep.memory.building = true;
            creep.say('🚧  build');
        }

        // build mode
        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // construction sites need building
            if(targets.length > 0) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(
                        targets[0],
                        {visualizePathStyle: {stroke: '#ffffff'}}
                    );
                }
            }
            // move to idle flag
            else {
                creep.moveTo(
                    idleCreepFlag,
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }
        // pickup mode
        else {
            // use storage if we have it
            if(modelStorage.storage) {
                var storage = modelStorage.storage;
                var energy = modelStorage.storage.store[RESOURCE_ENERGY];
                if(energy) {
                    if(
                        creep.withdraw(storage, RESOURCE_ENERGY) ===
                        ERR_NOT_IN_RANGE
                    ) {
                        creep.moveTo(storage);
                    }
                } else {
                    creep.moveTo(
                        idleCreepFlag,
                        {visualizePathStyle: {stroke: '#ffaa00'}}
                    );
                }
            }
            // else, use pickup flag
            else {
                var ePickupFlag = modelPickupFlag.flag;
                var energy = modelPickupFlag.energy;
                if(!energy) {
                    creep.moveTo(
                        idleCreepFlag,
                        {visualizePathStyle: {stroke: '#ffaa00'}}
                    );
                } else if(creep.pos.isNearTo(ePickupFlag)) {
                    creep.pickup(energy);
                } else {
                    creep.moveTo(
                        ePickupFlag,
                        {visualizePathStyle: {stroke: '#ffaa00'}}
                    );
                }
            }
        }

    },


    shouldBuildMode: function(creep) {
        return (
            !creep.memory.building &&
            (
                creep.carry.energy === creep.carryCapacity ||
                !modelPickupFlag.energy && creep.carry.energy > 0
            )
        );
    }


};

module.exports = roleBuilder;
