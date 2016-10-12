/**
 * Created by PHI LONG on 8/29/2016.
 */
class CorrectAnswer {
    constructor(correctAnswer){
        this.correctAnswer = correctAnswer;
    };
    //Dùng với inputtextquestion
    checkCorrectAnswer(){
        // if(document.getElementById("iqTestInputAnswer").value != null){
        //     alert(document.getElementById("iqTestInputAnswer").value);
        // }
        return "checkAnswerAndChangeToNextStage(" + this.correctAnswer + ")";
    };
}

class QuestionContentText{
    constructor(questionContentText){
        this.questionContentText = questionContentText;
    };
    questionContentTextDisplay(){
        return "<div id='iqQuestion_questionContent'>" +
            this.questionContentText +
            "</div>";
    };
}

class QuestionContentImage{
    constructor(questionContentImageUrl){
        this.questionContentImageUrl = questionContentImageUrl;
    };
    questionContentImageUrlDisplay(){
        return "<div >" +
            "<img id='iqQuestion_questionImage' src='" +
            this.questionContentImageUrl +
            "' alt='Iq question image'/>" +
            "</div>";
    };
}

class MultipleChoiceTextAnswers{
    constructor(correctAnswer, answers){
        this.correctAnswer = new CorrectAnswer(correctAnswer);
        this.answers = answers;
    };
    display(){
        var out = "<section class=press>";
        var i;
        for(i = 0; i < this.answers.length; i++){
            out += "<button class='IqTestAnswer_imageAnswers' " +
                "onclick='" + this.correctAnswer.checkCorrectAnswer(i) + "'>" + this.answers[i] +
                "</button>"
        }
        return out += "</section>";
    };
}

class MultipleChoiceImageAnswers{
    constructor(correctAnswer, answers){
        this.correctAnswer = new CorrectAnswer(correctAnswer);
        this.answers = answers;
    };
    display(){
        var out = "<section class=press>";
        var i;
        for(i = 0; i < this.answers.length; i++){
            out += "<button class='IqTestAnswer_imageAnswers' onclick='" + this.correctAnswer.checkCorrectAnswer(i) + "'>" +
                "<img src='" + this.answers[i] +"'/>" +
                "</button>";
        }
        return out += "</section>";
    };
}

class InputTextAnswers{
    constructor(correctAnswer){
        this.correctAnswer = new CorrectAnswer(correctAnswer);
    };
    display(){
        var out =  "<div id='iqTestInputAnswerPart'><label> Đáp án </label>" +
                "<input id=iqTestInputAnswerTextBox type=text /> </div>" +
                "<section class=press id=iqTestInputAnswerButton><button class='IqTestAnswer_imageAnswers' " +
            " onclick='" + this.correctAnswer.checkCorrectAnswer() + "'>Trả lời</button></section>";
        return out;
    };
}

class iqQuestion {
    constructor(questionContentText, questionContentImageUrl){
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
}

class iqQuestion_multipleChoiceTextAnswers extends iqQuestion {
    constructor(questionContentText, questionContentImageUrl, correctAnswer, textAnswers){
        super(questionContentText, questionContentImageUrl);
        this.textAnswers = new MultipleChoiceTextAnswers(correctAnswer, textAnswers);
    }
}

class iqQuestion_multipleChoiceImageAnswers extends iqQuestion {
    constructor(questionContentText, questionContentImageUrl, correctAnswer, imageAnswers){
        super(questionContentText, questionContentImageUrl);
        this.imageAnswers = new MultipleChoiceImageAnswers(correctAnswer, imageAnswers);
    }
}

class iqQuestion_inputTextAnswers extends iqQuestion {
    constructor(questionContentText, questionContentImageUrl, correctAnswer){
        super(questionContentText, questionContentImageUrl);
        this.inputTextAnswer = new InputTextAnswers(correctAnswer);
    }
}
