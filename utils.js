
var utils = {

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getDistance: function(pos1, pos2) {
    	// formula:
    	// a^2 + b^2 = c^2
    	var xDiff = pos1.x - pos2.x;
    	var yDiff = pos1.y - pos2.y;
    	return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    }

};

module.exports = utils;
