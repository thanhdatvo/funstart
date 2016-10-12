/**
 * Created by andh on 8/4/16.
 */
var User = require('mongoose').model('User'),
    Jwt = require('jsonwebtoken'),
    Mail = require('../config/mail'),
    Config = require('../config/config'),
    privateKey = Config.key.privateKey,
    https = require('https'),
    crypto = require('crypto'),
    paging = 7;
var getErrorMessage = function(err) {
    var message = 'Xảy ra lỗi. Vui lòng thử lại sau';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Email đã tồn tại';
                break;
        }
    }
    return message;
};
exports.authFacebookSuccess = function(req,res){
    console.log(req.user);
    res.json(req.user);
};
exports.authFacebookFail = function(req,res){
    res.status(400).send();
};
exports.authLogout = function(req,res){
    req.logout();
    console.log(req.user);
    res.redirect('/');
};
exports.authSignin = function(req,res){
    return res.status(200).send({user: req.user});
};
exports.authSignup = function(req,res){
    if (!req.user) {
        var user = new User();
        user.email = req.body.email;
        user.username = req.body.username;
        user.displayName = req.body.username;
        user.password = req.body.password;
        user.provider = 'local';
        user.isVerified = false;
        user.avatar = "https://www.funstart.net/sources/ninja.png";
        var tokenDt = {
            email: req.body.email
        };
        var userToken = Jwt.sign(tokenDt, privateKey);
        user.token = userToken;
        user.save(function(err,result) {
            if (err) {
                var message = getErrorMessage(err);
                console.log(message);
                return res.status(400).send({
                    message: message
                });
            }
            var tokenData = {
                email: user.email
            };
            Mail.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
            //message = "Hãy kiểm tra email của bạn để xác nhận tài khoản";
            //req.flash('error', message);
            return res.status(200).send({
                user: result,
                message : "Hãy kiểm tra email của bạn để xác nhận tài khoản"
            });
            //return res.redirect('/signup');
        });
    } else {
        return res.redirect('/');
    }
};
exports.verifyEmail = function(req, res, next) {
    var token = req.params.token;
    var app = {
        id: Config.app.id,
        name: Config.app.name,
        description: Config.app.description,
        url: Config.app.url,
        image: Config.app.image
    };
    Jwt.verify(token, privateKey, function(err, decoded) {
        if(decoded === undefined) {
            message = "Mã token này không tồn tại";
            return res.render('index', {user: null, message: message, app: app});
        }
        User.findOne({email : decoded.email}, function(err, user){
            if (err) {
                message = "Không tồn tại token, hoặc đã hết hạn";
                return res.render('index', {user: null, message: message, app: app});
            }
            if (user === null) {
                message="Tài khoản không tồn tại";
                return res.render('index', {user: null, message: message, app: app});
            }
            user.isVerified = true;
            User.findByIdAndUpdate(user._id,user, function(err, user){
                if (err) {
                    message="Đã xảy ra lỗi. Hãy thử lại sau";
                    return res.render('index', {user: null, message: message, app: app});
                } else {
                    message="Chúc mừng, tài khoản đã được xác thực!";
                    return res.render('index', {user: null, message: message, app: app});
                }
            })
        })

    });

};
exports.resetPage = function(req,res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            var app = {
                id: Config.app.id,
                name: Config.app.name,
                description: Config.app.description,
                url: Config.app.url,
                image: Config.app.image
            };
            message = "Token để reset password không tồn tại, hoặc đã hết hạn.";
            return res.render('index', {message: message, user: null, app: app});
        }
        return res.redirect('/action/' + req.params.token);
    });
}
exports.resetDone= function(req,res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            //req.flash('error', 'Token để reset password không tồn tại, hoặc đã hết hạn.');
            //return res.redirect('back');
            message="Token để reset password không tồn tại, hoặc đã hết hạn.";
            return res.status(400).send({
                message: message
            });
        } else {
            console.log(req.body.password);
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function(err) {
                if(err){
                    message="Đã xảy ra lỗi. Hãy thử lại sau";
                    return res.status(400).send({
                        message: message
                    });
                } else{
                    Mail.sendMailDoneResetPassword(user);
                    message="Thay đổi mật khẩu thành công";
                    return res.status(200).send({
                        data: user,
                        message: message
                    });
                }
            });
        }
    });
};
exports.resetPassword = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
        if (!err) {
            if (user === null) {
                message = "Tài khoản không tồn tại";
                return res.status(400).send({
                    message: message
                });
            }
            crypto.randomBytes(20, function(err, buf) {
                if(err){
                    message = "Đã xảy ra lỗi. Hãy thử lại sau";
                    return res.status(400).send({
                        message: message
                    });
                } else {
                    var token = buf.toString('hex');
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now()+ 3600000;
                    user.save(function(err) {
                        if(err){
                            message = "Đã xảy ra lỗi. Hãy thử lại sau";
                            return res.status(400).send({
                                message: message
                            });
                        } else {
                            Mail.sendMailResetPassword(user,token);
                            message='Thành công. Yêu cầu thay đổi mật khẩu đã được gửi tới email của bạn';
                            return res.status(200).send({
                                message: message
                            });
                        }
                    });

                }
            });
        } else {
            message = "Đã xảy ra lỗi. Hãy thử lại sau";
            return res.status(400).send({
                message: message
            });
        }
    });

};
exports.loadUsers = function(req,res){
    var page = parseInt(req.query.page),
        skip = page > 0 ? ((page - 1) * paging) : 0;
    if(req.query.suggest){
        if(req.query.suggest == 'mutual'){
            User.aggregate([
                { "$match": { "_id":{$in: req.user.friends}}},
                { "$unwind": "$friends" },
                { "$group": {
                    "_id": "$friends",
                    "count": { $sum: 1 }
                }},
                { "$match": {$and:[{"_id":{$nin: req.user.friends}},{_id: {$ne: req.user._id}}] }},
                { "$sort": { "count": -1 } },
                {"$skip": skip},
                { "$limit": (paging + 1) }
            ],function(err,results){
                if(err){
                    // console.log(err);
                    res.json(err);
                } else{
                    // console.log(results);
                    results = results.map(function(doc) {
                        return new User(doc)
                    });
                    //res.json(results);
                    User.populate(results,{"path": "_id", "select": "displayName username avatar provider"}, function(err,dt) {
                        if (err) throw err;
                        data = [];
                        for(var i = 0 ; i < dt.length ; i++){
                            data.push(dt[i]._id);
                        }
                        var isNext = false;
                        if(data.length==(paging+1)){
                            isNext = true;
                            data.pop();
                        }
                        resdata = {
                            data: data,
                            isNext: isNext
                        };
                        res.json(resdata);
                    });
                }

            })
        } else if (req.query.suggest = 'facebook'){
            console.log('here');
            console.log(req.user.providerData);
            if(req.user.providerData && req.user.providerData.accessToken){
                console.log('token',req.user.providerData.accessToken)
                var options = {
                    host: 'graph.facebook.com',
                    path: '/me/friends?limit=100&access_token=' + req.user.providerData.accessToken
                };
                https.get(options,function(resp){
                    var data = '';
                    resp.on('data', function (chunk) {
                        data += chunk;

                    });

                    resp.on('end', function() {
                        var idArr = [];
                        results = JSON.parse(data);
                        if(results.data){
                            // console.log(results);
                            for(var i = 0 ; i < results.data.length ; i++){
                                idArr.push(results.data[i].id);
                            }
                            // console.log(idArr);
                            User.find({$and:[{providerId:{$in: idArr}},{_id: {$nin: req.user.friends}}]}, 'username displayName avatar exp level friends', {
                                skip: skip,
                                limit: (paging+1),
                                sort: getSortType(req.query.order)
                            }, function(err, users) {
                                if (err) {
                                    res.json(err);
                                } else {

                                    var isNext = false;
                                    if(users.length==(paging+1)){
                                        isNext = true;
                                        users.pop();
                                    }
                                    resdata = {
                                        data: users,
                                        isNext: isNext
                                    }
                                    res.json(resdata);
                                }
                            });
                        }

                    });
                });
            } else {
                res.json({});
            }
        } else {
            res.json({});
        }
    } else {
        var conds = [];
        var match = {};
        if(req.query.friend) {
            User.findById(req.query.friend,function(err,user){
                console.log('tim friend cua',user);
                if(user){
                    conds.push({_id: { $in: user.friends}});
                    if(req.query.online){
                        conds.push({status: 1});
                    }
                };
                if(req.query.text) conds.push({$or:[
                    {email: { $regex: req.query.text, $options: 'i' }},
                    {username: {$regex: req.query.text,$options: 'i'}},
                    {displayName: {$regex: req.query.text,$options: 'i'}}
                ]});
                if(!conds.length){
                    match = {};
                } else if(conds.length==1){
                    match = conds.pop();
                } else {
                    match = {$and: conds};
                }
                // console.log(match);
                var sortType = getSortType(req.query.order);
                User.find(match, 'username displayName avatar exp level friends')
                    .skip(skip)
                    .limit(paging+1)
                    .sort(sortType)
                    .exec(function(err,data){
                        if(err) {
                            res.status(400).send();
                        } else {
                            console.log('list fr online',data);
                            var isNext = false;
                            if(data.length==(paging+1)){
                                isNext = true;
                                data.pop();
                            }
                            resdata = {
                                data: data,
                                isNext: isNext
                            }
                            res.json(resdata);
                        }

                    })
            })

        }

    }

};
var getSortType = function(sortType){
    if(sortType==="username"){
        return {username : -1} ;
    }
    if(sortType==="exp"){
        return {exp : -1} ;
    }
    return {created : -1} ;
};

exports.authToken = function(req,res){
    User.find({exp : {$gt : req.user.exp}}).count(function (err,count){
        var rank = 0;
        if(!err) rank = count + 1;
        req.user.rank = rank;
        res.json({data:req.user});
    });
    req.user.status = 1;
    req.user.active = Date.now();
    req.user.save();
};
exports.loadUser = function(req,res,next){
    User.find({exp : {$gt : req.selectedUser.exp}}).count(function (err,count){
        // console.log(req.selectedUser);
        var rank = 0;
        if(!err) rank = count + 1;
        req.selectedUser.rank = rank;
        res.json({data: req.selectedUser});
    });
};
exports.followUser = function (req,res) {
    if(req.query.action =='follow'){
        User.findByIdAndUpdate(req.user._id,{$addToSet: { "friends": req.selectedUser._id }},function(){
            User.findByIdAndUpdate(req.selectedUser._id,{$addToSet: { "friends":  req.user._id}},function(){
                console.log('them xong');
                res.status(200).send();
            });
        });

    } else if(req.query.action =='unfollow') {
        User.findByIdAndUpdate(req.user._id,{$pull: { "friends": req.selectedUser._id }},function(){
            User.findByIdAndUpdate(req.selectedUser._id,{$pull: { "friends":  req.user._id}},function(){
                console.log('bo them xong');
                res.status(200).send();
            });
        });

    }
}
exports.updateUser = function(req,res,next){
    var dataChange = {};
    if(req.body.avatar) dataChange.avatar = req.body.avatar;
    if(req.body.username) dataChange.username = req.body.username;
    if(req.body.displayName) dataChange.displayName = req.body.displayName;
    if(req.body.mobile) dataChange.mobile = req.body.mobile;
    req.user.update(dataChange,function(){
        res.status(200).send();
    })
};
exports.userByUsername = function(req, res, next, id) {
    if(req.query.short){
        User.findOne({username: id},'username displayName avatar class exp win lose games active friends')
            .exec(function(err, user){
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(new Error('Failed to load user ' + id));
                }
                req.selectedUser = user;
                next();
            });
    } else {
        User.findOne({username: id},'-password -salt -token -isVerified -providerData')
            .exec(function(err, user){
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(new Error('Failed to load user ' + id));
                }
                req.selectedUser = user;
                next();
            });
    }

};
exports.renderAction = function (req,res) {
    var app = {
        id: '244448985929177',
        name: 'Fun Start',
        description: 'Game hay thử tài!',
        url: 'https://www.funstart.net',
        image: 'https://www.funstart.net/sources/ads.jpg'
    };
    res.render('index', {app: app});
};
exports.requiresLogin = function(req, res, next) {
    if (req.user === 'guest' || !req.isAuthenticated()) {
        return res.status(401).send({
            message: 'Người dùng chưa đăng nhập'
        });
    } else if(req.user === 'ban') {
        return res.status(401).send({
            message: 'Tài khoản đã bị khóa do nghi ngờ vi phạm'
        });
    }
    next();
};
exports.isDeveloper = function(req, res, next) {
    if (req.user.role !== 1) {
        return res.status(401).send({
            message: 'Phải có quyền mới xem được nội dung trang'
        });
    }
    next();
};