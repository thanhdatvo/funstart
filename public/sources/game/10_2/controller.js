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