
// models
var modelRoom = require('model.room');
var modelTower = require('model.tower');
var modelCreep = require('model.creep');


// CONTROLS TOWER BEHAVIOR

var ctrlTower = {


    proc: function() {

        var enemies = this.getEnemies();
        var creepsToHeal = this.getCreepsNeedingHeals();
        var structuresToRepair = this.getStructuresNeedingRepair();

        // priority #1
        if(enemies.length > 0) {
            this.attackEnemies(enemies);
        }
        // priority #2
        else if(creepsToHeal.length > 0) {
            this.healCreeps(creepsToHeal);
        }
        // priority #3
        else if(structuresToRepair.length > 0) {
            this.repairStructures(structuresToRepair);
        }

    },


    getEnemies: function() {
        return modelRoom.room.find(FIND_HOSTILE_CREEPS);
    },


    attackEnemies: function(enemies) {
        _.each(modelTower.towers, (tower) => {
            tower.attack(enemies[0]);
        });
    },


    getCreepsNeedingHeals: function() {
        return _.filter(modelCreep.creeps, (creep) => {
            return creep.hits < creep.hitsMax;
        });
    },


    healCreeps: function(creeps) {
        _.each(modelTower.towers, (tower) => {
            tower.heal(creeps[0]);
        });
    },


    // TODO: change this to only my structures and roads
    getStructuresNeedingRepair: function() {
        var structures = modelRoom.room.find(FIND_STRUCTURES);
        return _.filter(structures, (structure) => {
            return structure.hits < structure.hitsMax;
        });
    },


    repairStructures: function(structures) {
        _.each(modelTower.towers, (tower) => {
            tower.repair(structures[0]);
        });
    }


};


module.exports = ctrlTower;
