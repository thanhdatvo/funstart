/**
 * Created by andh on 7/19/16.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    autoIncrement = require('mongoose-auto-increment'),
    config = require('../config/config.js'),
    connection = mongoose.createConnection(config.db);
    Schema = mongoose.Schema;
autoIncrement.initialize(connection);
var UserSchema = new Schema({
    displayName: String,
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        match: [/^[A-Za-z0-9_.]{1,15}$/, "Please fill a valid username"],
        trim: true
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 5;
            }, 'Password should be longer'
        ]
    },
    salt: {
        type: String
    },
    friends: [{
        type: String,
        default: [],
        ref: 'User'
    }],
    avatar: String,
    mobile: Number,
    isVerified: {
        type: Boolean,
        default: false
    },
    mid: String,
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    token: String,
    exp: {
        type: Number,
        default: 0
    },
    gameList: [{
        type: Number,
        ref: 'Game',
        default: []
    }],
    win: {
        type: Number,
        default: 0
    },
    lose: {
        type: Number,
        default: 0
    },
    games: {
        type: Number,
        default: 0
    },
    active: {
        type: Date,
        default: Date.now
    },
    quick: {
        type: Number,
        default: 0
    },
    memory: {
        type: Number,
        default: 0
    },
    focus: {
        type: Number,
        default: 0
    },
    flex: {
        type: Number,
        default: 0
    },
    wit: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    status: {
        type: Number,
        default: 1,
        enum: [0,1,2]
    },
    room: String,
    rank: Number
});
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    startAt: 1
});


UserSchema.virtual('level').get(function() {
    return parseInt(Math.sqrt(this.exp/100));
});
UserSchema.virtual('fire').get(function() {
    var time = Date.now() - this.created;
    var days = parseInt(time / 86400000);
    var games = 10 * days;
    var fire = parseInt(this.games*1000/games);
    if (fire >1000) fire = 1000;
    return fire;
});
UserSchema.virtual('next').get(function() {
    var level = parseInt(Math.sqrt(this.exp/100));
    return (level+1)*(level+1)*100;
});
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};
UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new
            Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
UserSchema.methods.hashPassword = function(password) {
    console.log(crypto.pbkdf2Sync(password, this.salt, 10000,64).toString('base64'));
    return crypto.pbkdf2Sync(password, this.salt, 10000,
        64).toString('base64');
};



UserSchema.statics.findUniqueUsername = function(username, suffix,
                                                 callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};
UserSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('User',UserSchema);