
var games = require('../controllers/game.server.controller.js');
var missions =  require('../controllers/mission.server.controller.js');
var activities =  require('../controllers/activity.server.controller.js');
var users =  require('../controllers/user.server.controller.js');
var battle =  require('../controllers/battle.server.controller.js');
var uploads =  require('../controllers/upload.server.controller.js');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
module.exports = function(router) {
    router.use(passport.authenticate('bearer', { session: false }));
    router.get('/topics',games.loadTopics);
    router.get('/token',users.authToken);
    router.route('/games')
        .get(games.loadGames)
        .post(games.createGame);
    router.route('/games/:gameId')
        .get(games.loadGame)
        .put(games.updateGame)
        .delete(games.deleteGame);
    router.route('/battle')
        .get(battle.gameByID,battle.findRoom)
        .post(battle.gameByID,battle.createRoom);
    router.route('/battle/:roomId')
        .get(battle.joinRoom)
        .put(battle.updateRoom)
        .delete(battle.outRoom);
    router.route('/invite/:roomId')
        .post(battle.inviteToRoom);
    router.route('/message/room/:id')
        .post(battle.messageToRoom);
    router.post('/uploadresult/:game',uploads.uploadResult);
    router.param('gameId', games.gameByID);
    router.param('roomId', battle.roomByID);
    router.route('/activities')
        .get(activities.loadActivities)
        .post(activities.createActivity);
    router.route('/missions')
        .get(missions.loadMissions);
    router.route('/missions/:missionId')
        .put(missions.updateMission);
    router.param('missionId',missions.missionById);
    router.route('/quests')
        .post(missions.createQuest);
    router.route('/users')
        .get(users.loadUsers);
    router.route('/users/:username')
        .get(users.loadUser)
        .put(users.followUser);
    router.route('/user')
        .put(users.updateUser);
    router.param('username', users.userByUsername);
    
};
