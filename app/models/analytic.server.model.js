/**
 * Created by andh on 7/19/16.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var AnalyticSchema = new Schema({
    roomCreated: {
        type: Number,
        default: 0
    },
    roomDeleted: {
        type: Number,
        default: 0
    },
    roomAgain: {
        type: Number,
        default: 0
    },
    roomStarted: {
        type: Number,
        default: 0
    },
    findCreated: {
        type: Number,
        default: 0
    },
    findStarted: {
        type: Number,
        default: 0
    },
    findCanceled: {
        type: Number,
        default: 0
    }
})
AnalyticSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Analytic',AnalyticSchema);