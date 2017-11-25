var conf = require('conf');

// models
var modelEnergySources = require('model.energy_sources');


// GOVERNS BUILDER BEHAVIOR

var roleBuilder = {

    run: function(creep) {

        // ran out of energy while building, change to pickup mode
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 pickup');
        }
        // at max energy capacity, change to build mode
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
        // pickup mode
        else {
            var ePickupFlag = Game.flags[conf.ENERGY_PICKUP_FLAG];
            if(creep.pos.isNearTo(ePickupFlag)) {
                var energy = creep.pos.findClosestByRange(
                    FIND_DROPPED_RESOURCES,
                    {filter: RESOURCE_ENERGY}
                );
                creep.pickup(energy);
            } else {
                creep.moveTo(
                    ePickupFlag,
                    {visualizePathStyle: {stroke: '#ffffff'}}
                );
            }
        }

    }
};

module.exports = roleBuilder;
