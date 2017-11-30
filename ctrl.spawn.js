
// includes
var conf = require('conf');

// models
var modelRoom = require('model.room');
var modelCreep = require('model.creep');
var modelEnergySources = require('model.energy_sources');
var modelPickupFlag = require('model.pickup_flag');
var modelStorage = require('model.storage');

// controllers
var ctrlCreep = require('ctrl.creep');


// CONTROLS SPAWN BEHAVIOR

var ctrlSpawn = {


    proc: function() {
        this.spawnCreeps();
    },


    spawnCreeps: function() {
        var spawns = modelRoom.room.find(FIND_MY_SPAWNS);
        var that = this;
        _.each(spawns, function(spawn) {
            that.spawnCreepFromSpawn(spawn);
        });
    },


    spawnCreepFromSpawn: function(spawn) {

        // spawn haulers if needed (priority 1)
        if(modelCreep.haulers.length < modelEnergySources.sources.length) {
            var creepName = 'h-' + Game.time;
            spawn.spawnCreep(
                modelCreep.haulerCreep,
                creepName,
                {memory: {role: 'hauler'}}
            );
        }
        // spawn miners if needed (priority 2)
        else if(modelCreep.miners.length < modelEnergySources.sources.length) {
            var creepName = 'm-' + Game.time;
            spawn.spawnCreep(
                modelCreep.minerCreep,
                creepName,
                {memory: {role: 'miner'}}
            );
        }
        // spawn upgraders if needed (priority 3)
        else if(this.shouldSpawnUpgrader()) {
            var creepName = 'u-' + Game.time;
            spawn.spawnCreep(
                modelCreep.upgraderCreep,
                creepName,
                {memory: {role: 'upgrader'}}
            );
        }
        // spawn builders if needed (priority 4)
        else if(this.shouldSpawnBuilder()) {
            var creepName = 'b-' + Game.time;
            spawn.spawnCreep(
                modelCreep.builderCreep,
                creepName,
                {memory: {role: 'builder'}}
            );
        }

        // show creep spawn message
        if(spawn.spawning) {
            var spawningCreep =
                Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🐣 ' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        }

        ctrlCreep.assignCreepRoles();

    },


    shouldSpawnUpgrader: function() {
        var minPickupEnergy = 250;
        var pickupEnergy = modelStorage.storage.store[RESOURCE_ENERGY];
        return (
            pickupEnergy > minPickupEnergy &&
            modelCreep.upgraders.length < conf.MAX_UPGRADERS
        );
    },


    shouldSpawnBuilder: function() {
        var minPickupEnergy = 250;
        var pickupEnergy = modelStorage.storage.store[RESOURCE_ENERGY];
        return (
            pickupEnergy > minPickupEnergy &&
            modelCreep.builders.length < conf.MAX_BUILDERS &&
            modelRoom.room.find(FIND_CONSTRUCTION_SITES).length > 0
        );
    }


};

module.exports = ctrlSpawn;
