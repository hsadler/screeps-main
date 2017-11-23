
var conf = {


    // creep
    MAX_HARVESTERS: 6,
    MAX_UPGRADERS: 6,
    MAX_BUILDERS: 4,

    CREEP_TEMPLATE: [
        WORK,CARRY,MOVE,MOVE,
        WORK,CARRY,MOVE,MOVE,
        WORK,CARRY,MOVE,MOVE,
        // WORK,CARRY,MOVE,MOVE,
    ],


    // construction sites
    MAX_EXTENTION_CONSTRUCTION_SITES: 2,


    // flags
    IDLE_CREEP_FLAG: 'idle',


    // display game information toggle
    DISPLAY_GAME_INFO: true


};

module.exports = conf;
