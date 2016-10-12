/**
 * Created by andh on 7/28/16.
 */
var Game = require('mongoose').model('Game'),
    Topic = require('mongoose').model('Topic'),
    Config = require('../config/config'),
    npp = 6;

var getSortType = function(sortType){
    if(sortType==="top"){
        return {top : -1} ;
    }
    if(sortType==="hot"){
        return {hot : -1} ;
    }
    return {created : -1} ;
};
exports.loadGames = function(req,res){
    var paging = parseInt(req.query.paging) || npp;
    console.log('paging',paging);
    var page = parseInt(req.query.page),
        skip = page > 0 ? ((page - 1) * paging) : 0;
    var conds = [];
    var match = {};
    conds.push({public: true});
    if(req.query.topic) conds.push({topic : parseInt(req.query.topic)});
    if(req.query.text) conds.push({$or:[
        {title: { $regex: req.query.text, $options: 'i' }},
        {des: {$regex: req.query.text,$options: 'i'}}
    ]});
    if(!conds.length){
        match = {};
    } else if(conds.length==1){

        match = conds.pop();
    } else {
        match = {$and: conds};
    }
    console.log(match);
    if(req.query.order && req.query.order == 'random'){
        Game.findRandom(match,{},{limit: paging,populate: 'topic'},function(err,data){
            if(err) return res.status(400).send();
            return res.json({data:data});
        });
    } else {
        var sortType = getSortType(req.query.order);
        Game.aggregate(
            [
                {
                    $match : {$and : [{created: { $lte: new Date() } }, match]}
                },
                {
                    $project: {
                        top: { $add: [ { $multiply: [ "$shares", 5 ] }, "$plays"] },
                        hot: { $divide: [ { $add: [ { $multiply: [ "$shares", 5 ] }, "$plays" ] },{ $divide:[ { $subtract: [ new Date(), "$created" ] } ,3600000]}] },
                        created: 1,
                        title: 1,
                        des: 1,
                        thumb: 1,
                        link: 1,
                        plays: 1,
                        shares: 1,
                        topic: 1
                    }
                },
                // Sorting pipeline
                {"$sort": sortType },
                {"$skip": skip},
                // Optionally limit results
                {"$limit": (paging + 1)}
            ],
            function(err,results){
                if(err){
                    console.log(err);
                    return res.status(400).send();
                } else{
                    Topic.populate(results, 'topic', function(){
                        var isNext = false;
                        if(results.length==(paging+1)){
                            isNext = true;
                            results.pop();
                        }
                        resdata = {
                            data: results,
                            isNext: isNext
                        };
                        return res.json(resdata);
                    });

                }

            }
        );
    }

    // Game.find()
    //     .skip(skip)
    //     .limit(paging+1)
    //     .exec(function(err,games){
    //         if (err) {
    //             return res.status(400).send({
    //                 message: 'Error'
    //             });
    //         } else {
    //             var isNext = false;
    //             if(games.length==(paging+1)){
    //                 isNext = true;
    //                 games.pop();
    //             };
    //             resdata = {
    //                 data: games,
    //                 isNext: isNext
    //             };
    //             console.log(resdata);
    //             res.json(resdata);
    //         }
    //     })
};
exports.createGame = function (req,res,next) {
    var newGame = new Game(req.body);
    newGame.save(function (err,data) {
        if(err) return res.status(400).send();
        return res.json({data:data});
    })
;};
exports.loadGame = function(req,res,next){
    return res.json({data:req.game});
}
exports.renderGame = function(req,res){
    var title = req.game.title;
    var des = req.game.des;
    var url = 'https://www.funstart.net/game/' + req.game._id;
    var thumb = 'https://www.funstart.net/' + req.game.thumbAds;
    if(req.query.ref == 'share'){
        url = url + '?ref=share';
        if(req.query.rs_image) {
            thumb = req.query.rs_image;
            url = url + '&rs_image=' + thumb;
        }
        if(req.query.rs_title) {
            title = req.query.rs_title;
            url = url + '&rs_title=' + title;
        }
        if(req.query.rs_des) {
            des = req.query.rs_des;
            url = url + '&rs_des=' + des;
        }
    }


    var app = {
        id: Config.app.id,
        name: title,
        description: des,
        url: url,
        image: thumb
    };
    var user = null;
    if(req.user){
        user = req.user;
        // user._doc.created = parseInt(user._doc.created.getTime());
        // user._doc.active = parseInt(user._doc.active.getTime());
    }
    res.render('index', {app : app, message: null, user: user});
};
exports.renderTest = function(req,res){
    console.log('here');
    if(req.params.key == 'ylinkee'){
        var title = 'Funstart';
        var des = 'Phá đảo thế giới ảo!';
        var thumb = 'https://www.funstart.net/sources/ads.jpg';
        var url = 'https://www.funstart.net/test/' + req.params.key + '/' + req.params.game;
        if(req.query.ref == 'share'){
            url = url + '?ref=share';
            if(req.query.rs_image) {
                thumb = req.query.rs_image;
                url = url + '&rs_image=' + thumb;
            }
            if(req.query.rs_title) {
                title = req.query.rs_title;
                url = url + '&rs_title=' + title;
            }
            if(req.query.rs_des) {
                des = req.query.rs_des;
                url = url + '&rs_des=' + des;
            }
        }
        var app = {
            id: Config.app.id,
            name: title,
            description: des,
            url: url,
            image: thumb
        };
        var user = null;
        if(req.user){
            user = req.user;
            // user._doc.created = parseInt(user._doc.created.getTime());
            // user._doc.active = parseInt(user._doc.active.getTime());
        }
        res.render('index', {app : app, message: null, user: user});
    } else {
        res.status(401).send();
    }

}

exports.updateGame = function(req,res,next){
    req.game.update(req.body,function(){
        return res.status(200).send();
    })
};
exports.deleteGame = function(req,res,next){
    req.game.remove(function(data){
        return res.status(200).send();
    });
}
exports.gameByID = function(req, res, next, id) {
    Game.findById(id)
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
exports.loadTopics = function(req,res){
    Topic.find().exec(function(err,data){
        if(err) return res.status(400).send();
        return res.json({data:data});
    })
}