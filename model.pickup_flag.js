
var conf = require('conf');

// models
var modelRoom = require('model.room');


// HOLDS PICKUP FLAG DATA AND PICKUP FLAG DATA METHODS

var modelPickupFlag = {};


modelPickupFlag.proc = function() {
    this.flag = this.getFlag();
    this.energy = this.getPickupFlagEnergy();
};


modelPickupFlag.getFlag = function() {
    var flags = modelRoom.room.find(FIND_FLAGS);
    return _.find(flags, (flag) => {
        return flag.name = conf.ENERGY_PICKUP_FLAG;
    });
};


modelPickupFlag.getPickupFlagEnergy = function() {
    if(this.flag) {
        var energy = this.flag.pos.findClosestByRange(
            FIND_DROPPED_RESOURCES,
            {filter: RESOURCE_ENERGY}
        );
        if(energy && energy.pos.isEqualTo(this.flag)) {
            return energy;
        } else {
            return null;
        }
    }
};


module.exports = modelPickupFlag;
