var roleUpgrader = {

    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(
            !creep.memory.upgrading &&
            creep.carry.energy == creep.carryCapacity
        ) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

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
        else {
            var sources = creep.room.find(FIND_SOURCES);
            // TODO REFACTOR: temporary way to split energy nodes
            var sourceToHarvest = sources.length > 1 ? sources[1] : sources[0];
            if(creep.harvest(sourceToHarvest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    sourceToHarvest,
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }
	}

};

module.exports = roleUpgrader;
