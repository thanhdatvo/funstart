/**
 * Created by andh on 7/19/16.
 */
var mongoose = require('mongoose');
    Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var QuestSchema = new Schema({
    game: {
        type: Number,
        ref: 'Game',
        required: 'Must have game'
    },
    goal: {
        type: Number,
        required: 'Must have goal'
    },
    reward: {
        type: Number,
        required: 'Must have reward'
    },
    type: {
        type: Number,
        required: 'Must have type',
        enum: [0,1]
    }
})
QuestSchema.plugin(random);
QuestSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Quest',QuestSchema);