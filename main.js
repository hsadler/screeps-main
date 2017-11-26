
var conf = require('conf');
var utils = require('utils');

// models
var modelGame = require('model.game');
var modelCreep = require('model.creep');
var modelEnergySources = require('model.energy_sources');
var modelPickupFlag = require('model.pickup_flag');

// controllers
var ctrlSpawn = require('ctrl.spawn');
var ctrlCreep = require('ctrl.creep');
var ctrlConstruction = require('ctrl.construction');
var ctrlAnalytics = require('ctrl.analytics');


module.exports.loop = function() {

    // model processes
    modelGame.proc();
    modelCreep.proc();
    modelEnergySources.proc();
    modelPickupFlag.proc();

    // controller processes
    ctrlSpawn.proc();
    ctrlCreep.proc();
    ctrlConstruction.proc();
    ctrlAnalytics.proc();

};


