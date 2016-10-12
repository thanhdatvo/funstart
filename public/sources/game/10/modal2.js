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
