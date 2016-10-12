var Mission = require('mongoose').model('Mission'),
    Game = require('mongoose').model('Game'),
    Quest = require('mongoose').model('Quest'),
    User = require('mongoose').model('User'),
    paging = 5;

//
// var CronJob = require('cron').CronJob;
// var job = new CronJob('00 05 10 * * 0-6', function() {
//         Mission.find().remove().exec(function(){
//             User.find().exec(function(err,users){
//                 if(err) console.log(err);
//                 if(users){
//                     users.forEach(function(e){
//                         for(var i = 0; i < 5;i++){
//                             Quest.findOneRandom(function(err,data){
//                                 if(err){
//                                     console.log(err);
//                                 }
//                                 if(data){
//                                     var newMission = new Mission({
//                                         quest: data._id,
//                                         user: e._id
//                                     });
//                                     newMission.save(function (err,data) {
//                                         if(err) console.log(err);
//                                         console.log(data);
//                                     });
//
//                                 }
//                             })
//                         }
//                     })
//                 }
//
//             })
//         });
//
//     }, function () {
//         /* This function is executed when the job stops */
//     },
//     true, /* Start the job right now */
//     "Asia/Ho_Chi_Minh" /* Time zone of this job. */
// );
exports.loadMissions = function(req,res){
    var page = parseInt(req.query.page),
        skip = page > 0 ? ((page - 1) * paging) : 0;
    var conds = [];
    var match = {};
    if(req.query.user) conds.push({user: req.query.user});
    conds.push({deadline: { $gte: new Date() } })
    if(!conds.length){
        match = {};
    } else if(conds.length==1){
        match = conds.pop();
    } else {
        match = {$and: conds};
    }
    console.log(match);
    Mission.find(match)
        .skip(skip)
        .limit(paging+1)
        .sort('-deadline')
        .populate('user','displayName username avatar')
        .populate('quest')
        .exec(function(err,data){
            if(err) {
                res.status(400).send();
            } else {
                Game.populate(data,'quest.game',function(err,result){
                    data = result;
                    console.log(result);
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

                });

            }

        })
};
exports.updateMission = function(req,res){
    if(req.user){
        if(req.query.point){
            console.log(req.mission);
            if(req.mission.quest.type==0){
                req.mission.point++;
            } else{
                if(req.query.point<=req.mission.point) return res.status(200).send();
                req.mission.point = req.query.point;
            }
            console.log('status',req.mission.status);
            console.log('point',req.mission.point);
            console.log('goal',req.mission.quest.goal);
            if(req.mission.status == 0 && req.mission.point>=req.mission.quest.goal){
                req.mission.status = 1;
                console.log('here');
                User.findByIdAndUpdate(req.user._id,{$inc: { exp: req.mission.quest.reward}},function(){});
            }
            req.mission.save(function(){
                res.json({data:req.mission});
            });
        } else {
            return res.status(400).send();
        }

    } else {
        return res.status(400).send();
    }
}
exports.missionById = function(req,res,next,id){
    Mission.findById(id)
        .populate('quest')
        .exec(function(err,mission){
        if (err) {
            return next(err);
        }
        if (!mission) {
            return next(new Error('Failed to load article ' + id));
        }
        req.mission = mission;
        next();
    })
}
exports.createQuest = function (req,res,next) {
    var newQuest = new Quest(req.body);
    newQuest.save(function (err,data) {
        if(err) res.status(400).send();
        res.json({data:data});
    });
};