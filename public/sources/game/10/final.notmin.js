/*
 Create
 */
function drawChart() {
    // currentTotalPoint = 0;
    var i;
    var arr = [];
    arr.push(['Câu hỏi', 'Bạn', 'Trung bình']);
    var max  = 90,
        min  = 50,
        sumx = 0,
        sumy = 0;
    var quickerAnswerNumber
             = 0;
    for (i = 1; i < maxQuestionNumber + 1; i++) {
        // var x = Math.random() * (max - min + 1) + min;
        var x = timesGiveAnswer[i - 1];
        var y = Math.random() * (max - min + 1) + min;
        arr.push([i + '', x, y]);
        sumx += x;
        sumy += y;
        if (x < y) quickerAnswerNumber++;
    }

    var averagex   = parseFloat(sumx / maxQuestionNumber)
        .toFixed(2);
    var averagey   = parseFloat(sumy / maxQuestionNumber)
        .toFixed(2);
    var compare    = (sumx > sumy)
        ? "chậm"
        : "nhanh";
    document
        .getElementById("iqTest_ResultDetail")
        .innerHTML =
        "<div>Trả lời đúng:" + currentTotalPoint + "/" + maxQuestionNumber + "</div>";
    // document
    //     .getElementById("iqTest_ResultRightAnswerNumber")
    //     .innerHTML =
    //     "Số câu trả lời đúng " + currentTotalPoint + "/" + maxQuestionNumber + "</span>";
    var IQ = (quickerAnswerNumber / maxQuestionNumber) * 50
        + (currentTotalPoint / maxQuestionNumber) * 100;
    var IQType;
    var IQPercent;
    var IQChartColumn;
    if (IQ <= 55) {
        IQChartColumn = 1;
        IQPercent     = "0.1%";
        IQType        = "người KÉM CỎI.";
    }
    else if (IQ <= 70) {
        IQChartColumn = 2;
        IQPercent     = "2%";
        IQType        = "người TỐI DẠ.";
    } else if (IQ <= 85) {
        IQChartColumn = 3;
        IQPercent     = "14%";
        IQType        = "người BÌNH THƯỜNG.";
    } else if (IQ <= 100) {
        IQChartColumn = 4;
        IQPercent     = "34%";
        IQType        = "người BÌNH THƯỜNG.";
    } else if (IQ <= 115) {
        IQChartColumn = 5;
        IQPercent     = "34%";
        IQType        = "người BÌNH THƯỜNG.";
    }
    else if (IQ <= 130) {
        IQChartColumn = 6;
        IQPercent     = "14%";
        IQType        = "người THÔNG MINH.";
    }
    else if (IQ <= 145) {
        IQChartColumn = 7;
        IQPercent     = "2%";
        IQType        = "người THÔNG MINH VƯỢT TRỘI.";
    }
    else {
        IQChartColumn = 8;
        IQPercent     = "0.1%";
        IQType        = "người THIÊN TÀI.";
    }

    document
        .getElementById("iqResultIQNumber")
        .innerHTML =
        "   IQ " + Math.round(IQ) + "  - TOP " + IQPercent + "";

    // var data = google.visualization.arrayToDataTable(arr);
    var data = google.visualization.arrayToDataTable([
        ['IQ', '% người được'],
        ['', 0.5],
        ['IQ55', 1],
        ['IQ70', 4],
        ['IQ85', 14],
        ['IQ100', 34],
        ['IQ115', 14],
        ['IQ130', 4],
        ['IQ145', 1],
        ['', 0.5]
    ]);

    //old
    // var options = {
    //     title: 'Thời gian đưa ra đáp án (giây)',
    //     legend: {
    //         position: 'bottom', alignment: 'center', maxLines: 2,
    //         textStyle: {fontSize: 14, color: '#201F56'}
    //     },
    //     titleTextStyle: {fontSize: 16, color: '#201F56'},
    //     hAxis: {textStyle: {fontSize: 13, color: '#201F56'}},
    //     vAxis: {textPosition: 'in', textStyle: {fontSize: 13, color: '#201F56'}},
    //     // width: 500,
    //     backgroundColor: '#EFEFEF'
    // };

    //new
    var options = {
        series: {
            0: {pointShape: {type: 'star', sides: 5, dent: 0}, lineDashStyle: [4, 1]},
            // 1: { pointShape: { type: 'star', sides: 5, dent: 0.5 } },
        },
        colors: ['#e2431e', '#201F56'],
        lineWidth: 4,
        pointSize: 30,
        curveType: 'function',
        vAxis: {format: '#\'%\'', textPosition: 'in'},
        // title: 'Company Performance',
        legend: {position: 'none'},
        // height: 340,
        height: 440,
        width: 700,
        chartArea:{width:'95%',height:'75%', bottom: 30}
        // legend: {position: 'in'},
        // titlePosition: 'in', axisTitlesPosition: 'in',
        // hAxis: {textPosition: 'in'}, vAxis: {textPosition: 'in'}
    };
    console.log($('.share').width());
    function placeMarker(dataTable) {
        var cli       = this.getChartLayoutInterface();
        var chartArea = cli.getChartAreaBoundingBox();

        // "Zombies" is element #5.
        if ($(window).width() >= 700) {
            var viewPercentage = 0.7;
            document.querySelector('.overlay-marker').style.top  = Math.round((Math.round(cli.getYLocation(dataTable.getValue(IQChartColumn, 1))) - 25) * viewPercentage) + "px";
            document.querySelector('.overlay-marker').style.left = Math.round((Math.round(cli.getXLocation(IQChartColumn)) - 50) * viewPercentage) + "px";
        } else {
            document.querySelector('.overlay-marker').style.top  = Math.round(cli.getYLocation(dataTable.getValue(IQChartColumn, 1)) * ($(window).width() - 32) / 700) - 10 + "px";
            document.querySelector('.overlay-marker').style.left = Math.round(cli.getXLocation(IQChartColumn) * ($(window).width() - 32) / 700) - 20 + "px";
        }
        document.getElementById('iqTest_UserImage').src = fsGame.user.avatar;
    };

    var chart_div = document.getElementById('linechart_material');
    var chart     = new google.visualization.LineChart(chart_div);

    google.visualization.events.addListener(chart, 'ready', function () {
        chart_div.innerHTML = '<img id=iqTest_chartImg src="' + chart.getImageURI() + '">';
        console.log('1');
    });

    google.visualization.events.addListener(chart, 'ready',
        placeMarker.bind(chart, data));
    chart.draw(data, options);

    // var chart = new google
    //     .charts
    //     .Line(document.getElementById('linechart_material'));
    // chart
    //     .draw(data, options);
    // alert($('.share').html());
    setTimeout(function () {
        fsGame.setResultHtml($('.share').html());

        fsGame.gameOver(IQ * 200);
        fsGame.createShare({
            share: false,
            htmlTag: "#canvan",
            name: fsGame.user.displayName + " có IQ:" + Math.round(IQ) + " thuộc Top " + IQPercent + " " + IQType,
            des: "Test IQ miễn phí cùng Funstart"
        }, function (res) {
            console.log('res:', res);
        });
        // setTimeout(function () {
        //     $("#iqResultTable").css("margin-top", $("#overlay-text").height());
        //     // alert($("#overlay-text").height());
        //     // alert($("#iqResultTable").css("margin-top"));
        //     // alert($('#overlay-text').css("height");
        //     // alert(document.getElementById('overlay-text').style.position);
        // }, 1000);
    }, 1000);

    // alert(JSON.stringify(resultArray));
    for(i = 0; i < resultArray.length; i++){
        if(resultArray[i]){
            document.getElementById("rs" + (i + 1)).innerHTML = "<img class=iqTestResultImage src='/sources/game/10/images/result-thumb/tick.png'/>";
        } else {
            document.getElementById("rs" + (i + 1)).innerHTML = "<img class=iqTestResultImage src='/sources/game/10/images/result-thumb/cross.png'/>";
        }
    }

    //
    // var canvas = document.getElementById('canvas');
    // var ctx = canvas.getContext('2d');
    //
    // var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
    //     '<foreignObject width="100%" height="100%">' +
    //     '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
    //     '<em>I</em> like ' +
    //     '<span style="color:white; text-shadow:0 0 2px blue;">' +
    //     'cheese</span>' +
    //     '</div>' +
    //     '</foreignObject>' +
    //     '</svg>';
    //
    // var DOMURL = window.URL || window.webkitURL || window;
    //
    // var img = new Image();
    // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    // var url = DOMURL.createObjectURL(svg);
    //
    // img.onload = function () {
    //     ctx.drawImage(img, 0, 0);
    //     DOMURL.revokeObjectURL(url);
    // }
    //
    // img.src = url;


}

/**
 * Created by PHI LONG on 8/29/2016.
 */
$(document).ready(function () {
    fsGame.gameStart(function () {
        iqQuestionsInit();
    });
});
var maxQuestionNumber   ;
var currentTotalPoint   ;
var resultArray = [];
var currentQuestionIndex ;
var iqQuestions         ;
var currentIqQuestion;
var out;
var countDownTime;
var timeoutVariableToShutdownTimeout;
var timeCountUp;
var timesGiveAnswer ;
var googleChartCallTime = 0;
function iqQuestionsInit() {

    maxQuestionNumber    = 10;
    currentTotalPoint    = 0;
    currentQuestionIndex = 0;
    iqQuestions          = [];
    timesGiveAnswer      = [];
    iqTestSource = shuffle(iqTestSource);
    // alert(1);
    var i;
    for (i = 0; i < maxQuestionNumber; i++) {
        for (var property in iqTestSource[i]) {
            var iqQuestion = new iqQuestion_inputTextAnswers(null,
                "/sources/game/10/images/question/" + property + ".jpg",
                iqTestSource[i][property]);
            iqQuestions
                .push(iqQuestion);
            // alert(iqQuestion.questionContentImageUrl);
        }
    }

    displayNextStage(currentQuestionIndex);
}
function checkAnswerAndChangeToNextStage(correctAnswer) {
    if (correctAnswer == document.getElementById("iqTestInputAnswerTextBox").value) {
        currentTotalPoint++;
        resultArray.push(true);
    } else {
        resultArray.push(false);
    }
    clearTimeout(timeoutVariableToShutdownTimeout);
    clearInterval(countDownTime);
    timesGiveAnswer
        .push(timeCountUp);
    displayNextStage(++currentQuestionIndex);
}
function reClass(elementId, className, callback) {
    document
        .getElementById(elementId)
        .className = '';
    setTimeout(function () {
        document
            .getElementById(elementId).className = className;
        callback();
    },10);
}
function displayNextStage(currentQuestionIndex) {

    if (currentQuestionIndex < maxQuestionNumber) {
        reClass("gameContent", "animated fadeInDown", function () {
            timeCountUp                      = 0;
            document
                .querySelector("div#iqTextCountdownTime")
                .innerHTML                   = timeCountUp + " giây";
            // chờ animation sau 1s rồi mới đếm
            timeoutVariableToShutdownTimeout = setTimeout(function () {
                countDownTime = setInterval(function () {
                    timeCountUp++;
                    document
                        .querySelector("div#iqTextCountdownTime")
                        .innerHTML = timeCountUp + " giây";
                    // if (timeCountUp === 0) {
                    //     clearTimeout(timeoutVariableToShutdownTimeout);
                    //     clearInterval(countDownTime);
                    //     displayNextStage(++currentQuestionIndex);
                    // }
                }, 500);
            }, 1000);

            document.querySelector("div#iqTextQuestionNumber")
                .innerHTML = "Câu hỏi " + (currentQuestionIndex + 1) + " / " + maxQuestionNumber;

            out = "";

            currentIqQuestion = iqQuestions[currentQuestionIndex];

            if (currentIqQuestion.questionContentText != null) {
                out += currentIqQuestion
                    .questionContentText
                    .questionContentTextDisplay();
            }

            if (currentIqQuestion.questionContentImageUrl != null) {
                out += currentIqQuestion
                    .questionContentImageUrl
                    .questionContentImageUrlDisplay();
            }

            // if (currentIqQuestion instanceof iqQuestion_multipleChoiceTextAnswers) {
            //     out += currentIqQuestion
            //         .textAnswers
            //         .display();
            // } else if (currentIqQuestion instanceof iqQuestion_multipleChoiceImageAnswers) {
            //     out += currentIqQuestion
            //         .imageAnswers
            //         .display();
            // } else if (currentIqQuestion instanceof iqQuestion_inputTextAnswers) {
            out += currentIqQuestion
                .inputTextAnswer
                .display();
            // }

            document.querySelector('div#iqTestContent').innerHTML = out;
        });
    } else {
        document.querySelector('div#iqTextCountdownTime')
            .innerHTML = '';
        document.querySelector('div#iqTextQuestionNumber')
            .innerHTML = '';
        document.querySelector('div#iqTestContent')
            .innerHTML = '';
        // document.querySelector('div#iqTestEndGameResult')
        //     .innerHTML = "<div>Hết game. Tổng điểm " + currentTotalPoint + "</div>";
        if(googleChartCallTime === 0){
            google
                .charts
                .load('current', {'packages': ['corechart']});
            googleChartCallTime++;
        }
        google
            .charts
            .setOnLoadCallback(drawChart);
    }
}

/**
 * Created by PHI LONG on 8/29/2016.
 */
var iqTestSource = [
    {1: 6},
    {2: 8},
    {3: 312},
    {4: 128},
    {5: 9},
    {6: 225},
    {7: 95},
    {8: 4},
    {9: 4},
    {10: 1},
    {11: 4},
    {12: 5},
    {13: 4},
    {14: 3},
    {15: 3},
    {16: 2},
    {17: 3},
    {18: 3},
    {19: 4},
    {20: 3},
    {21: 4},
    {22: 32},
    {23: 12},
    {24: 3},
    {25: 9},
    {26: 19},
    {27: 720},
    {28: 1},
    {29: 2},
    {30: 10},
    {31: 1},
    {32: 6},
    {33: 37},
    {34: 120},
    {35: 2325},
    {36: 566},
    {37: 4},
    {38: 6},
    {39: 126},
    {40: 16},
    {41: 23},
    {42: 6258},
    {43: 49},
    {44: 25},
    {45: 320},
    {46: 85914},
    {47: 3},
    {48: 11},
    {49: 49},
    {50: 12},
    {51: 7},
    {52: 12},
    {53: 47},
    {54: 5},
    {55: 9},
    {56: 27},
    {57: 6},
    {58: 5},
    {59: 2},
    {60: 40},
    {61: 55},
    {62: 16},
    {63: 4},
    {64: 4},
    {65: 2},
    {66: 2},
    {67: 3},
    {68: 5},
    {69: 2},
    {70: 4},
    {71: 12},
    {72: 26},
    {73: 4},
    {74: 83},
    {75: 8},
    {76: 10},
    {77: 6},
    {78: 1},
    {79: 126},
    {80: 720},
    {81: 3},
    {82: 3},
    {83: 2},
    {84: 2},
    {85: 4},
    {86: 3},
    {87: 913},
    {88: 4},
    {89: 100},
    {90: 16},
    {91: 41},
    {92: 14},
    {93: 7},
    {94: 99},
    {95: 6859},
    {96: 4},
    {97: 5},
    {98: 630},
    {99: 2},
    {100: 15},
    {101: 4},
    {102: 18},
    {103: 3},
    {104: 10},
    {105: 42},
    {106: 4254},
    {107: 453},
    {108: 37},
    {109: 8},
    {110: 5},
    {111: 28917},
    {112: 17},
    {113: 29},
    {114: 3},
    {115: 20},
    {116: 2},
    {117: 122},
    {118: 24},
    {119: 10},
    {120: 120},
    {121: 87},
    {122: 13},
    {123: 2150},
    {124: 12},
    {125: 59},
    {126: 2},
    {127: 8},
    {128: 2},
    {129: 5},
    {130: 3},
    {131: 1},
    {132: 2},
    {133: 4},
    {134: 2},
    {135: 1},
    {136: 2},
    {137: 5},
    {138: 3},
    {139: 5},
    {140: 3}
];


function shuffle(array) {
    var copy = [],
        n = array.length,
        i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math
            .floor(Math.random() * array.length);

        // If not already shuffled, move it to the new array.
        if (i in array) {
            copy
                .push(array[i]);
            delete array[i];
            n--;
        }
    }

    return copy;
}

/**
 * Created by PHI LONG on 8/29/2016.
 */

function CorrectAnswer (correctAnswer) {
    this.correctAnswer = correctAnswer;
}
CorrectAnswer.prototype.checkCorrectAnswer = function () {
    return "checkAnswerAndChangeToNextStage(" + this.correctAnswer + ")";
};


function QuestionContentText (questionContentText) {
    this.questionContentText = questionContentText;
}
QuestionContentText.prototype.questionContentTextDisplay = function () {
    return "<div id='iqQuestion_questionContent'>" +
        this.questionContentText +
        "</div>";
};

function QuestionContentImage (questionContentImageUrl) {
    this.questionContentImageUrl = questionContentImageUrl;
}

QuestionContentImage.prototype.questionContentImageUrlDisplay = function () {
    return "<div >" +
        "<img id='iqQuestion_questionImage' src='" +
        this.questionContentImageUrl +
        "' alt='Iq question image'/>" +
        "</div>";
};
function MultipleChoiceTextAnswers (correctAnswer, answers) {
    this.correctAnswer = new CorrectAnswer(correctAnswer);
    this.answers = answers;
}
MultipleChoiceTextAnswers.prototype.display = function(){
    var out = "<section class=press>";
    var i;
    for(i = 0; i < this.answers.length; i++){
        out += "<button class='IqTestAnswer_imageAnswers' " +
            "onclick='" + this.correctAnswer.checkCorrectAnswer(i) + "'>" + this.answers[i] +
            "</button>"
    }
    return out += "</section>";
};

function MultipleChoiceImageAnswers (correctAnswer, answers) {
    this.correctAnswer = new CorrectAnswer(correctAnswer);
    this.answers = answers;
}
MultipleChoiceImageAnswers.prototype.display = function () {
    var out = "<section class=press>";
    var i;
    for(i = 0; i < this.answers.length; i++){
        out += "<button class='IqTestAnswer_imageAnswers' onclick='" + this.correctAnswer.checkCorrectAnswer(i) + "'>" +
            "<img src='" + this.answers[i] +"'/>" +
            "</button>";
    }
    return out += "</section>";
};

function InputTextAnswers (correctAnswer) {
    this.correctAnswer = new CorrectAnswer(correctAnswer);
}
InputTextAnswers.prototype.display = function () {
    var out =  "<div id='iqTestInputAnswerPart'><label> Đáp án </label>" +
        "<input id=iqTestInputAnswerTextBox type=text /> </div>" +
        "<section class=press id=iqTestInputAnswerButton><button class='IqTestAnswer_imageAnswers' " +
        " onclick='" + this.correctAnswer.checkCorrectAnswer() + "'>Trả lời</button></section>";
    return out;
};

function iqQuestion  (questionContentText, questionContentImageUrl) {
    if(questionContentText != null) {
        this.questionContentText = new QuestionContentText(questionContentText);
    } else {
        this.questionContentText = null;
    }
    if(questionContentImageUrl != null) {
        this.questionContentImageUrl = new QuestionContentImage(questionContentImageUrl);
    } else {
        this.questionContentImageUrl = null;
    }
}

var iqQuestion_multipleChoiceTextAnswers = function (questionContentText, questionContentImageUrl, correctAnswer, textAnswers) {
    iqQuestion.call(this, questionContentText, questionContentImageUrl);
    this.textAnswers = new MultipleChoiceTextAnswers(correctAnswer, textAnswers);
};

function iqQuestion_multipleChoiceImageAnswers (questionContentText, questionContentImageUrl, correctAnswer, imageAnswers) {
    iqQuestion.call(this, questionContentText, questionContentImageUrl);
    this.imageAnswers = new MultipleChoiceImageAnswers(correctAnswer, imageAnswers);

}

function iqQuestion_inputTextAnswers (questionContentText, questionContentImageUrl, correctAnswer) {
    iqQuestion.call(this, questionContentText, questionContentImageUrl);
    this.inputTextAnswer = new InputTextAnswers(correctAnswer);
}
