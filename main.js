
var conf = require('conf');
var utils = require('utils');

// controllers
var ctrlSpawn = require('ctrl.spawn');
var ctrlCreep = require('ctrl.creep');
var ctrlConstruction = require('ctrl.construction');


module.exports.loop = function() {

    // controller processes
    ctrlSpawn.proc();
    ctrlCreep.proc();
    ctrlConstruction.proc();

};


