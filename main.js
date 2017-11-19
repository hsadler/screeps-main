
var conf = require('conf');

// controllers
var ctrlSpawn = require('ctrl.spawn');
var ctrlCreep = require('ctrl.creep');


module.exports.loop = function() {

    // controller inits
    ctrlSpawn.init();
    ctrlCreep.init();

    // TEST: suicide creep periodically
    // if(harvesters.length === conf.MAX_HARVESTERS && Game.time % 25 === 0) {
    //     harvesters[0].suicide();
    // }

    // TEST: suicide all creeps
    // for(var name in Game.creeps) Game.creeps[name].suicide();


    // TODO: create construction sites
        // (move to a room controller or contruction site controller later)

    var chooseExtensionConstrSiteCoords = function() {
        // LEFT OFF HERE...
    };

    // get construction site list
    var room = Game.spawns['Spawn1'].room;
    var constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);

    // create more if not at max amount
    if(constructionSites.length < conf.MAX_EXTENTION_CONSTRUCTION_SITES) {
        // room.createConstructionSite(

        //     STRUCTURE_EXTENSION
        // );
    }



};


