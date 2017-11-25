var conf = require('conf');

// models
var modelEnergySources = require('model.energy_sources');


// GOVERNS BUILDER BEHAVIOR

var roleBuilder = {

    run: function(creep) {

        // ran out of energy while building, change to pickup mode
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄  pickup');
        }
        // at max energy capacity, change to build mode
        if(
            !creep.memory.building &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.building = true;
            creep.say('🚧  build');
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
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }
        // pickup mode
        else {
            var ePickupFlag = Game.flags[conf.ENERGY_PICKUP_FLAG];
            var energy = ePickupFlag.pos.findClosestByRange(
                FIND_DROPPED_RESOURCES,
                {filter: RESOURCE_ENERGY}
            );
            if(!energy.pos.isEqualTo(ePickupFlag)) {
                creep.moveTo(
                    Game.flags[conf.IDLE_CREEP_FLAG],
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
};

module.exports = roleBuilder;
