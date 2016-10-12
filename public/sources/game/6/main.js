$('document').ready(function () {

    setTimeout(function () {
        var images = [];
        function preload(imageUrls) {
            imageUrls.forEach(function(imageUrl, key){
                images[key] = new Image();
                images[key].src = imageUrl;
                // console.log(key);
            });
        }
        preload([
            "/sources/game/6/images/1.png",
            "/sources/game/6/images/1_2.png",
            "/sources/game/6/images/2.png",
            "/sources/game/6/images/2_2.png",
            "/sources/game/6/images/3.png",
            "/sources/game/6/images/3_2.png",
            "/sources/game/6/images/4.png",
            "/sources/game/6/images/4_2.png",
            "/sources/game/6/images/5.png",
            "/sources/game/6/images/5_2.png",
            "/sources/game/6/images/6.png",
            "/sources/game/6/images/6_2.png",
            "/sources/game/6/images/7.png",
            "/sources/game/6/images/7_2.png",
            "/sources/game/6/images/8.png",
            "/sources/game/6/images/8_2.png",
            "/sources/game/6/images/9.png",
            "/sources/game/6/images/9_2.png",
            "/sources/game/6/images/10.png",
            "/sources/game/6/images/10_2.png",
            "/sources/game/6/images/11.png",
            "/sources/game/6/images/11_2.png",
            "/sources/game/6/images/12.png",
            "/sources/game/6/images/12_2.png",
            "/sources/game/6/images/13.png",
            "/sources/game/6/images/13_2.png",
            "/sources/game/6/images/14.png",
            "/sources/game/6/images/14_2.png"
        ]);
    }, 0);
    fsGame.gameStart(function () {
        document.getElementsByClassName('game-area')[0].style.backgroundImage = "url('/sources/game/6/images/bg/18.png')";
        init();
        gamePlay();
        // endGame();
    });
});
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
var gM, gI, gO, gF;

function init() {
    gM = GameManager.getInstance();
    // gM.removeProperties();
    gM.setImageUrlRootPath("/sources/game/6/images/");

    gM.setGameOperator();
    gO = gM.getGameOperator();

    // create level
    gO.setLevel();
    // create HP
    gO.setHP();
    // create Timer
    gO.setTimer();

    // create table of images
    gO.setTableOfImages();

    gO.getHP().setImageUrlPath(gM.getImageUrlRootPath());
    gO.getTableOfImages().setImageUrlPath(gM.getImageUrlRootPath());

    gO.getLevel().showContent();
    gO.getHP().showContent();
    gO.getTimer().showContentAndRun(function () {
        endGame();
    });
    gO.getTableOfImages().createArrayOfImageSrcs();

    gO.setSizeFitScreen();
    gO.show();
}
function gamePlay() {
    if(gO.level.levelNumber > 0){
        fsGame.updateObj({score: gO.level.levelNumber * 750});
    }

    gO.timer.showContentAndRun(function () {
        endGame();
    });

    gO.getTableOfImages().setSize({
        rowsNum: gO.getLevel().getLevelNumber() / 4 + 1,
        colsNum: gO.getLevel().getLevelNumber() / 4 + 1
    });

    gO.getTableOfImages().setDifferentImagePosition({
        rowNum: Math.floor(Math.random() * (gO.getLevel().getLevelNumber() / 4 + 1)),
        colNum: Math.floor(Math.random() * (gO.getLevel().getLevelNumber() / 4 + 1))
    });

    gO.getTableOfImages().createTableImages();

    gO.getTableOfImages().addImageToEachCellOfTable(gO.getLevel().getLevelNumber());
    gO.getTableOfImages().setImageOnclick();
    gO.getTableOfImages().setDifferentImageOnclick(function () {
        gO.getTimer().hideTimerCircleHTMLObject();
        gO.level.increaseLevel(1);
        gO.level.showContent();
        gamePlay();
    });
    gO.getTableOfImages().setSimilarImagesOnclick(function () {
        gO.hP.reduceHP(1);
        gO.hP.showContent();
        if (gO.hP.hPNumber == 0) {
            endGame();
        }
    });
    gO.getTableOfImages().displayImages();
}
var once = true;
var endGame = function () {
    gO.getTableOfImages().setAllImagesDisableOnclick();
    gO.getTableOfImages().shakeDifferentImage();
    gO.getTimer().clearCountdown();
    setTimeout(function () {
        gO.hide();
    }, 1000);
    gM.setFinisher();
    gF = gM.getFinisher();
    var gFB = gF.getFinisherBackground();
    gFB.setImageUrlPath(gM.getImageUrlRootPath() + "bg2.jpg");
    gFB.showContent();
    var gFT = gF.getFinisherText();
    // doSomethingWhenHTMLObjectAlreadyLoaded(gF.getFinisherHTMLObject(), function () {
    //     gFT.setHeight(gF.getFinisherHTMLObject());
    // });
    // setChildDivFontSizeScalesLinearWithFatherDivMaxWidth(gF.getFinisherHTMLObject(), gFT.getFinisherTextHTMLObject(), 36);
    var finisherRemarkContents = [
        'Bạn chưa nhanh mắt cho lắm!',
        'Bạn quan sát tương đối tốt!',
        'Bạn quan sát tuyệt vời đấy!',
        'Bạn có khả năng quan sát rất tốt!',
        'Khả năng quan sát của bạn là vô địch!'];
    var finisherImages = [
        '5_2.png',
        '2_2.png',
        '7_2.png',
        '4_2.png',
        '12.png'
    ];
    var levelResult = gO.getLevel().getLevelNumber();
    var finisherLevelContent = "Level đạt được là " + levelResult,
        finisherRemarkContent = "",
        finisherImage = "";
    if (levelResult <= 6) {
        finisherRemarkContent = finisherRemarkContents[0];
        finisherImage = finisherImages[0];
    } else if (levelResult <= 12) {
        finisherRemarkContent = finisherRemarkContents[1];
        finisherImage = finisherImages[1];
    } else if (levelResult <= 18) {
        finisherRemarkContent = finisherRemarkContents[2];
        finisherImage = finisherImages[2];
    } else if (levelResult <= 24) {
        finisherRemarkContent = finisherRemarkContents[3];
        finisherImage = finisherImages[3];
    } else {
        finisherRemarkContent = finisherRemarkContents[4];
        finisherImage = finisherImages[4];
    }
    gFT.getFinisherImage().setImageUrlPath(gM.getImageUrlRootPath() + finisherImage);
    gFT.getFinisherLevel().setContent(finisherLevelContent);
    gFT.getFinisherRemark().setContent(finisherRemarkContent);
    gFT.getFinisherSuggestion().setContent("Chơi lại để đạt điểm cao hơn hoặc thách đấu với bạn bè!");


    gM.setPercentThroughWidth(737);

    gFT.getFinisherImage().showContent();
    gFT.getFinisherLevel().showContent();
    gFT.getFinisherRemark().showContent();
    gFT.getFinisherSuggestion().showContent();

    if (once) {
        var objArray = [
            // {
            //     HTMLObject: gFT.getFinisherTextHTMLObject(),
            //     styleNames: ['margin-left', 'font-size'],
            //     percent: gM.getPercent()
            // },
            {
                HTMLObject: gFT.getFinisherImage().getFinisherImageHTMLObject(),
                styleNames: ['width', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
                percent: gM.getPercent()
            },
            {
                HTMLObject: gFT.getFinisherLevel().getFinisherLevelHTMLObject(),
                styleNames: ['margin-top', 'font-size'],
                percent: gM.getPercent()
            },
            {
                HTMLObject: gFT.getFinisherRemark().getFinisherRemarkHTMLObject(),
                styleNames: ['margin-top', 'font-size', 'line-height'],
                percent: gM.getPercent()
            },
            {
                HTMLObject: gFT.getFinisherSuggestion().getFinisherSuggestionHTMLObject(),
                styleNames: ['font-size', 'padding-bottom'],
                percent: gM.getPercent()
            }
        ];
        changeScaleToFixScreen(objArray);
        once = false;
    }

    setTimeout(function () {
        fsGame.setResultHtml($('.share').html());
        fsGame.gameOver({score: (gO.level.levelNumber - 1) * 750, isDead: true});
        fsGame.createShare({
            share: false,
            htmlTag: "#canvan",
            name: fsGame.user.displayName + " đạt level " + gO.level.levelNumber,
            des: fsGame.user.displayName + " đã chơi tới level " + gO.level.levelNumber + " rồi đấy, còn bạn thì sao?"
        }, function (res) {
            console.log('res:', res);
        });
    }, 1200);
};