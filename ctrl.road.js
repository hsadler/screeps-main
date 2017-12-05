
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
            // 4. storage -> exits
            // 5. up, down, left, right from each extension
            // 6. up, down, left, right from each tower

        var paths = [];

    },


    getNextAvailableRoadConstructionPositionFromPaths: function(paths) {
        // for path in paths:
        //     for pos in path:
        //         if not pos.hasStructureOrConstructionSite():
        //             return pos
        // return null
    },


    getNextAvailableRoadConstructionPositionFromExtensions: function() {
        // for extension in room.extensions:
        //     for pos in extension.getSurroundingPositions():
        //         if not pos.hasStructureOrConstructionSite:
        //             return pos
        // return null
    }


};


module.exports = ctrlRoad;
