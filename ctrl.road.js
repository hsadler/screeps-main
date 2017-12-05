
var modelRoom = require('model.room');
var modelSpawn = require('model.spawn');
var modelEnergySources = require('model.energy_sources');
var modelExtension = require('model.extension');
var modelStorage = require('model.storage');
var modelTower = require('model.tower');


// CONTROLS ROAD BEHAVIOR

var ctrlRoad = {


    proc: function() {
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
        var nextPos = null;
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
                modelRoom.room.controller
            )
        );


        // TODO: add paths from storage to exits to owned rooms here...
        // maybe needs to be implemented in a world process rather than a room
        // process


        // get next available construction position from paths
        // construct if exists
        nextPos = this.getNextAvailableRoadConstrPositionFromPaths(paths);
        if(nextPos) {
            modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
            return;
        }

        // get next available construction position from extensions
        // construct if exists
        nextPos = this.getNextAvailableRoadConstrPositionFromStructures(
            modelExtension.extensions
        );
        if(nextPos) {
            modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
            return;
        }

        // get next available construction position from towers
        // construct if exists
        nextPos = this.getNextAvailableRoadConstrPositionFromStructures(
            modelTower.towers
        );
        if(nextPos) {
            modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
            return;
        }

        // get next available construction position from spawns
        // construct if exists
        nextPos = this.getNextAvailableRoadConstrPositionFromStructures(
            modelSpawn.spawns
        );
        if(nextPos) {
            modelRoom.room.creatConstructionSite(nextPos, STRUCTURE_ROAD);
            return;
        }

    },


    getNextAvailableRoadConstrPositionFromPaths: function(paths) {
        // for path in paths:
        //     for pos in path:
        //         if not pos.hasStructureOrConstructionSite():
        //             return pos
        // return null
        paths.forEach((path) => {
            path.forEach((pos) => {
                console.log('path pos: ', pos);
            });
        });
    },


    getNextAvailableRoadConstrPositionFromStructures: function(structures) {
        // for structure in structures:
        //     for pos in structure.getSurroundingPositions():
        //         if not pos.hasStructureOrConstructionSite:
        //             return pos
        // return null
    }


};


module.exports = ctrlRoad;
