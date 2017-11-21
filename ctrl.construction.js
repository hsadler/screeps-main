
var ctrlConstruction = {


    proc: function() {
        // this.spawnExtensionConstructionSite();
    },


    // TODO: buggy, causes CPU limit overflow
    spawnExtensionConstructionSite: function() {
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
    }


};

module.exports = ctrlConstruction;
