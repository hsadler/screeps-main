
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

    // TEST: suicide creep periodically
    // if(harvesters.length === conf.MAX_HARVESTERS && Game.time % 25 === 0) {
    //     harvesters[0].suicide();
    // }

    // TEST: suicide all creeps
    // for(var name in Game.creeps) Game.creeps[name].suicide();

};


