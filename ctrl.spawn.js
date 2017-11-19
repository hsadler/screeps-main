
// includes
var conf = require('conf');

// roles
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


var ctrlSpawn = {


    proc: function() {
        this.spawnCreep();
        this.show_messages();
    },


    spawnCreep: function() {

        // get current list of harvesters
        var harvesters = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'harvester';
        });

        // get current list of updgraders
        var upgraders = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'upgrader';
        });

        // get current list of builders
        var builders = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'builder';
        });

        // spawn builders if needed (priority 3)
        if(builders.length < conf.MAX_BUILDERS) {
            var creepName = 'b-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                [WORK,CARRY,MOVE],
                creepName,
                {memory: {role: 'builder'}}
            );
        }

        // spawn upgraders if needed (priority 2)
        if(upgraders.length < conf.MAX_UPGRADERS) {
            var creepName = 'u-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                [WORK,CARRY,MOVE],
                creepName,
                {memory: {role: 'upgrader'}}
            );
        }

        // spawn harvesters if needed (priority 1)
        if(harvesters.length < conf.MAX_HARVESTERS) {
            var creepName = 'h-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                [WORK,CARRY,MOVE],
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


    show_messages: function() {
        Game.spawns['Spawn1'].room.visual.text(
            'Game time: ' + Game.time,
            Game.spawns['Spawn1'].pos.x,
            Game.spawns['Spawn1'].pos.y + 2,
            {align: 'center', opacity: 0.8}
        );
    }


};

module.exports = ctrlSpawn;
