
// includes
var conf = require('conf');

// models
var modelGame = require('model.game');
var modelCreep = require('model.creep');
var modelEnergySources = require('model.energy_sources');

// controllers
var ctrlCreep = require('ctrl.creep');


// CONTROLS SPAWN BEHAVIOR

var ctrlSpawn = {


    proc: function() {
        this.spawnCreep();
        ctrlCreep.assignCreepRoles();
        if(conf.DISPLAY_GAME_INFO) this.displayGameInformation();
    },


    spawnCreep: function() {

        // spawn builders if needed (priority 4)
        if(modelCreep.builders.length < conf.MAX_BUILDERS) {
            var creepName = 'b-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.generalCreep,
                creepName,
                {memory: {role: 'builder'}}
            );
        }

        // spawn upgraders if needed (priority 3)
        if(modelCreep.upgraders.length < conf.MAX_UPGRADERS) {
            var creepName = 'u-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.generalCreep,
                creepName,
                {memory: {role: 'upgrader'}}
            );
        }

        // spawn harvesters if needed (priority 2)
        if(modelCreep.harvesters.length < conf.MAX_HARVESTERS) {
            var creepName = 'h-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.generalCreep,
                creepName,
                {memory: {role: 'harvester'}}
            );
        }

        // spawn miners if needed (priority 1)
        if(modelCreep.miners.length < conf.MAX_MINERS) {
            var creepName = 'm-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.minerCreep,
                creepName,
                {memory: {role: 'miner'}}
            );
        }

        // show creep spawn message
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep =
                Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🐣 ' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }

    },


    displayGameInformation: function() {

        var spawn = Game.spawns['Spawn1'];
        var xPos = 4;
        var infoStyle = {align: 'left', opacity: 0.8};

        spawn.room.visual

            // game ticks
            .text(
                'Game time: ' + Game.time,
                xPos, spawn.pos.y - 5, infoStyle
            )

            // cpu info
            .text(
                'CPU limit: ' + Game.cpu.limit,
                xPos, spawn.pos.y - 3, infoStyle
            )
            .text(
                'CPU tick limit: ' + Game.cpu.tickLimit,
                xPos, spawn.pos.y - 2, infoStyle
            )
            .text(
                'CPU used: ' + Math.floor(Game.cpu.getUsed()),
                xPos, spawn.pos.y - 1, infoStyle
            )

            // creep info
            .text(
                'Total creeps: ' + Object.keys(Game.creeps).length,
                xPos, spawn.pos.y + 1, infoStyle
            )
            .text(
                'Miners: ' + modelCreep.miners.length,
                xPos, spawn.pos.y + 2, infoStyle
            )
            .text(
                'Harvesters: ' + modelCreep.harvesters.length,
                xPos, spawn.pos.y + 3, infoStyle
            )
            .text(
                'Upgraders: ' + modelCreep.upgraders.length,
                xPos, spawn.pos.y + 4, infoStyle
            )
            .text(
                'Builders: ' + modelCreep.builders.length,
                xPos, spawn.pos.y + 5, infoStyle
            )

            // energy info
            .text(
                'Energy capacity: ' + modelGame.totalEnergyCapacity,
                xPos, spawn.pos.y + 7, infoStyle
            )
            .text(
                'Energy Stored: ' + modelGame.totalEnergyStored,
                xPos, spawn.pos.y + 8, infoStyle
            )
            .text(
                'Harvest rate: coming soon...',
                xPos, spawn.pos.y + 9, infoStyle
            );

    }


};

module.exports = ctrlSpawn;
