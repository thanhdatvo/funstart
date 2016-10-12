/**
 * Created by andh on 10/5/16.
 */
exports.initWebHook = function(req,res){
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
}