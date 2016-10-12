var passport = require('passport');
var users =  require('../controllers/user.server.controller.js');
var games =  require('../controllers/game.server.controller.js');
var bots = require('../controllers/bot.server.controller.js');
var Game = require('mongoose').model('Game');
var Config = require('../config/config');
module.exports = function(app) {
  app.get('/webhook', bots.initWebHook);
  app.route('/auth/signin')
      .post(passport.authenticate('local'),users.authSignin);
  app.get('/auth/action',users.renderAction);
  app.post('/auth/signup',users.authSignup);
  app.get('/oauth/facebook',function (req,res,next) {
    req.session.redirect = req.query.redirect || '/';
    if(req.query.mid) req.session.mid = req.query.mid;
    next();
  }, passport.authenticate('facebook', {scope: ['user_friends','email','public_profile']}));
  app.get('/oauth/facebook/callback',  passport.authenticate('facebook',{ failureRedirect: '/login' }),function(req,res){
    if(req.session.mid){
        req.user.mid = req.session.mid;
        req.user.save();
        res.writeHead(301,
            {Location: 'https://www.messenger.com/closeWindow/?image_url=IMAGE_URL&display_text=DISPLAY_TEXT'}
        );
        res.end();
        req.user.mid = req.session.mid;
        res.redirect('/close');
    } else {
        res.redirect(req.session.redirect || '/');
    }

  });
  app.get('/logout',users.authLogout);
  app.route('/action/verify/:token')
      .get(users.verifyEmail);
  app.route('/action/reset')
      .post(users.resetPassword);
  app.route('/action/reset/:token')
      .get(users.resetPage)
      .post(users.resetDone);
  app.get('/game/:gameId',games.renderGame);
  app.get('/test/:key/:game',games.renderTest);
  app.param('gameId', games.gameByID);
  app.get('*', function (req, res, next) {
    if(req.url.indexOf('sources')<0 && req.url.indexOf('api')<0 && req.url.indexOf('uploaded')<0){
      console.log(req.url);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      var app = {
        id: Config.app.id,
        name: Config.app.name,
        description: Config.app.description,
        url: Config.app.url,
        image: Config.app.image
      };
      var user = null;
      if(req.user){
        user = req.user;
      }
      res.render('index', {app: app, user: user, message: null});
    } else {
      next();
    }

  });
}
