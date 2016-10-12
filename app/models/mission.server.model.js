/**
 * Created by andh on 7/19/16.
 */
/**
 * Created by andh on 7/19/16.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var MissionSchema = new Schema({
    quest: {
        type: Schema.ObjectId,
        ref: 'Quest',
        required: 'Must have quest'
    },
    user: {
        type: String,
        ref: 'User',
        required: 'Must have user'
    },
    point: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date,
        default: new Date(+new Date() + 24*60*60*1000)
    },
    status: {
        type: Number,
        enum: [0,1],
        default: 0
    }
})
MissionSchema.virtual('remaining').get(function() {
   return parseInt((this.deadline - Date.now())/1000)
})
MissionSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Mission',MissionSchema);