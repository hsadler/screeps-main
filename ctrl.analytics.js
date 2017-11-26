// includes
var conf = require('conf');

// models
var modelGame = require('model.game');
var modelCreep = require('model.creep');


// CONTROLS ANALYTICS BEHAVIOR

var ctrlAnalytics = {


    proc: function() {
        this.energyHarvestedPerTick = this.getEnergyHarvestedPerTick();
        this.energyStoredPerTick = this.getEnergyStoredPerTick();
        this.controllerUpgradePerTick = this.getControllerUpgradePerTick();
        this.constructionPerTick = this.getConstructionPerTick();
        if(conf.DISPLAY_GAME_INFO) this.displayGameInformation();
    },


    getEnergyHarvestedPerTick: function() {},


    getEnergyStoredPerTick: function() {},


    getControllerUpgradePerTick: function() {},


    getConstructionPerTick: function() {},


    displayGameInformation: function() {

        var spawn = Game.spawns['Spawn1'];
        var xPos = 20;
        var yPos = spawn.pos.y - 5;
        var infoStyle = {align: 'left', opacity: 0.8};

        spawn.room.visual

            // game ticks
            .text(
                'Game time: ' + Game.time,
                xPos, yPos - 5, infoStyle
            )

            // cpu info
            .text(
                'CPU limit: ' + Game.cpu.limit,
                xPos, yPos - 3, infoStyle
            )
            .text(
                'CPU tick limit: ' + Game.cpu.tickLimit,
                xPos, yPos - 2, infoStyle
            )
            .text(
                'CPU used: ' + Math.floor(Game.cpu.getUsed()),
                xPos, yPos - 1, infoStyle
            )

            // creep info
            .text(
                'Total creeps: ' + Object.keys(Game.creeps).length,
                xPos, yPos + 1, infoStyle
            )
            .text(
                'Miners: ' + modelCreep.miners.length,
                xPos, yPos + 2, infoStyle
            )
            .text(
                'Hauler: ' + modelCreep.haulers.length,
                xPos, yPos + 3, infoStyle
            )
            .text(
                'Upgraders: ' + modelCreep.upgraders.length,
                xPos, yPos + 4, infoStyle
            )
            .text(
                'Builders: ' + modelCreep.builders.length,
                xPos, yPos + 5, infoStyle
            )

            // energy info
            .text(
                'Energy capacity: ' + modelGame.totalEnergyCapacity,
                xPos, yPos + 7, infoStyle
            )
            .text(
                'Energy Stored: ' + modelGame.totalEnergyStored,
                xPos, yPos + 8, infoStyle
            )
            .text(
                'Harvest rate: coming soon...',
                xPos, yPos + 9, infoStyle
            );

    }


};


module.exports = ctrlAnalytics;
