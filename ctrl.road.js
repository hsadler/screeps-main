
var modelRoom = require('model.room');
var modelSpawn = require('model.spawn');
var modelEnergySources = require('model.energy_sources');
var modelExtension = require('model.extension');
var modelStorage = require('model.storage');


// CONTROLS ROAD BEHAVIOR

var ctrlRoad = {


    proc: function() {

        // TESTING:
        // var path = modelRoom.room.findPath(
        //     modelStorage.storage.pos,
        //     modelRoom.room.controller.pos
        // );
        // console.log(JSON.stringify(path));

        this.constructRoomRoads();
    },


    constructRoomRoads: function() {

        // roads to construct:
            // 1. spawn -> energy sources
            // 2. energy sources -> storage
            // 3. storage -> controller
            // 4. storage -> owned rooms (link rooms)
            // 5. up, down, left, right from each extension
            // 6. up, down, left, right from each tower
            // 7. up, down, left, right from each spawn

        // all paths to check for road construction
        var paths = [];
        // road construction site to be set
        var nextRoadConstructionSite = null;
        // spawn to use as path point
        var primarySpawn = modelSpawn.spawns[0];

        // add paths from energy sources to primary spawn
        modelEnergySources.sources.forEach((source) => {
            paths.push(modelRoom.room.findPath(source.pos, primarySpawn.pos));
        });

        // add paths from energy sources to storage
        modelEnergySources.sources.forEach((source) => {
            paths.push(modelRoom.room.findPath(source.pos, modelStorage.storage.pos));
        });

        // add path from storage to controller
        paths.push(modelRoom.room.findPath(modelStorage.storage.pos, modelRoom.room.controller));

        // TODO: add paths from storage to exits to owned rooms here...

        // get next available construction position from paths, and construct if exists
        nextRoadConstructionSitePos = this.getNextAvailableRoadConstructionPositionFromPaths(paths);
        if(nextRoadConstructionSite) {
            modelRoom.room.creatConstructionSite(nextRoadConstructionSitePos, STRUCTURE_ROAD);
            return;
        }

        // left off here..

    },


    getNextAvailableRoadConstructionPositionFromPaths: function(paths) {
        // for path in paths:
        //     for pos in path:
        //         if not pos.hasStructureOrConstructionSite():
        //             return pos
        // return null
    },


    getNextAvailableRoadConstructionPositionFromStructures: function(structures) {
        // for structure in structures:
        //     for pos in structure.getSurroundingPositions():
        //         if not pos.hasStructureOrConstructionSite:
        //             return pos
        // return null
    }


};


module.exports = ctrlRoad;
