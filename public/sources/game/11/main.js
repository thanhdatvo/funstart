var gameId = 11, userIdNow, checkWinTotal = false, userWin;
var competitorInfo = {};

var arPositionPlayer = [], arPositionCompetitor = [];

var gameCaro = function (object) {
    var userId = object.userId,
        funcGameOver = object.gameOver || function () {}

    var domMessage = $(".messageGame h3");

    var self = this;
    self.isTurn = true;

    var arSymbol = {};
    arSymbol["x"] =  "<span class='xTich'>x</span>";
    arSymbol["o"] =  "<span class='oTich'>o</span>";

    var symbolMe,
        symbolCom,
        score,
        xPos, yPos,
        isWin,
        arResult = [];

    var gameContainer = $(".game-frame"),
        gameBody = $(".gameMain"),
        gameResult = $(".showResult"),

        playerDomInfo = $(".play01"),
        CompetitorDomInfo = $(".play02"),

    // heightScreen = gameContainer.width();
        maxGameBox = 30,
        maxWidthBoxGame = 30,
        widthScreen = maxWidthBoxGame * maxGameBox,
        heightScreen = maxWidthBoxGame * maxGameBox

    this.start = function() {
        console.log('start Game');
        isWin = false;
        checkWinTotal = false;
        createMap();
    };

    this.setSymbol = function(data) {
        symbolMe = data;
    }

    this.setComSymbol = function(data) {
        symbolCom = data;
    }

    this.updatePosition = function() {
        $(".gameBox").html("");
        for (var x in arPositionPlayer) {
            $("#"+arPositionPlayer[x]).html(arSymbol[symbolMe])
        }
        for (var x in arPositionCompetitor) {
            $("#"+arPositionCompetitor[x]).css('background-color','inherit').html(arSymbol[symbolCom])
        }

        $("#"+arPositionCompetitor[arPositionCompetitor.length - 1]).css('background-color','rgba(212, 36, 36, 0.12)')

    };

    this.click = function (dom) {
        var div = $(dom);
        if (!isWin && self.isTurn) {
            //if (div.html() == "" ) {
            // self.isTurn = false;
            if (div.hasClass("hover")){
                div.removeClass('hover');
                div.html(arSymbol[symbolMe]);

                var position = div.attr("id");
                xPos = position.split("_")[0];
                yPos = position.split("_")[1];

                if (checkWinVertical() || checkHorizontal() || checkDiagonalLeft() || checkDiagonalRight()){
                    isWin = true;
                }

                updateGame(xPos,yPos);
            } else {
                notiError(div)
            }
        } else {
            effectErrorMessage()
            console.log('data co nguoi win hoac ko phai luat cuar ban');
        }
    };

    this.gameOver = function(playerId){
        //showResult(playerId);
        for (var x in arResult) {
            arResult[x].addClass("gameBox-win");
        }

        if (userWin == userIdNow) {
            score = 20000
        } else {
            score = 10000
        }
        funcGameOver(score)
    };

    this.replay = function () {
        console.log('replay game');
        isWin = false;
        $(".gameBox").html("").removeClass("gameBox-win");
        hideResult();
    };

    this.randomPosition = function() {
        console.log('random position');
        var strSymbol = arSymbol[symbolMe];
        $(".gameBox").each(function(){
            if($(this).text() != "") {
                $(this).prev().addClass('hover');
                $(this).prev().click();
                return false
            }
        })
    };

    this.callMessageNoti = function(data) {
        domMessage.html(data);
    }

    this.setupCenterMap = function () {
        setCenterMap()
    }

    function effectErrorMessage() {
        domMessage.css('background-color', 'rgb(212, 50, 50)');
        setInterval(function(){
            domMessage.css('background-color', '#FFF');
        }, 500)

    }

    function hideResult() {
        gameResult.css('display','none');
    }

    function showResult(playerId) {
        gameResult.css('display','block');
        gameResult.append("<h2>Người chiến thắng là: " + playerId + "</h2>")
    }

    function createMap() {
        gameBody.html(" ");
        checkIsMobile();
        for ( var x = 0; x < widthScreen/maxWidthBoxGame; x ++) {
            for (var y =0; y < heightScreen/maxWidthBoxGame; y++) {
                var leftBox = x * maxWidthBoxGame;
                var rightBox = y * maxWidthBoxGame;
                gameBody.append("<div class='gameBox' id='"+x+"_"+y+"' style='left: "+ leftBox +"px; top: "+ rightBox +"px;'></div>")
            }
        }
        effectHoverGameBox();
        setWidthHeightBox();
        setCenterMap()
    }

    function checkIsMobile() {
        if ( $( window ).width() < 460) {
            maxWidthBoxGame = 40;
        }
    }
    
    function setWidthHeightBox() {
        $(".gameBox, .reviewBox").css({
            'width' : maxWidthBoxGame + 'px',
            'height' : maxWidthBoxGame + 'px'
        })
        $(".gameBox span").css('font-size', '25px');
        var a = maxWidthBoxGame - 2;

        $(".gameBox").hover(function() {
            $(this).css({
                'width' : a + 'px',
                'height' : a + 'px'
            })
        }, function () {
            $(this).css({
                'width' : maxWidthBoxGame + 'px',
                'height' : maxWidthBoxGame + 'px'
            })
        });
    }

    function effectHoverGameBox() {
        $( ".gameBox" ).hover(
            function() {
                if ($( this ).html() == "" && self.isTurn) {
                    $( this ).html(arSymbol[symbolMe]);
                    $( this ).addClass('hover')
                }
            }, function() {
                $(".hover").html("");
                $(this).removeClass('hover');
            }
        );
    }

    function setCenterMap() {
        console.log('set center map');
        var a = maxGameBox / 2
        var p = $( "#" + a + "_" + a );
        p.css({
            'background': 'url("img/logofunstart.svg") no-repeat',
            'background-size': '200%',
            'background-position': '-24px 7px'
        });

        var widthDocument = gameContainer.width();
        var setLeft = parseInt(p.css('left')) - widthDocument / 2 + 15;
        var setTop = parseInt(p.css('top')) - ($( window ).height() - 56) / 2 + 15;

        gameBody.scrollTop( setTop ).scrollLeft( setLeft );

    }


    function notiError(div) {
        div.css({
            'background-color' : 'rgba(255, 0, 0, 0.40)',
            "color" : "#FFF"
        });
        setTimeout(function() {
            div.css({
                'background-color': 'INHERIT',
                'color': '#201f56'
            });
        }, 500)
    }

    function updateGame(x,y) {
        var strPos = x + "_" + y;
        arPositionPlayer.push(strPos);
        var objAr = {
            array: arPositionPlayer
        };

        if(!checkWinTotal){
            if (isWin) {
                fsGame.updateObj({
                    value : JSON.stringify(objAr),
                    isWin: isWin
                });
            } else {
                fsGame.updateObj({
                    value : JSON.stringify(objAr)
                });
            }
        }
    }
    function checkWinGameBox(div) {
        var text = div.text();
        if(text == symbolMe) arResult.push(div); else arResult = [];
        return (arResult.length == 5)
    }

    function checkWinVertical() {
        arResult = [];
        for (var y = parseInt(yPos) - 4; y < parseInt(yPos) + 5; y++) {
            var div = $("#" + xPos + "_" + y);
            if (checkWinGameBox(div)) break
        }
        return (arResult.length == 5)
    }


    function checkHorizontal() {
        arResult = [];
        for (var x = parseInt(xPos) - 4; x < parseInt(xPos) + 5; x++) {
            var div = $("#" + x + "_" + yPos);
            if (checkWinGameBox(div)) break
        }
        return (arResult.length == 5)
    }

    function checkDiagonalLeft() {
        arResult = [];
        for (var x = parseInt(xPos) - 4; x < parseInt(xPos) + 5; x++) {
            var y = parseInt(yPos) - (parseInt(xPos) - x);
            var div = $("#" + x + "_" + y);
            if (checkWinGameBox(div)) break
        }
        return (arResult.length == 5)
    }
    function checkDiagonalRight() {
        arResult = [];
        for (var x = parseInt(xPos) - 4; x < parseInt(xPos) + 5; x++) {
            var y = parseInt(yPos) + (parseInt(xPos) - x);
            var div = $("#" + x + "_" + y);
            if (checkWinGameBox(div)) break
        }
        return (arResult.length == 5)
    }

};


$(window).ready(function () {

    var caro = new gameCaro({
        userId : userIdNow,
        symbol : 'x',
        gameOver: function (score) {
            var isWin = (userWin == userIdNow);
            fsGame.gameOver({score: score, isWin: isWin});
            var wintitle = (isWin)?"thắng":"thua";
            var des = fsGame.user.displayName + " đã " + wintitle + " " + $("#name-opponent").html();
            var obj = {
                des: des
            }
            fsGame.setResultObj(obj);
            fsGame.createShare({
                share: false,
                htmlTag: "#canvan",
                name: des,
                des: "Bạn có muốn làm thử một ván không? Cùng mời bạn nhé"
            },function (res) {
                console.log('res:',res);
            });

            console.log('call back gameover');
            myCounter.stop();
            comCounter.stop();
        }
    });

    var myCounter = new Countdown({
        seconds: 56,
        onCounterEnd: function () {
            caro.randomPosition()
            console.log('end time')
        }
    });

    var comCounter = new Countdown({
        seconds: 56
    });

    var isPlayGame = false, isFullRoom = false, isSetMapFirst = false;
    //select competitor
    
    fsGame.gameStart(function(){
        console.log('host',fsGame.isHost);
        if(fsGame.isHost){
            caro.setSymbol("x");
            fsGame.updateObj({
                "symbol" : "x"
            });
        }

        isFullRoom = true;
        isSetMapFirst = true;
        caro.start();

    });
    fsGame.fetchPlayers(function(data){
        console.log('data in game: ', data);
        userIdNow = fsGame.user._id;
        if (isFullRoom && data && !checkWinTotal) {
            var ar = data;
            isPlayGame = true;
            for (var x in ar) {
                if (x == userIdNow) {
                    arPositionPlayer = convertStringToObject(ar[x]['value'])

                    if (ar[x]['symbol']) {
                        caro.setSymbol(ar[x]['symbol'])
                    } else {
                        caro.setSymbol("o")
                        fsGame.updateObj({
                            "symbol" : "o"
                        });
                    }
                    caro.isTurn = (ar[x]['turn'] == 0);
                } else {
                    competitorInfo.id = x;
                    arPositionCompetitor = convertStringToObject(ar[x]['value'])
                    caro.setComSymbol(ar[x]['symbol']);
                }
                if (ar[x]['isWin']) {
                    checkWinTotal = true;
                    userWin = x;
                }

            }
        }

        //start game when room full!
        if (isSetMapFirst) {
            console.log('set center map day nhe');
            caro.setupCenterMap();
            isSetMapFirst = false;
        }

        if (isPlayGame) {
            createCountDownTime(caro.isTurn);
            if (arPositionPlayer == undefined) arPositionPlayer = [];
            if (arPositionCompetitor == undefined) arPositionCompetitor = [];

            if (checkWinTotal) {
                console.log('vo game over');
                caro.gameOver(userWin);
                isPlayGame = false;
            } else {
                caro.updatePosition();
            }
        }
    });
    
    

    $("body").off().on("click", '.gameBox', function () {
        caro.click(this);
    });

    function createCountDownTime(a) {
        if (a) {
            caro.callMessageNoti("Lượt đánh của bạn.");
            comCounter.stop();
            myCounter.reStart();
        } else {
            caro.callMessageNoti("Lượt đánh của đối thủ.");
            myCounter.stop();
            comCounter.reStart();
        }
    }

    function convertStringToObject(str) {
        if (str) {
            arJson = JSON.parse(str);
            return arJson.array
        } else {
            return []
        }
    }
});

function Countdown(options) {
    var timer,
        instance = this,
        seconds = options.seconds || 10,
        updateStatus = options.onUpdateStatus || function () {
            },
        counterEnd = options.onCounterEnd || function () {
            };

    this.changeTime = function () {
        seconds = seconds - 20;
    };

    this.start = function () {
        clearInterval(timer);
        //timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
    };

    this.stop = function () {
        clearInterval(timer);
    };

    this.reStart = function() {
        this.stop();
        this.start();
    };

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds <= 0) {
            counterEnd();
            instance.stop();
        }
        seconds -= 1;
    }
}