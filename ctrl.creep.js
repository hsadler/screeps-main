
var ctrlCreep = {

    SHOW_MESSAGES: false,

    init: function() {
        if(this.SHOW_MESSAGES) {
            this.show_messages();
        }
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
    }

};

module.exports = ctrlCreep;
