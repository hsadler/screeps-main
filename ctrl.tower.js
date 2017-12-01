
// models
var modelRoom = require('model.room');


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
        return [];
    },


    attackEnemies: function(enemies) {},


    getCreepsNeedingHeals: function() {
        return [];
    },


    healCreeps: function(creeps) {},


    getStructuresNeedingRepair: function() {
        return [];
    },


    repairStructures: function(structures) {}


};


module.exports = ctrlTower;
