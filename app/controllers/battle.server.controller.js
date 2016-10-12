var User = require('mongoose').model('User'),
    Room = require('mongoose').model('Room'),
    Game = require('mongoose').model('Game');
    socket = require('../config/socket');
io = socket.getSocket();
var connections = {};
var roomsInterval = {};
io.on('connection', function (socket) {
    socket.on('user', function(token) {

        socket.token = token;
        User.findOne({token: socket.token},function (err,data) {
            if(data) {
                socket.emit('user',true);
                connections[data._id] = socket;
                data.status = 1;
                data.save();
            } else {
                socket.emit('user',false);
            }
        })
        console.log('token',token);
    });
    socket.on('disconnect', function () {
       if(socket.token){
          User.findOne({token: socket.token},function (err,data) {

              if(data){
                  console.log('User ' + data._id + ' vua out room ' + data.room);
                  disconnect(data);
                  data.status = 0;
                  data.room = null;
                  data.save();
              }
          })
       }
    });
    socket.on('chat',function(data){
        console.log('chat',data);
        if(data.roomId){
            io.to(data.roomId).emit('chat',{message: data.message,id: data.userId});
        }
    });
});
function disconnect(data){
    Room.findById(data.room,function(err,room){
        console.log(room);
        if(room){
            if(room.people <=1 || room.status != 1 && room.ready.length > 0 && room.mode == 'find'){
                console.log('co 1 dua thoi');
                room.remove();
            } else {
                var indMember = room.members.indexOf(data._id);
                var tmpTurn = null;
                var tmp = room.players;
                room.players = {};
                if(room.status == 0){
                    if(indMember >= 0){
                        room.members.splice(indMember,1);
                        console.log('room con lai',room.members);
                        room.people--;
                        tmpTurn = tmp[data._id].turn;
                        delete tmp[data._id];
                        Object.keys(tmp).forEach(function(e){
                            if(tmp[e].connect == 1 && tmp[e].turn > tmpTurn){
                                tmp[e].turn --;
                                if(tmp[e].turn == 0){
                                    console.log('doi turn cho '+e);
                                    room.turn = e;
                                };
                            } else {
                                tmp[e].turn = null;
                            }
                        });
                        room.ready = [];
                        room.players = tmp;
                        io.to(room._id).emit('leave',{members: room.members,turn: room.turn});
                        console.log('member',room.members);
                    }
                    // var tmp = room.players;
                    // room.players = {};
                    // Object.keys(tmp).forEach(function(e){
                    //     delete tmp[e].isReady;
                    // });
                    // room.players = tmp;
                } else if(room.status != 0){
                    if (tmp[data._id]) {
                        tmp[data._id].connect = 0;
                        room.people--;
                        if(room.time){
                            console.log('vo update turn khi disconnect',tmp);
                            var dataTurn = {};
                            if(room.turn == data._id){
                                Object.keys(tmp).forEach(function(e){
                                    if(tmp[e].connect == 1){
                                        tmp[e].turn --;
                                        if(tmp[e].turn == 0){
                                            room.turn = e;
                                        };
                                        dataTurn[e] = tmp[e].turn;
                                    } else {
                                        tmp[e].turn = null;
                                        dataTurn[e] = null;
                                    }
                                });
                                console.log('vo trong nay',room.turn);
                                console.log('vo trong nay data',dataTurn);
                                io.to(room._id).emit('turn',dataTurn);
                            } else {
                                tmpTurn = tmp[data._id].turn;
                                Object.keys(tmp).forEach(function(e){
                                    if(tmp[e].connect == 1 && tmp[e].turn > tmpTurn){
                                        tmp[e].turn --;
                                        dataTurn[e] = tmp[e].turn;
                                    } else {
                                        tmp[e].turn = null;
                                        dataTurn[e] = null;
                                    }
                                });
                            }
                            room.players = tmp;
                            setRoomInterval(room);
                        } else {
                            room.players = tmp;
                        }
                        io.to(room._id).emit('leave',data._id);
                    }

                }

                room.save();
                if(connections[data._id]) connections[data._id].leave(room._id);
            }
        }
    });
}
function setRoomInterval(room){
    if(roomsInterval[room._id]){
        clearInterval(roomsInterval[room._id]);
        roomsInterval[room._id] = null;
    }
    roomsInterval[room._id] = setInterval(function () {
        console.log('chui zo interval');
        var dataTurn = {};
        var amount = 0;
        var player0 = null;
        Room.findById(room._id,function(err,result){
            if(result){
                if(result.status == 2){
                    clearInterval(roomsInterval[room._id]);
                } else {
                    var tmp = result.players;
                    result.players = {};
                    Object.keys(tmp).forEach(function(e){
                        if(tmp[e].connect == 1){
                            if(tmp[e].turn > 0){
                                tmp[e].turn --;
                                if(tmp[e].turn == 0) result.turn = e;
                                dataTurn[e] = tmp[e].turn;
                            } else {
                                player0 = e;
                            }
                            amount++;
                        } else {
                            tmp[e].turn = null;
                            dataTurn[e] = null;
                        }
                    });
                    if(player0) {
                        tmp[player0].turn = amount - 1;
                        dataTurn[player0] = amount - 1;
                    }
                    io.to(result._id).emit('turn',dataTurn);
                    result.players = tmp;
                    result.save();
                }

            } else {
                clearInterval(roomsInterval[room._id]);
            }

        });
    }, room.time*1000);
}
function mergeObject(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
};
exports.outRoom = function(req,res){
    disconnect(req.user);
    req.user.status = 1;
    req.user.room = null;
    req.user.save();
    res.json();
};
exports.findRoom = function(req,res){
    //$where:"this.members.length < " + req.game.min
    Room.find({created: {$gt: new Date((new Date())+1000*60*60)},status: 0}).remove(function(){
        Room.findOne({ people: {$lt: req.game.min}, status: 0, game: req.game._id,mode: "find"})
            .populate('members','username avatar displayName')
            .exec(function (err,room) {
                if(err){
                    console.log(err);
                    return res.status(400).send();
                }
                if(room){
                    enterRoom(room,req.user,function(result){
                        return res.json({data: result});
                    },function(){
                        return res.status(400).send();
                    })
                } else {
                    return res.json();
                }

            })
    });


};
function enterRoom(room,user,success,error) {
    if(!room.players[user._id]){
        room.members.push(user._id);
        room.people++;
    };
    var obj =  {};
    obj[user._id] = {score: 0, connect: 1, turn: room.people - 1};
    var tmp = mergeObject(room.players,obj);
    room.players = {};
    room.players = tmp;
    room.save(function(err,result){
        if(result){
            var player = {
                _id: user._id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar
            };
            result.members[result.members.length - 1] = player;
            user.status = 2;
            user.room = room._id;
            user.save();
            if(connections[user._id]) connections[user._id].join(result._id);
            io.to(result._id).emit('join',result.members);
            if(success) success(result);
        } else {
            if(error) error();
        }
    });
}
exports.createRoom = function (req,res) {
    var room = new Room();
    room.game = req.game._id;
    if(req.game.time) {
        room.time = req.game.time;
    }
    room.mode = req.body.mode || "find";
    room.members = [req.user._id];
    room.turn = req.user._id;
    room.players = {};
    room.players[req.user._id] = {score: 0, connect: 1, turn: 0};

    room.save(function(err,data){
        if(err) {
            return res.status(400).send();
        }
        if(connections[req.user._id]) connections[req.user._id].join(data._id);
        req.user.status = 2;
        req.user.room = data._id;
        req.user.save();
        return res.json({data: data});
    })
};
exports.updateRoom = function (req,res){
    if(req.body.ready){
        if(req.room.ready.indexOf(req.user._id)<0){
            req.room.ready.push(req.user._id);
            // var tmp = req.room.players;
            // req.room.players = {};
            // if(tmp[req.user._id]){
            //     tmp[req.user._id] = mergeObject(tmp[req.user._id],{isReady: true});
            // }
            // req.room.players = tmp;
            req.room.save();
            res.json();
            io.to(req.room._id).emit('ready',req.room.ready);
            return;
        }
    } else if (req.body.status){
        if(req.room.status == 0) {
            req.room.status = 1;
            // var dataTurn = {};
            // Object.keys(req.room.players).forEach(function(id){
            //     dataTurn[id] = req.room.players[id].turn;
            // });
            // console.log(dataTurn);
            // io.to(req.room._id).emit('turn',dataTurn);
            if(req.room.time) setRoomInterval(req.room);
            req.room.save();
        } else if(req.room.status == 3){
            console.log('choi lai ne');
            req.room.players = {};
            req.room.status = 1;
            req.room.save(function(){
                var dataTurn = {};
                var tmp = {};
                var turn = 0;
                req.room.members.forEach(function(member){
                    dataTurn[member._id] = turn;
                    if(turn == 0){
                        req.room.turn = member._id;
                    }
                    tmp[member._id] = {score: 0, connect: 1, turn: turn++};
                });
                io.to(req.room._id).emit('turn',dataTurn);
                req.room.players = tmp;
                if(req.room.time) setRoomInterval(req.room);
                req.room.save();
            });
        }
        return res.json();
    } else if (req.body.obj) {
        if(req.room.status !=2 && (req.body.prepare || req.room.status == 0 || req.room.status == 3 || req.room.time == undefined || req.room.turn == req.user._id) && req.room.players[req.user._id]){
            var isEnd = false;
            var stt = {};
            var tmp = req.room.players;
            req.room.players = {};
            if(req.room.time && !req.body.prepare){
                var amount = 0;
                var dataTurn = {};
                var player0 = null;
                console.log('set lai interval');
                Object.keys(tmp).forEach(function(e){
                    if(tmp[e].connect == 1){
                        if(tmp[e].turn > 0){
                            tmp[e].turn --;
                            if(tmp[e].turn == 0) req.room.turn = e;
                            dataTurn[e] = tmp[e].turn;
                        } else {
                            player0 = e;
                        }
                        amount++;
                    } else {
                        tmp[e].turn = null;
                        dataTurn[e] = null;
                    }
                });

                if(player0) {
                    tmp[player0].turn = amount - 1;
                    dataTurn[player0] = amount - 1;
                }
                io.to(req.room._id).emit('turn',dataTurn);
                setRoomInterval(req.room);
            }
            if(req.body.obj.isWin !=null){
                isEnd = true;
                Object.keys(tmp).forEach(function(e){
                    if(e == req.user._id){
                        tmp[e] = mergeObject(tmp[e],{isDead: true, isWin: true});
                        stt[e] = true;
                    } else {
                        tmp[e] = mergeObject(tmp[e],{isDead: true, isWin: false});
                        stt[e] = false;
                    }
                });
            }
            if (req.body.obj.isDead != null){
                var amount = 0;
                var length = 0;
                var maxScore = 0;
                Object.keys(tmp).forEach(function(e){
                    if(tmp[e].isDead == true || tmp[e].connect == 0) {
                        amount++;
                    }
                    if(maxScore < tmp[e].score) {
                        maxScore = tmp[e].score;
                    }
                    length++;
                });
                if(amount >= length - 1){
                    isEnd = true;
                    Object.keys(tmp).forEach(function(e){
                        if(tmp[e].score == maxScore){
                            tmp[e] = mergeObject(tmp[e],{isWin: true});
                            stt[e] = true;
                        } else {
                            tmp[e] = mergeObject(tmp[e],{isWin: false});
                            stt[e] = false;
                        }
                    });
                }
            }
            tmp[req.user._id] = mergeObject(tmp[req.user._id],req.body.obj);
            req.room.players = tmp;
            io.to(req.room._id).emit('players',req.room.players);
            res.json();
            if(isEnd) {
                // io.to(req.room._id).emit('end',stt);
                if(req.room.status == 1) req.room.status = 2;
                if(roomsInterval[req.room._id]){
                    clearInterval(roomsInterval[req.room._id]);
                    roomsInterval[req.room._id] = null;
                }
            };
            req.room.save();
            return;
        } else {
            res.status(400).send();
        }
    } else if(req.body.data){
        var tmp = req.room.data;
        req.room.data = {};
        tmp = mergeObject(tmp,req.body.data);
        req.room.data = tmp;
        req.room.save();
        return res.json();
    } else if(req.body.again){
        if(req.room.status != 3){
            req.room.status = 3;
            req.room.mode = "room";
            req.room.ready = [];
            req.room.members = [req.user._id];
            req.room.save();
            res.json({data: req.room.members});
        } else {
            var check = false;
            if(req.room.members.indexOf(req.user._id)<0){
                check = true;
            };
            Room.findById(req.room._id).populate('members','username displayName avatar').exec(function(err,room){
                if(check){
                    room.members.push(req.user._id);
                    room.people++;
                    room.save();
                }
                var player = {
                    _id: req.user._id,
                    username: req.user.username,
                    displayName: req.user.displayName,
                    avatar: req.user.avatar
                };
                room.members[room.members.length - 1] = player;
                if(connections[req.user._id]) connections[req.user._id].join(room._id);
                io.to(room._id).emit('join',room.members);
                res.json({data: room.members});
            });


        }
    } else if(req.body.kick && req.room.turn == req.user._id && req.room.status == 0){
        var members = [];
        req.room.members.forEach(function(e,i){
            members.push(e._id);
        });
        var indMember = members.indexOf(parseInt(req.body.kick));
        var tmpTurn = null;
        var tmp = req.room.players;
        req.room.players = {};
        if(req.room.status == 0){
            if(indMember >= 0){
                members.splice(indMember,1);
                req.room.members.splice(indMember,1);
                req.room.people--;
                tmpTurn = tmp[req.body.kick].turn;
                delete tmp[req.body.kick];
                Object.keys(tmp).forEach(function(e){
                    if(tmp[e].connect == 1 && tmp[e].turn > tmpTurn){
                        tmp[e].turn --;
                        if(tmp[e].turn == 0){
                            req.room.turn = e;
                        }
                    } else {
                        tmp[e].turn = null;
                    }
                });
                req.room.ready = [];
                req.room.players = tmp;
                User.findByIdAndUpdate(parseInt(req.body.kick),{status: 1},function(){

                });
                io.to(req.room._id).emit('leave',{members:members});
                req.room.save();
                if(connections[req.body.kick]) connections[req.body.kick].leave(req.room._id);
                res.json();
            }
        } else {
            return res.status(400).send();
        }
    } else {
        return res.status(400).send();
    }
};
exports.joinRoom = function(req,res){
    if(req.room.people >= req.room.game.max){
        return res.status(400).send({message: 'FULL'});
    } else if (req.room.status == 1){
        return res.status(400).send({message: 'PLAYED'});
    } else {
        enterRoom(req.room,req.user,function(result){
            return res.json({data: result});
        },function(){
            return res.status(400).send();
        });
    }
};
exports.inviteToRoom = function(req,res){
    var data = {
        game: {
            _id: req.room.game._id,
            title: req.room.game.title
        },
        room: req.room._id,
        user: {
            _id: req.user._id,
            username: req.user.username
        }
    };
    if(req.body.room){
        io.to(req.body.room).emit('again',req.room._id);
    }
    if(req.body.players){

    } else if(req.body.player){
        if(connections[req.body.player]) connections[req.body.player].emit('invite',data);
    };
    res.json();
};
exports.messageToRoom = function(req,res){
    io.to(req.params.id).emit('chat',{message: req.body.message,id: req.user._id});
    res.json();
}
exports.gameByID = function(req, res, next) {
    var gameId = null;
    if(req.body.gameId) {
        gameId = req.body.gameId
    } else if (req.query.gameId){
        gameId = req.query.gameId
    } else {
        return res.status(400).send();
    }
    Game.findById(gameId)
        .exec(function(err, game){
            if (err) {
                return res.status(400).send();
            }
            if (!game) {
                return res.status(400).send();
            }
            req.game = game;
            next();
        });
};
exports.roomByID = function(req, res, next, id) {
    Room.findById(id)
        .populate('members','username avatar displayName')
        .populate('game','title min max')
        .exec(function(err, room){
            if (err) {
                return res.status(400).send();
            }
            if (!room) {
                return res.status(400).send({message: 'NULL'});
            }
            req.room = room;
            next();
        });
};