var conf = require('conf');

// models
var modelEnergySources = require('model.energy_sources');


// GOVERNS UPGRADER BEHAVIOR

var roleUpgrader = {


    run: function(creep) {

        // ran out of energy while upgrading, change to pickup mode
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 pickup');
	    }
        // reached max energy capacity while picking up, change to upgrade mode
	    if(
            !creep.memory.upgrading &&
            creep.carry.energy == creep.carryCapacity
        ) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

        // upgrading mode
	    if(creep.memory.upgrading) {
            if(
                creep.upgradeController(creep.room.controller) ==
                ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(
                    creep.room.controller,
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


module.exports = roleUpgrader;
