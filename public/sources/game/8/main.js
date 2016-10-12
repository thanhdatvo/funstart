var lv = 1;
var level = 1;
var elW;
var widthBox = document.getElementById("gBoxContainer").offsetWidth;
data = [
    "Năng lực tập trung và tư duy không gian của bạn khá tốt. Thực ra, bạn có đủ tố chất để chèo lái cuộc sống mà không gặp bất cứ vấn đề gì. Chỉ với sự thực là bạn không ngần ngại thử thách mình như vừa rồi, bạn chứng tỏ mình có đầy tiềm năng!",
    "Theo phân tích về xu hướng trả lời của bạn, mức độ tập trung và tư duy hình học của bạn cao gấp 30 lần người bình thường! Bạn có biết chỉ 10% người chơi có thể đạt mức này tính đến nay?! Một kết quả không chê vào đâu được!",
    "Không còn nghi ngờ gì nữa, bạn chắc chắn là một thiên tài! Khả năng tập trung và tư duy không gian của bạn cao gấp 50 lần người bình thường, và bạn nằm trong TOP 0.1% trên thế giới. Điều gây sốc hơn nữa là bạn còn có tiềm năng lớn hơn nữa mà chưa khai thác hết!"
];


var dataM = [];
dataM[0] = ["q", "p"];
dataM[1] = ["M", "W"];
dataM[2] = ["0", "O"];
dataM[3] = ["1", "I"];
dataM[4] = ["X", "K"];
dataM[5] = ["Z", "N"];
dataM[6] = ["O", "Q"];
dataM[7] = ["9", "6"];
dataM[8] = ["Ư", "U"];
dataM[9] = ["e", "ê"];
dataM[10] = ["9", "0"];
dataM[11] = ["9", "8"];
dataM[12] = ["0", "8"];
dataM[13] = ["ă", "â"];
dataM[14] = ["E", "F"];
dataM[15] = ["s", "r"];
dataM[16] = ["t", "i"];
var arrG = [];
var timeG = 20;
var countTime = 20;
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
function Countdown(options) {
    var timer,
        instance = this,
        seconds = options.seconds || 10,
        updateStatus = options.onUpdateStatus || function () {
            },
        counterEnd = options.onCounterEnd || function () {
            };

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds <= 0) {
            counterEnd();
            instance.stop();
        }
        seconds--;
    }

    this.changeTime = function () {
        seconds = seconds - 20;
    };


    this.start = function () {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 100);
    };

    this.stop = function () {
        clearInterval(timer);
    };
}
var myCounter = new Countdown({
    seconds: 200,  // number of seconds to count down
    onUpdateStatus: function (sec) {
        $('.timeGame').html(sec / 10 + 's');

    },
    onCounterEnd: function () {

        myCounter.stop();

        fsGame.gameOver(lv);
        fsGame.setResultHtml($("#showResult").html());
        fsGame.createShare({
            share: true,
            //htmlTag: "#canvan",
            name : fsGame.user.name + " đã tìm được "+lv+" chữ cái khác biệt đang lẩn trốn?",
            des : "Click để kiểm tra độ nhạy của mắt bạn"
        });

    }
});

newLevel = function (lIndex, lv) {

    for (var i = 0; i < ((lv + 1) * (lv + 1) - 1); i++) {
        arrG.push(dataM[lIndex][1]);
    }

    arrG.insert(Math.floor(Math.random() * arrG.length), dataM[lIndex][0]);
    elW = widthBox / (lv + 1);
    for (var i = 0; i <= lv; i++) {
        for (var j = 0; j <= lv; j++) {
            var ind = (lv + 1) * i + j;
            $('.gBox').append('<div class="boxElem" style="width:' + elW + 'px;height:' + elW + 'px;font-size:' + elW + 'px;float: left">' + arrG[ind] + '</div>');
        }
    }
}


var count = 0;
$(document).ready(function () {
    $("body").off().on('click', '.boxElem', function () {

        if ($(this).html() === dataM[lIndex][0]) {
            $('.gBox').html("");
            level++;
            count++;
            if (count == 3 * lv) {
                lv++;
            }

            $('.levelGame').html('Level ' + level);

            setupNewLevel();

        } else {

            $(".timeGame").css('color', 'red');
            setTimeout(function() {
                $(".timeGame").css('color', '#201f56');
            }, 500)

            myCounter.changeTime();
        }

        $('.nd1').html('Bạn đạt Level ' + level);
        if (lv <= 10) {
            $('.nd2').html(data[0]);
        } else if (lv > 10 && lv <= 30) {
            $('.nd2').html(data[1]);
        } else {
            $('.nd2').html(data[2]);
        }

    });

    fsGame.gameStart(function(){
        $('.gBox').html("");

        level = 1;
        lv = 1;
        count = 0;
        $('.levelGame').html('Level ' + level);

        setupNewLevel()
    });

    function setupNewLevel() {
        arrG = [];
        lIndex = Math.floor(Math.random() * dataM.length);
        newLevel(lIndex, lv);

        myCounter.stop();
        myCounter.start();
    }
});