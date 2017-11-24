
// models
var modelGame = require('model.game');
var modelCreep = require('model.creep');

// roles
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


// CONTROLS CREEP BEHAVIOR

var ctrlCreep = {


    proc: function() {
        this.clearDeadCreepFromMemory();
    },


    // TODO: maybe refactor to use list of creep roles set in config or creep model
    assignCreepRoles: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'miner') {
                roleMiner.run(creep);
            } else if(creep.memory.role == 'hauler') {
                roleHauler.run(creep);
            }
            // TODO DELETE: no harvesters
            // else if(creep.memory.role == 'harvester') {
            //     roleHarvester.run(creep);
            // }
            else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            } else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            } else if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    },


    clearDeadCreepFromMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing dead creep memory:', name);
            }
        }
    }


};

module.exports = ctrlCreep;
