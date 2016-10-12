var mongoose = require('mongoose');
Schema = mongoose.Schema;
var RoomSchema = new Schema({
    members: [{
        type: Number,
        ref: 'User'
    }],
    players: Schema.Types.Mixed,
    mode: {
        type: String,
        enum: ["room","find"],
        default: "find"
    },
    game: {
        type: Number,
        ref: 'Game'
    },
    ready: [{
        type: Number,
        ref: 'User'
    }],
    turn: {
        type: Number,
        ref: 'User'
    },
    time: Number,
    people: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        enum: [0,1,2,3],
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    }
})
RoomSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Room',RoomSchema);