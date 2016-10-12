var FunstartGame = function () {
    this.objAngular = {};
    this.user = {};
    this.isBattle = false;
    this.isHost = false;
    this.players = {};
};
function dataURItoBlob(dataURI) {

    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Passing an ArrayBuffer to the Blob constructor appears to be deprecated,
    //so convert ArrayBuffer to DataView
    var dataView = new DataView(ab);
    var blob = new Blob([dataView], {type: 'image/jpeg'});
    return blob;
}
FunstartGame.prototype.gameStart = function (callback){
   if(!this.objAngular){
       var controllerElement = document.querySelector('.game-section');
       var controllerScope = angular.element(controllerElement).scope();
       this.objAngular = controllerScope;
   }
    console.log('start',this.objAngular);
    this.objAngular.start = callback;
};
FunstartGame.prototype.updateUserScore = function (data) {
    console.log("score of user:" + data);
    this.objAngular.updateScore(data)
};

FunstartGame.prototype.gameOver = function (data,callback){
    var self = this;
    if(data && data.score != null) {
        console.log(data);
        self.objAngular.endGame(data);
    } else {
        data.score = 0;
        self.objAngular.endGame(data);
    }
    if(!data.isWin){
        data.isDead = true;
    };
    if(self.objAngular.battle && data){
        self.objAngular.battle.updateObj(data,false,callback);
    } else {
        if(callback) callback();
    }

    console.log('game over cmnr');
};
FunstartGame.prototype.fetchPlayers = function(callback){
    if(callback){
        this.updatePlayers = callback;
    }
}
FunstartGame.prototype.updateObj = function (obj,prepare,callback) {
    if(this.objAngular.battle) {
        if(prepare == null) prepare = false;
        this.objAngular.battle.updateObj(obj,prepare,callback);
    }
    console.log('thuc hien update value');
};
FunstartGame.prototype.updateData = function (data,prepare,callback) {
    if(this.objAngular.battle) {
        this.objAngular.battle.updateData(data,callback);
    }
    console.log('thuc hien update value');
};
//create img result
FunstartGame.prototype.createShare = function (obj, callback) {
    self = this;
    if (obj.htmlTag) tag = obj.htmlTag; else tag = "#canvan";

    var quality = (obj.quality) ? obj.quality : "0.5";
    var share = (obj.share) ? obj.share : false;
    if(share){
        create_img();
        this.objAngular.shareFacebook = function(){
            self.objAngular.share.shareFacebook(function(){
                if(callback) callback();
                console.log('done share');
            });
        }
    } else {
        this.objAngular.shareFacebook = function(){
            create_img(function(){
                console.log('heeee');
                self.objAngular.share.shareFacebook(function(){
                    if(callback) callback();
                    console.log('done share');
                });
            });
        }
    }
    function startLoading() {
        console.log('start create img');
    }

    function endLoading() {
        console.log("Done create img result");
    }

    function create_img(cb) {
        startLoading();
        console.log(tag + quality);
        html2canvas($(tag),{
            //proxy: "//www.appnhe.com/data/temp/server.js",
            useCORS: true,
            onrendered: function(canvas) {
                var myImage = canvas.toDataURL('image/jpeg', quality);
                endLoading();
                resizeBase64Img({
                    'image' : myImage,
                    'width': 500
                }, function (data) {
                    // console.log(data);
                    obj.file = dataURItoBlob(data);
                    // console.log(obj.file);
                    self.objAngular.uploadResult(obj, function(){
                        if(cb) cb();
                    });

                })
            }
        });
    }

    function resizeBase64Img(obj, callback) {

        var imgBase64 = obj.image;
        var maxWidth = obj.width;
        
        var canvas = document.createElement("canvas");

        var base_image = new Image();
        base_image.src = imgBase64;
        base_image.onload = function(){
            var sourceWidth = base_image.width;
            var sourceHeight = base_image.height;

            if (sourceWidth > maxWidth) {
                canvas.width = maxWidth;
                canvas.height = sourceHeight*maxWidth/ sourceWidth;

                var context = canvas.getContext('2d');

                context.scale( maxWidth/sourceWidth,  maxWidth/sourceWidth);
                context.drawImage(base_image, 0, 0);
                var newImg = canvas.toDataURL();
                if (callback) callback(newImg)
            } else {
                if (callback) callback(imgBase64)
            }
        }
    }
};
FunstartGame.prototype.setResultHtml = function (html) {
    this.objAngular.result = html;
};
FunstartGame.prototype.setResultObj = function (obj) {
    this.objAngular.resultObj = obj;
};
FunstartGame.prototype.pauseGame = function () {

};


var fsGame = new FunstartGame();

angular.element(document).ready(function() {
    var controllerElement = document.querySelector('.game-section');
    var controllerScope = angular.element(controllerElement).scope();
    fsGame.objAngular = controllerScope;
    fsGame.objAngular.$watch(
        "user",
        function( newValue, oldValue ) {
            fsGame.user = newValue;
        }
    );
    fsGame.objAngular.$watch(
        "isBattle",
        function( newValue, oldValue ) {
            fsGame.isBattle = newValue;
        }
    );
    fsGame.objAngular.$watch(
        "battle.isHost",
        function( newValue, oldValue ) {
            console.log('isHost',newValue)
            fsGame.isHost = newValue;
        }
    );
    fsGame.objAngular.$watch(
        "battle.room.players",
        function( newValue, oldValue ) {
            if(fsGame.isBattle){
                fsGame.players = newValue;
                if(typeof fsGame.updatePlayers === 'function') fsGame.updatePlayers(newValue);
            }
        }
    );
});