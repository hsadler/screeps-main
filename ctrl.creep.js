
var ctrlCreep = {


    SHOW_MESSAGES: false,


    proc: function() {
        if(this.SHOW_MESSAGES) this.show_messages();
        this.clearDeadCreepFromMemory();
    },


    show_messages: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creep.room.visual.text(
                creep.name,
                creep.pos.x,
                creep.pos.y + 1,
                {align: 'center', opacity: 0.8}
            );
        }
    },


    clearDeadCreepFromMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }


};

module.exports = ctrlCreep;
