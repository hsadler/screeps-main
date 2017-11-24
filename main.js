
var conf = require('conf');
var utils = require('utils');

// models
var modelGame = require('model.game');
var modelCreep = require('model.creep');
var modelEnergySources = require('mode.energy_sources');

// controllers
var ctrlSpawn = require('ctrl.spawn');
var ctrlCreep = require('ctrl.creep');
var ctrlConstruction = require('ctrl.construction');


module.exports.loop = function() {

    // model processes
    modelGame.proc();
    modelCreep.proc();
    modelEnergySources.proc();

    // controller processes
    ctrlSpawn.proc();
    ctrlCreep.proc();
    ctrlConstruction.proc();

};


