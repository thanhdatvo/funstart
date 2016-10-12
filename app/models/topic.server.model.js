/**
 * Created by andh on 7/19/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TopicSchema = new Schema({
    _id: Number,
    name: String,
    icon: String
});
mongoose.model('Topic',TopicSchema);