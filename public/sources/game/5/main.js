var urlPic = '';
var user_name = '';

$(window).ready(function () {

    var speed = 7000;
    var game = function (speed) {

        var names = [
                "Đỏ",
                "Vàng",
                "Xanh",
                "Trắng",
                "Tím"
            ],
            colours = [
                'rgb(239, 72, 54)',
                'rgb(245, 171, 53)',
                'rgb(52, 152, 219)',
                'rgb(255, 255, 255)',
                'rgb(155, 89, 182)'
            ],
            timeout,
            timer,
            life = 3,

            domCache = {
                startGame: $('#start')[0],
                wordBox: $('#word')[0],
                answerBox: $('#options')[0],
                scoreBox: $('#score')[0],
                timer: $('#timer')[0],
                gameoverBox: $('#gameover-container')[0],
                restart: $('#restart')[0],
                life: $('.life')[0],
                pbContainer: $('#pb-container')[0],
                pb: $('#pb')[0]
            };

        var methods = {
            pbCookie: function () {
                var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)maxSc\s*\=\s*([^;]*).*$)|^.*$/, "$1");

                if (!cookieValue) {
                    domCache.pb.textContent = 0;
                } else {
                    domCache.pbContainer.style.display = 'block';
                    domCache.pb.textContent = cookieValue;
                }
                return cookieValue;
            },
            rand: function () {
                var i = (Math.round(Math.random() * (names.length - 1)));
                return i;
            },
            pick: function (ar) {
                var picked = ar[methods.rand()];
                return picked;
            },
            showWord: function () {
                domCache.wordBox.textContent = methods.pick(names);
                domCache.wordBox.style.color = methods.pick(colours);
            },
            showAnswer: function () {
                for (var i = 0; i < names.length; i++) {
                    domCache.answerBox.innerHTML += '<li><button class="option" data-colour="' + colours[i] + '">' + names[i] + '</button></li>';
                }
            },
            timeout: function () {
                if (domCache.scoreBox.textContent >= 10) {
                    speed = 1750;
                } else {
                    speed = 7000;
                }
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    methods.gameOver();
                }, speed)
            },
            timer: function () {
                if (domCache.scoreBox.textContent >= 8) {
                    speed = 1750;
                } else {
                    speed = 7000;
                }
                clearInterval(timer);
                var w = 100;

                timer = window.setInterval(function () {
                    domCache.timer.style.width = ((w - 1) - 1) + '%';
                    w--;
                }, (speed / 100));
            },
            getAnswer: function () {
                var answers = document.querySelectorAll('.option');
                return answers;
            },
            clickListeners: function () {
                for (var i = 0; i <= names.length; i++) {
                    methods.getAnswer()[i].addEventListener('click', function (e) {
                        methods.checkAnswer(e);
                    });
                }
            },
            checkAnswer: function (e) {
                var idcolor = e.target.getAttribute('data-colour');
                console.log(idcolor);
                console.log(domCache.wordBox.style.color);
                if (idcolor != domCache.wordBox.style.color) {
                    clearTimeout(timeout);
                    methods.gameOver();
                } else {

                    methods.showWord();
                    methods.updateScore();
                    methods.timer();
                    methods.timeout();
                }
            },
            restart: function () {
                domCache.restart.addEventListener('click', function () {
                    domCache.gameoverBox.style.display = 'none';
                    domCache.restart.style.display = 'none';
                    methods.showWord();
                    methods.updateScore(0);
                    methods.timer();
                    methods.timeout();
                })
            },
            initScore: function () {
                domCache.scoreBox.textContent = 0;
            },
            updateScore: function (sc) {
                if (sc == false) {
                    domCache.scoreBox.textContent = 0;
                } else {
                    var currentScore = parseInt(domCache.scoreBox.textContent);
                    var newScore = currentScore + 1;
                    domCache.scoreBox.textContent = newScore;

                }
                if (newScore > methods.pbCookie()) {
                    document.cookie = 'maxSc=' + newScore;
                }
                domCache.pb.textContent = methods.pbCookie();
            },

            startGame: function () {
                domCache.startGame.addEventListener('click', function () {
                    $('.show_first').css('display', 'none');
                    $('.part01').css('display', 'block');
                    domCache.startGame.style.display = 'none';
                    methods.timer();
                    methods.timeout();
                    methods.showWord();
                    methods.showAnswer();
                    methods.clickListeners();
                })
            },

            result: function () {
                if (life == 0) {
                    gameOver();

                }
            },
            gameOver: function(){
                var x = parseInt($('#pb').text());
                var des;
                if(x<5){
                    des = 'Chắc bạn chưa hiểu rõ luật chơi rồi. Thử lại nhé';
                } else if (x<20){
                    des = 'Bạn chơi khá tốt rồi. Cố lên trong lần sau nhé';
                } else {
                    des = 'Xin chúc mừng! Bạn có khả năng phân biệt thật đáng nể';
                }
                var obj = {
                    des: des,
                    title: 'Level: ' + x,
                    image: fsGame.user.avatar
                }
                fsGame.gameOver({score:x*1000});
                fsGame.setResultObj(obj);
                fsGame.createShare({
                    share: false,
                    htmlTag: "#canvan",
                    name: fsGame.user.displayName + " được " + x + " điểm!",
                    des: fsGame.user.displayName + " đã đạt thành tích tốt nhất là " + x + " điểm. Bạn có muốn thử?"
                },function (res) {
                    console.log('res:',res);
                });
            }
        }
        var init = function () {
            methods.pbCookie();
            methods.initScore();
            methods.startGame();
        }
        return {
            init: init()
        }

    }

    game(speed);


});
