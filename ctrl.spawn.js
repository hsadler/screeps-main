
// includes
var conf = require('conf');

// models
var modelCreep = require('model.creep');
var modelEnergySources = require('model.energy_sources');
var modelPickupFlag = require('model.pickup_flag');

// controllers
var ctrlCreep = require('ctrl.creep');


// CONTROLS SPAWN BEHAVIOR

var ctrlSpawn = {


    proc: function() {
        this.spawnCreep();
    },


    spawnCreep: function() {

        // spawn haulers if needed (priority 1)
        if(modelCreep.haulers.length < modelEnergySources.sources.length) {
            var creepName = 'h-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.haulerCreep,
                creepName,
                {memory: {role: 'hauler'}}
            );
        }
        // spawn miners if needed (priority 2)
        else if(modelCreep.miners.length < modelEnergySources.sources.length) {
            var creepName = 'm-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.minerCreep,
                creepName,
                {memory: {role: 'miner'}}
            );
        }
        // spawn upgraders if needed (priority 3)
        else if(this.shouldSpawnUpgrader()) {
            var creepName = 'u-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.upgraderCreep,
                creepName,
                {memory: {role: 'upgrader'}}
            );
        }
        // spawn builders if needed (priority 4)
        else if(this.shouldSpawnBuilder()) {
            var creepName = 'b-' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(
                modelCreep.builderCreep,
                creepName,
                {memory: {role: 'builder'}}
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

        ctrlCreep.assignCreepRoles();

    },


    shouldSpawnUpgrader: function() {
        var minPickupFlagEnergy = 25;
        return (
            modelPickupFlag.energy &&
            modelPickupFlag.energy.energy > minPickupFlagEnergy &&
            modelCreep.upgraders.length < conf.MAX_UPGRADERS
        );
    },


    shouldSpawnBuilder: function() {
        var spawnRoom = Game.spawns['Spawn1'].room;
        var minPickupFlagEnergy = 25;
        return (
            modelPickupFlag.energy &&
            modelPickupFlag.energy.energy > minPickupFlagEnergy &&
            modelCreep.builders.length < conf.MAX_BUILDERS &&
            spawnRoom.find(FIND_CONSTRUCTION_SITES).length > 0
        );
    }


};

module.exports = ctrlSpawn;
