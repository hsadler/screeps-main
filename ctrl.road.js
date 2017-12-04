
var modelRoom = require('model.room');
var modelStorage = require('model.storage');


// CONTROLS ROAD BEHAVIOR

var ctrlRoad = {


    proc: function() {
        var path = modelRoom.room.findPath(
            modelStorage.storage.pos,
            modelRoom.room.controller.pos
        );
        console.log(JSON.stringify(path));
    },


    contructRoomRoads: function() {

    },


    constructRoadFromPositions: function(posA, posB) {

    }


};


module.exports = ctrlRoad;
