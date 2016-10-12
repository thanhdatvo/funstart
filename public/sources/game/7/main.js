$('document').ready(function () {
    fsGame.gameStart(function () {
        init();
        gamePlay();
    });
});
function animateHTMLObject(HTMLObject, animation) {
    // -> removing the class
    HTMLObject.getDOM().classList.remove(animation);

    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    // Oops! This won't work in strict mode. Thanks Felis Phasma!
    // element.offsetWidth = element.offsetWidth;
    // Do this instead:
    void HTMLObject.getDOM().offsetWidth;

    // -> and re-adding the class
    HTMLObject.getDOM().classList.add(animation);
}
function removeAnimationOfHTMLObject(HTMLObject, animation) {
    HTMLObject.getDOM().classList.remove(animation);
}
var  lerp = function(a,b,u) {
    return (1-u) * a + u * b;
};

var fade = function(element, property, start, end, duration) {
    var interval = 10;
    var steps = duration/interval;
    var step_u = 1.0/steps;
    var u = 0.0;
    var theInterval = setInterval(function(){
        if (u >= 1.0){ clearInterval(theInterval) }
        var r = parseInt(lerp(start.r, end.r, u));
        var g = parseInt(lerp(start.g, end.g, u));
        var b = parseInt(lerp(start.b, end.b, u));
        var colorName = 'rgb('+r+','+g+','+b+')';
        element.style.setProperty(property, colorName);
        u += step_u;
    }, interval);
};
function highlightColor(el) {
    // in action
    // var startColor   = {r:  0, g:128, b:128};  // dark turquoise
    var startColor   = {r: 239, g: 239, b: 239};  // dark turquoise
    var endColor = {r: 255, g:  0, b:  0};  // red
    fade(el,'background-color',startColor,endColor,250);

    // fade back after 0.5 secs
    setTimeout(function(){
        fade(el,'background-color',endColor,startColor, 250);
    },300);
}
function changeScaleToFixScreen(objArray) {
    objArray.forEach(function (obj) {
        obj['HTMLObject'].setStyleObject();
        obj['HTMLObject'].getStyleObject().setStyleNamesToManage(obj['styleNames']);
        obj['HTMLObject'].getStyleObject().setStyleValuesFromDOM(obj['HTMLObject'].getDOM());
        var styleObject = obj['HTMLObject'].getStyleObject().getStyleValue();
        var percent = obj['percent'];
        Object.keys(styleObject).forEach(function (styleName) {
            styleObject[styleName] = multiplyPixelWithNumber(styleObject[styleName], percent);
        });
        obj['HTMLObject'].getStyleObject().setStyleValue(styleObject);
        obj['HTMLObject'].getStyleObject().setStyleValuesToDOM(obj['HTMLObject'].getDOM());
    });
}
var gM, gI, gO, gF,
    progressBarContainerStyle, progressBarStyle,
    numbersObject;

function init() {
    gM = GameManager.getInstance();
    // gM.removeProperties();
    gM.setImageUrlRootPath("/sources/game/7/images/");

    gM.setGameOperator();
    gO = gM.getGameOperator();

    // create level
    gO.setLevel();
    // create score
    gO.setScore();

    // create ProgressBar
    gO.setProgressBar();

    // create table of images
    gO.setTableOfObjects();

    gO.getLevel().showContent();
    gO.getScore().showContent();

    // gO.getTimer().showContentAndRun(function () {
    //     endGame();
    // });

    gO.setProgressBar();
    gO.getProgressBar().getProgressBarHTMLObject().setStyleObject();
    // gO.getProgressBar().getProgressBarHTMLObject().getStyleObject().setStyleNamesToManage(['width', 'transition']);
    // gO.getProgressBar().getProgressBarHTMLObject().getStyleObject().setStyleValuesFromDOM(gO.getProgressBar().getProgressBarHTMLObject().getDOM());
    // gO.getProgressBar().getProgressBarHTMLObject().getStyleObject().setStyleValue({'width':'15%', 'transition':'3s linear'});
    // gO.getProgressBar().getProgressBarHTMLObject().getStyleObject().setStyleValuesToDOM(gO.getProgressBar().getProgressBarHTMLObject().getDOM());

    // progressBarStyle = new StyleObject();
    // progressBarStyle.setStyleNamesToManage(['width', 'transition']);
    // progressBarStyle.setStyleValuesFromDOM(gO.getProgressBar().getProgressBarHTMLObject().getDOM());
    // progressBarStyle.setStyleValue({'width':'100%', 'transition':'1s linear'});
    // progressBarStyle.setStyleValuesToDOM(gO.getProgressBar().getProgressBarHTMLObject().getDOM());

    gO.getProgressBar().show();
    // gO.getProgressBar().setProgressBarPercent(100);


    gO.timer = new Timer();
    gO.timer.setTimerNumberStart(100);
    gO.timer.setTimerNumberEnd(0);
    gO.timer.setTimeNumberCurrent(100);
    gO.timer.setIntervalRange(100);
    gO.timer.setIntervalAction(function () {
        if(gO.timer.getTimeNumberCurrent() < gO.timer.getTimerNumberEnd()) {
            gO.timer.setTimeNumberCurrent(gO.timer.getTimerNumberEnd());
            gO.timer.clearCountdown();
            endGame();
        }
        if(gO.timer.getTimeNumberCurrent() > gO.timer.getTimerNumberStart()) {
            gO.timer.setTimeNumberCurrent(gO.timer.getTimerNumberStart());
        }
        // if (gO.timer.getTimeNumberCurrent() == gO.timer.getTimerNumberEnd() - 1) {
        //
        // }
        gO.getProgressBar().setProgressBarPercent(Math.floor(gO.timer.getTimeNumberCurrent() / gO.timer.getTimerNumberStart() * 100));
        gO.timer.setTimeNumberCurrent(gO.timer.getTimeNumberCurrent() - 1);
    });
    gO.timer.countTime();

    gO.show();
    progressBarContainerStyle = new StyleObject();
    progressBarContainerStyle.setStyleNamesToManage(['width']);
    progressBarContainerStyle.setStyleValuesFromDOM(document.getElementsByClassName("meter")[0]);
}
function gamePlay() {

    var numbersAmount  = Math.pow((Math.floor(Math.sqrt(gO.getLevel().getLevelNumber() + 1)) + 1), 2);
    removeAnimationOfHTMLObject(gO.getProgressBar().getProgressBarHTMLObject(), "alert");
    removeAnimationOfHTMLObject(gO.getProgressBar().getProgressBarHTMLObject(), "heal");
    // gO.timer.setTimerNumberStart(25 * numbersAmount);
    var timeAdd = Math.sqrt(numbersAmount) * 10;
    gO.timer.setTimerNumberStart(100);
    gO.timer.setTimeNumberCurrent(gO.timer.getTimerNumberStart());
    gO.getProgressBar().setProgressBarPercent(100);
    numbersObject = new NumbersObject();
    numbersObject.setNumbersRange({
        // min: Math.pow(gO.getLevel().getLevelNumber(), 2),
        min: 1,
        max: Math.pow(gO.getLevel().getLevelNumber(), 2) + 7
    });

    numbersObject.setNumbersAmount(numbersAmount);
    numbersObject.createNumbersObject();

    gO.getTableOfObjects().setSize({
        rowsNum: Math.floor(Math.sqrt(gO.getLevel().getLevelNumber() + 1)) + 1,
        colsNum: Math.floor(Math.sqrt(gO.getLevel().getLevelNumber() + 1)) + 1
    });
    gO.getTableOfObjects().createTableOfObjects();
    gO.getTableOfObjects().addObjectsToEachCellOfTable(numbersObject.getNumbersObject());
    gO.getTableOfObjects().setObjectsOnclick(function (object) {
        if(object.value === numbersObject.getSmallestNumber()){
            object.unvisible();
            gO.timer.setTimeNumberCurrent(gO.timer.getTimeNumberCurrent() + timeAdd);
            numbersObject.setSmallestNumber(numbersObject.getNumbersObject()[numbersObject.getSmallestNumber()]);
            removeAnimationOfHTMLObject(gO.getProgressBar().getProgressBarHTMLObject(), "alert");
            animateHTMLObject(gO.getProgressBar().getProgressBarHTMLObject(), "heal");

            gO.getScore().increaseScore(object.value);
            gO.getScore().showContent();

            if(numbersObject.getSmallestNumber() == true) {
                gO.getLevel().increaseLevel(1);
                gO.getLevel().showContent();
                gamePlay();
            }
        } else {
            removeAnimationOfHTMLObject(gO.getProgressBar().getProgressBarHTMLObject(), "heal");
            animateHTMLObject(gO.getProgressBar().getProgressBarHTMLObject(), "alert");
            animateHTMLObject(object, "reappear");
            gO.timer.setTimeNumberCurrent(gO.timer.getTimeNumberCurrent() - 10);
        }
    });

    gO.getTableOfObjects().showContent();

    setTimeout(function () {
        var newWidth = gO.getTableOfObjects().getTableOfObjectsHTMLObject().getDOM().clientWidth;
        progressBarContainerStyle.setStyleValue({'width': newWidth + "px"});
        progressBarContainerStyle.setStyleValuesToDOM(document.getElementsByClassName("meter")[0]);
    }, 0);

}
var once = true;
var endGame = function () {

    gO.getTableOfObjects().setObjectsOnclickDisable();
    gO.timer.clearCountdown();
    gO.hide();

    // gM.setFinisher();
    // gF = gM.getFinisher();
    // var gFB = gF.getFinisherBackground();
    // gFB.setImageUrlPath(gM.getImageUrlRootPath() + "bg.jpg");
    // gFB.showContent();
    // gFT.getFinisherImage().setImageUrlPath(gM.getImageUrlRootPath() + finisherImage);
    // gFT.getFinisherLevel().setContent(finisherLevelContent);
    // gFT.getFinisherRemark().setContent(finisherRemarkContent);
    // gFT.getFinisherSuggestion().setContent("Chơi lại để đạt điểm cao hơn hoặc thách đấu với bạn bè!");
    //
    // gM.setPercentThroughWidth(737);
    //
    // gFT.getFinisherImage().showContent();
    // gFT.getFinisherLevel().showContent();
    // gFT.getFinisherRemark().showContent();
    // gFT.getFinisherSuggestion().showContent();
    //
    // if (once) {
    //     var objArray = [
    //         {
    //             HTMLObject: gFT.getFinisherTextHTMLObject(),
    //             styleNames: ['margin-right', 'margin-left', 'font-size'],
    //             percent: gM.getPercent()
    //         },
    //         {
    //             HTMLObject: gFT.getFinisherImage().getFinisherImageHTMLObject(),
    //             styleNames: ['width', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
    //             percent: gM.getPercent()
    //         },
    //         {
    //             HTMLObject: gFT.getFinisherLevel().getFinisherLevelHTMLObject(),
    //             styleNames: ['margin-top', 'font-size'],
    //             percent: gM.getPercent()
    //         },
    //         {
    //             HTMLObject: gFT.getFinisherRemark().getFinisherRemarkHTMLObject(),
    //             styleNames: ['margin-top', 'font-size'],
    //             percent: gM.getPercent()
    //         },
    //         {
    //             HTMLObject: gFT.getFinisherSuggestion().getFinisherSuggestionHTMLObject(),
    //             styleNames: ['margin-right', 'margin-left', 'font-size'],
    //             percent: gM.getPercent()
    //         }
    //     ];
    //     changeScaleToFixScreen(objArray);
    //     once = false;
    // }


    var cp = [
        'Thánh lại hút nhiều thuốc rồi, bình tĩnh và chiến lại nào',
        'Đừng buồn nhé người anh em, có đến 60% số người cũng chung tình cảnh với bạn cơ mà. Lú mà vẫn quyến rũ thì cũng có ối người theo thôi, lo gì.',
        'Đạt đến trình độ này thì hẳn người anh em đây cũng phải dạng vừa đâu, luyện tập thêm tí là đủ tiêu chuẩn làm việc cho Google rồi đấy',
        'Công nhận não bạn có rất nhiều nếp nhăn. Bạn nằm trong top 10% số người chơi tốt nhất rồi đấy.',
        'Ôi chao, sao thế gian lại có người thông minh thế này. 99% số người chơi game này không ai giỏi như bạn đâu!!',
        'Bấy lâu nay thiên tài ẩn dật sống ở đâu đấy, xuất hiện cứu thế giới đi nhanh lên!'
    ];
    var level = gO.getLevel().getLevelNumber();
    var des;
    if (level <= 3) {
        des = cp[0];
    } else if (level <= 6) {
        des = cp[1];
    } else if (level <= 9) {
        des = cp[2];
    } else if (level <= 12) {
        des = cp[3];
    } else if (level < 15) {
        des = cp[4];
    } else {
        des = cp[5];
    }

    setTimeout(function () {
        fsGame.gameOver({score: gO.getScore().getScoreNumber()});
        var obj = {
            title: 'Score: ' + gO.getScore().getScoreNumber(),
            des: des,
            image: fsGame.user.avatar
        };
        fsGame.setResultObj(obj);
        fsGame.createShare({
            share: false,
            name: fsGame.user.displayName + " đã đạt số điểm là: " + gO.getScore().getScoreNumber(),
            des : "Bạn có phải là người nhanh tay nhanh mắt nhất Việt Nam?"
        });
    }, 500);
};