
var modelRoom = require('model.room');
var modelSpawn = require('model.spawn');
var modelEnergySources = require('model.energy_sources');
var modelExtension = require('model.extension');
var modelStorage = require('model.storage');
var modelTower = require('model.tower');


// CONTROLS ROAD BEHAVIOR

var ctrlRoad = {


    PATHS_ENERGY_SOURCES_TO_SPAWN: 1,
    PATHS_ENERGY_SOURCES_TO_STORAGE: 2,
    PATH_STORAGE_TO_CONTROLLER: 3,
    PATHS_STORAGE_TO_EXITS: 4,


    proc: function() {

        // var path = modelRoom.room.findPath(
        //     modelEnergySources.sources[0].pos,
        //     modelEnergySources.sources[1].pos
        // );
        // console.log(JSON.stringify(path));

        // find or create road paths in memory
        this.roadPaths = this.findOrCreateRoadPaths();
        // create construction site
        this.createNewRoadConstructionSite();

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
        // spawn to use as path point
        var primarySpawn = modelSpawn.spawns[0];

        // add paths from energy sources to primary spawn
        modelEnergySources.sources.forEach((source) => {
            paths.push(
                modelRoom.room.findPath(source.pos, primarySpawn.pos)
            );
        });

        // add paths from energy sources to storage
        modelEnergySources.sources.forEach((source) => {
            paths.push(
                modelRoom.room.findPath(source.pos, modelStorage.storage.pos)
            );
        });

        // add path from storage to controller
        paths.push(
            modelRoom.room.findPath(
                modelStorage.storage.pos,
                modelRoom.room.controller.pos
            )
        );


        // TODO: add paths from storage to exits to owned rooms here...
        // maybe needs to be implemented in a world process rather than a room
        // process



        // ORIGINAL IMPLEMENTATION NOT WORKING CORRECTLY
        // paths.forEach((path) => {
        //     path.forEach((pathPoint) => {
        //         var pos = modelRoom.room.getPositionAt(
        //             pathPoint.x, pathPoint.y
        //         );
        //         if(modelRoom.room.createConstructionSite(pos, STRUCTURE_ROAD) === OK) {
        //             return;
        //         }
        //     });
        // });

        // // get next available construction position from paths
        // // construct if exists
        // nextPos = this.getNextAvailableRoadConstrPositionFromPaths(paths);
        // if(nextPos) {
        //     modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
        //     return;
        // }

        // // get next available construction position from extensions
        // // construct if exists
        // nextPos = this.getNextAvailableRoadConstrPositionFromStructures(
        //     modelExtension.extensions
        // );
        // if(nextPos) {
        //     modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
        //     return;
        // }

        // // get next available construction position from towers
        // // construct if exists
        // nextPos = this.getNextAvailableRoadConstrPositionFromStructures(
        //     modelTower.towers
        // );
        // if(nextPos) {
        //     modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
        //     return;
        // }

        // // get next available construction position from spawns
        // // construct if exists
        // nextPos = this.getNextAvailableRoadConstrPositionFromStructures(
        //     modelSpawn.spawns
        // );
        // if(nextPos) {
        //     modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
        //     return;
        // }

    },


    findOrCreateRoadPaths: function() {
        var roomMem = modelRoom.room.memory;
        if(!roomMem.roadPaths) {
            roomMem.roadPaths = [];
        }
        // console.log(JSON.stringify(roomMem));
    },


    createNewRoadConstructionSite: function() {},


    // NOT USED
    getNextAvailableRoadConstrPositionFromPaths: function(paths) {
        paths.forEach((path) => {
            path.forEach((pathPoint) => {
                var pos = modelRoom.room.getPositionAt(
                    pathPoint.x, pathPoint.y
                );
            });
        });
    },


    // NOT USED
    getNextAvailableRoadConstrPositionFromStructures: function(structures) {
        // for structure in structures:
        //     for pos in structure.getSurroundingPositions():
        //         if not pos.hasStructureOrConstructionSite:
        //             return pos
        // return null
    }


};


module.exports = ctrlRoad;
