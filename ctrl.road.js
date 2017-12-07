
var modelRoom = require('model.room');
var modelSpawn = require('model.spawn');
var modelEnergySources = require('model.energy_sources');
var modelExtension = require('model.extension');
var modelStorage = require('model.storage');
var modelTower = require('model.tower');


// CONTROLS ROAD BEHAVIOR

// roads to construct:
    // 1. spawn -> energy sources
    // 2. energy sources -> storage
    // 3. storage -> controller
    // 4. storage -> owned rooms (link rooms)
    // 5. up, down, left, right from each extension
    // 6. up, down, left, right from each tower
    // 7. up, down, left, right from each spawn


var ctrlRoad = {


    roadPaths: null,


    pathTypes: {
        PATHS_ENERGY_SOURCES_TO_SPAWN: 'energySourcesToSpawn',
        PATHS_ENERGY_SOURCES_TO_STORAGE: 'energySourcesToStorage',
        PATHS_STORAGE_TO_CONTROLLER: 'storageToController',
        PATHS_STORAGE_TO_EXITS: 'storageToExits'
    },


    proc: function() {

        // find or create road paths in memory
        this.roadPaths = this.findOrCreateRoadPaths();

        var currRoadConstructionSites = this.getRoadConstructionSites();
        console.log(currRoadConstructionSites);

        // create road construction site if one doesn't already exist
        if(currRoadConstructionSites.length === 0) {
            this.createNewRoadConstructionSite();
        }

    },


    // puts road paths in memory if they don't exist and returns road paths
    findOrCreateRoadPaths: function(forceCreate) {
        var roomMem = modelRoom.room.memory;
        if(this.roadPathsNeedRefresh() || forceCreate) {

            roomMem.roadPaths = {};

            // energy sources to spawn
            var primarySpawn = modelSpawn.spawns[0];
            roomMem.roadPaths[this.pathTypes.PATHS_ENERGY_SOURCES_TO_SPAWN] =
                modelEnergySources.sources.map((source) => {
                    return modelRoom.room.findPath(
                        source.pos,
                        primarySpawn.pos
                    );
                });

            // energy sources to storage
            roomMem.roadPaths[this.pathTypes.PATHS_ENERGY_SOURCES_TO_STORAGE] =
                modelEnergySources.sources.map((source) => {
                    return modelRoom.room.findPath(
                        source.pos,
                        modelStorage.storage.pos
                    );
                });

            // storage to controller
            roomMem.roadPaths[this.pathTypes.PATHS_STORAGE_TO_CONTROLLER] = [
                modelRoom.room.findPath(
                    modelStorage.storage.pos, modelRoom.room.controller
                )
            ];

            // storage to exits
            // TODO: implement these road paths once we control multiple rooms
            roomMem.roadPaths[this.pathTypes.PATHS_STORAGE_TO_EXITS] = [];

            console.log(JSON.stringify(roomMem));

        } else {
            return roomMem.roadPaths;
        }
    },


    // checks if we have road paths in memory
    roadPathsNeedRefresh: function() {
        var roomMem = modelRoom.room.memory;
        if(!modelRoom.roadPaths) return true;
        for(var name in this.pathTypes) {
            var pathType = this.pathTypes[name];
            if(!Array.isArray(pathType)) return true;
        }
        return false;
    },


    // attempts to create road construction site based on road paths in memory
    // returns success bool true if site created, else false
    createNewRoadConstructionSite: function() {
        if(this.roadPaths && Object.keys(this.roadPaths).length > 0) {
            for(var name in this.roadPaths) {
                var paths = this.roadPaths[name];
                if(Array.isArray(paths) && paths.length > 0) {
                    var pathNode = paths.pop();
                    modelRoom.room.createConstructionSite(
                        pathNode.x,
                        pathNode.y,
                        STRUCTURE_ROAD
                    );
                    return true;
                }
            }
            return false
        }
    },


    getRoadConstructionSites: function() {
        return _.filter(
            modelRoom.room.find(FIND_MY_CONSTRUCTION_SITES), (site) => {
                return site.structureType === STRUCTURE_ROAD;
            }

        );
    }


};


module.exports = ctrlRoad;
