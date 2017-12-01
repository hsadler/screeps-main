
var conf = require('conf');
var utils = require('utils');

// models
var modelGame = require('model.game');
var modelRoom = require('model.room');
var modelSpawn = require('model.spawn');
var modelExtension = require('model.extension');
var modelStorage = require('model.storage');
var modelTower = require('model.tower');
var modelCreep = require('model.creep');
var modelEnergySources = require('model.energy_sources');
var modelPickupFlag = require('model.pickup_flag');

// controllers
var ctrlSpawn = require('ctrl.spawn');
var ctrlCreep = require('ctrl.creep');
var ctrlTower = require('ctrl.tower');
var ctrlConstruction = require('ctrl.construction');
var ctrlAnalytics = require('ctrl.analytics');



module.exports.loop = function() {


    // world processes
    modelGame.proc();


    // room processes
    for(var name in Game.rooms) {

        var room = Game.rooms[name];
        modelRoom.setRoom(room);

        // model processes
        modelSpawn.proc();
        modelExtension.proc();
        modelStorage.proc();
        modelTower.proc();
        modelCreep.proc();
        modelEnergySources.proc();
        modelPickupFlag.proc();

        // controller processes
        ctrlSpawn.proc();
        ctrlCreep.proc();
        ctrlTower.proc();
        ctrlConstruction.proc();
        ctrlAnalytics.proc();

    }


    // TESTING:
    // _.each(Game.creeps, function(creep) { creep.suicide(); });


};


