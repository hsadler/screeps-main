var conf = require('conf');

// models
var modelEnergySources = require('model.energy_sources');


// GOVERNS UPGRADER BEHAVIOR

var roleUpgrader = {


    run: function(creep) {

        // ran out of energy while upgrading, change to pickup mode
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄  pickup');
	    }
        // reached max energy capacity while picking up, change to upgrade mode
	    if(
            !creep.memory.upgrading &&
            creep.carry.energy == creep.carryCapacity
        ) {
	        creep.memory.upgrading = true;
	        creep.say('⚡  upgrade');
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
            var energy = ePickupFlag.pos.findClosestByRange(
                FIND_DROPPED_RESOURCES,
                {filter: RESOURCE_ENERGY}
            );
            if(!energy || !energy.pos.isEqualTo(ePickupFlag)) {
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


module.exports = roleUpgrader;
