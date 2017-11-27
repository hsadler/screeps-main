
var conf = require('conf');


// HOLDS PICKUP FLAG DATA AND PICKUP FLAG DATA METHODS

var modelPickupFlag = {};


// methods

modelPickupFlag.proc = function() {
    this.flag = this.getFlag();
    this.energy = this.getPickupFlagEnergy();
};


modelPickupFlag.getFlag = function() {
    return Game.flags[conf.ENERGY_PICKUP_FLAG];
};


modelPickupFlag.getPickupFlagEnergy = function() {
    var energy = this.flag.pos.findClosestByRange(
        FIND_DROPPED_RESOURCES,
        {filter: RESOURCE_ENERGY}
    );
    if(!energy || !energy.pos.isEqualTo(this.flag)) {
        return null;
    }
    return energy;
};


module.exports = modelPickupFlag;
