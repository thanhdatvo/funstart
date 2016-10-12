/**
 * Created by andh on 8/17/16.
 */
formidable = require('formidable');
var dir = 'uploaded/results/';
var fs = require('fs');
var Game = Game = require('mongoose').model('Game');
exports.uploadResult = function(req,res){
    Game.findByIdAndUpdate(parseInt(req.params.game),{$inc: {shares: 1}},function(){
    });
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/../../public/' + dir;
    console.log(form.uploadDir);
    form.keepExtensions = true;
    form.maxFields = 0;
    form.maxFieldsSize = 0;
    var count = 0;
    form.on('progress', function(bytesReceived) {
        
        if (bytesReceived > 300000) {
            form._error();
            console.log('Loi nhan');
            return res.status(400).send();
        }
    });
    form.on('file', function(name, file) {
        console.log(file);
        count++;
        if(file.type=='image/jpeg'&&file.size<300000&&count==1){
            if(req.user == 'guest'){
                var path = Date.now() + '_' + req.params.game + '.jpg';
                console.log(path);
            } else {
                var path = req.user._id + '_' + req.params.game + '.jpg';
            }

            fs.renameSync(file.path, form.uploadDir + path);
            res.json({data: 'http://www.funstart.net/uploaded/results/' + path});
        } else {
            fs.unlink(file.path);
            console.log('loi dinh dang');
            return res.status(400).send();
        }
    });
    form.parse(req, function(err, fields, files) {
    });

}