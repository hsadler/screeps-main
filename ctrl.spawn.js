
// includes
var conf = require('conf');

// models
var modelGame = require('model.game');
var modelCreep = require('model.creep');

// roles
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


var ctrlSpawn = {


    proc: function() {
        this.init();
        this.spawnCreep();
        if(conf.DISPLAY_GAME_INFO) this.displayGameInformation();
    },


    // for setting data per tick or saving to memory
    init: function() {

        // get current list of harvesters
        this.harvesters = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'harvester';
        });

        // get current list of updgraders
        this.upgraders = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'upgrader';
        });

        // get current list of builders
        this.builders = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'builder';
        });

    },


    spawnCreep: function() {

        // spawn builders if needed (priority 3)
        if(this.builders.length < conf.MAX_BUILDERS) {
            var creepName = 'b-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.generalCreep,
                creepName,
                {memory: {role: 'builder'}}
            );
        }

        // spawn upgraders if needed (priority 2)
        if(this.upgraders.length < conf.MAX_UPGRADERS) {
            var creepName = 'u-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.generalCreep,
                creepName,
                {memory: {role: 'upgrader'}}
            );
        }

        // spawn harvesters if needed (priority 1)
        if(this.harvesters.length < conf.MAX_HARVESTERS) {
            var creepName = 'h-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.generalCreep,
                creepName,
                {memory: {role: 'harvester'}}
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

        // assign creep roles
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            } else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            } else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            } else if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
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
                'Harvesters: ' + this.harvesters.length,
                xPos, spawn.pos.y + 2, infoStyle
            )
            .text(
                'Upgraders: ' + this.upgraders.length,
                xPos, spawn.pos.y + 3, infoStyle
            )
            .text(
                'Builders: ' + this.builders.length,
                xPos, spawn.pos.y + 4, infoStyle
            )

            // energy info
            .text(
                'Energy capacity: ' + modelGame.totalEnergyCapacity,
                xPos, spawn.pos.y + 6, infoStyle
            )
            .text(
                'Energy Stored: ' + modelGame.totalEnergyStored,
                xPos, spawn.pos.y + 7, infoStyle
            )
            .text(
                'Harvest rate: coming soon...',
                xPos, spawn.pos.y + 8, infoStyle
            );

    }


};

module.exports = ctrlSpawn;
