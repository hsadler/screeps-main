var conf = require('conf');

// models
var modelEnergySources = require('model.energy_sources');
var modelPickupFlag = require('model.pickup_flag');


// GOVERNS UPGRADER BEHAVIOR

var roleUpgrader = {


    run: function(creep) {

        // ran out of energy while upgrading, change to pickup mode
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄  pickup');
	    }
        // reached max energy capacity while picking up, change to upgrade mode
	    if(this.shouldUpgradeMode(creep)) {
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
            var ePickupFlag = modelPickupFlag.flag;
            var energy = modelPickupFlag.energy;
            if(!energy) {
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

	},


    shouldUpgradeMode: function(creep) {
        return (
            !creep.memory.building &&
            (
                creep.carry.energy === creep.carryCapacity ||
                !modelPickupFlag.energy && creep.carry.energy > 0
            )
        );
    }


};


module.exports = roleUpgrader;
