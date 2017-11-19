
var conf = require('conf');
var utils = require('utils');

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

    // get construction site list
    var spawn = Game.spawns['Spawn1'];
    var room = spawn.room;
    var extensionConstrSites = room.find(FIND_MY_CONSTRUCTION_SITES, {
        filter: function(structure) {
            return structure.structureType === STRUCTURE_EXTENSION;
        }
    });

    // create more if not at max amount
    if(extensionConstrSites.length < conf.MAX_EXTENTION_CONSTRUCTION_SITES) {
        var maxDistanceFromSpawn = 6;
        var minX = spawn.pos.x - maxDistanceFromSpawn;
        var minY = spawn.pos.y - maxDistanceFromSpawn;
        var maxX = spawn.pos.x + maxDistanceFromSpawn;
        var maxY = spawn.pos.y + maxDistanceFromSpawn;
        do {
            var randX = utils.getRandomInt(minX, maxX);
            var randY = utils.getRandomInt(minY, maxY);
        } while(
            room.createConstructionSite(randX, randY, STRUCTURE_EXTENSION) !== OK
        );
    }



};


