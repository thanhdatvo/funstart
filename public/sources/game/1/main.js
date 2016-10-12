$(document).ready(function(){
    var soundNextLevel = new Howl({
        urls: ['sources/game/1/smb_1-up.wav']
    });
    var soundSuccess = new Howl({
        urls: ['sources/game/1/smb_coin.wav']
    });
    var soundGameOver = new Howl({
        urls: ['sources/game/1/smb_gameover.wav']
    });
    console.log(soundGameOver);

    var canClick;
    var lv = [];
    var color;
    var level;
    var countEnd;
    boxColor = ['#16a085','#27ae60','#2980b9'];
    backColor = ['#1abc9c','#2ecc71','#3498db'];
    shadowColor = ['#16876D','#258745','#235B87'];

    var currentArray;
    var currentNum;
    var game;
    console.log($.keyframe);
    if($(window).width()<500){
        $.keyframe.define([{
            name: 'box-anim',
            '0%':   {'width': '0vw', 'height': '0vw'},
            '30%': {'height': '19vw','width': '19vw'},
            '70%': {'height': '21vw','width': '21vw'},
            '100%': {'width': '20vw', 'height': '20vw'}
        }]);
        $.keyframe.define([{
            name: 'text-anim',
            '0%':   {'font-size': '0'},
            '30%': {'font-size': '28px'},
            '70%': {'font-size': '32px'},
            '100%': {'font-size': '30px'}
        }]);
    } else{

        $.keyframe.define([{
            name: 'box-anim',
            '0%':   {'width': '0vw', 'height': '0vw'},
            '30%': {'height': '83px','width': '83px'},
            '70%': {'height': '68px','width': '68px'},
            '100%': {'width': '75px', 'height': '75px'}
        }]);
        $.keyframe.define([{
            name: 'text-anim',
            '0%':   {'font-size': '0'},
            '30%': {'font-size': '30px'},
            '70%': {'font-size': '45px'},
            '100%': {'font-size': '38px'}
        }]);
    }
    var initBox = function(){
        console.log('init');
        color = Math.floor(Math.random()*boxColor.length);
        $('.box').css('background-color',boxColor[color]);
        $('.panel').css('background-color',boxColor[color]);
        $('.total-game').css('background-color',backColor[color]);
        time = [5000,4000,1000,1000,2000,2000,3000,3000,4000,4000,4000,5000,5000,5000,5000];
        for(var i = 1;i<=16;i++){

            id = '#'+i;
            num = id + '>p';
            idnum = Math.floor(Math.random()*lv[level].length);
            currentArray.push(lv[level][idnum]);
            $(id).playKeyframe({
                name: 'box-anim', // name of the keyframe you want to bind to the selected element
                duration: '300ms', // [optional, default: 0, in ms] how long you want it to last in milliseconds
                timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
                delay: i/6+'s' //[optional, default: 0s]  how long you want to wait before the animation starts
            });
            if (lv[level][idnum]!=0) $(num).html(lv[level][idnum]);
            lv[level].splice(idnum,1);
            $(num).playKeyframe({
                name: 'text-anim', // name of the keyframe you want to bind to the selected element
                duration: '300ms', // [optional, default: 0, in ms] how long you want it to last in milliseconds
                timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
                delay: i/6+'s' //[optional, default: 0s]  how long you want to wait before the animation starts


            });
        }
        setTimeout(function(){
            $('.box>p').html('');
            canClick = true;
        },time[level]);
    }
    function createGame(){
        $('.level').html('Level 1');
        lv[1] = [1,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0];
        lv[2] = [1,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0];
        lv[3] = [1,2,3,4,5,0,0,0,0,0,0,0,0,0,0,0];
        lv[4] = [1,2,3,4,5,6,0,0,0,0,0,0,0,0,0,0];
        lv[5] = [1,2,3,4,5,6,7,0,0,0,0,0,0,0,0,0];
        lv[6] = [1,2,3,4,5,6,7,8,0,0,0,0,0,0,0,0];
        lv[7] = [1,2,3,4,5,6,7,8,9,0,0,0,0,0,0,0];
        lv[8] = [1,2,3,4,5,6,7,8,9,10,0,0,0,0,0,0];
        lv[9] = [1,2,3,4,5,6,7,8,9,10,11,0,0,0,0,0];
        lv[10] = [1,2,3,4,5,6,7,8,9,10,11,12,0,0,0,0];
        lv[11] = [1,2,3,4,5,6,7,8,9,10,11,12,13,0,0,0];
        lv[12] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,0];
        lv[13] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
        lv[14] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        canClick = false;
        level = 1;
        game = true;
        countEnd = 0;
        currentArray = [];
        currentNum = 1;
        $('.game-pn').empty();
        content = '<div><div class="box active" id="1"><p></p></div><div class="box active" id="2"><p></p></div><div class="box active" id="3"><p></p></div><div class="box active" id="4"><p></p></div></div>';
        content+='<div><div class="box active" id="5"><p></p></div><div class="box active" id="6"><p></p></div><div class="box active" id="7"><p></p></div><div class="box active" id="8"><p></p></div></div>'
        content+='<div><div class="box active" id="9"><p></p></div><div class="box active" id="10"><p></p></div><div class="box active" id="11"><p></p></div><div class="box active" id="12"><p></p></div></div>'
        content+='<div><div class="box active" id="13"><p></p></div><div class="box active" id="14"><p></p></div><div class="box active" id="15"><p></p></div><div class="box active" id="16"><p></p></div></div>'
        $('.game-pn').append(content);
        initBox();
        $('#start').html('Chơi lại');
    }
    $('#start').click(function(){
        createGame();

    });
    var exploreAll = function(){
        for(var i = 1;i<=16;i++){
            id = '#'+i;
            num = id + '>p';
            if(currentArray[i-1]) $(num).html(currentArray[i-1]);
        }
    }
    var newLevel = function(){
        soundNextLevel.play();
        if(fsGame.isBattle){
            fsGame.updateObj({score: level*2000});
        }
        level++;
        $('.level').html('Level '+level);
        currentNum = 1;
        currentArray = [];
        $('.box>p').html('');
        for(var i = 1;i<=16;i++){
            id = '#'+i;
            if(!$(id).hasClass('active')) $('.box').addClass('active');
        }
        canClick = false;
        initBox();
    };
    fsGame.gameStart(function(){
        createGame();
    });
    $(document).on('click', '.box.active', function() {
        if(canClick){
            if(currentArray[parseInt($(this).attr('id'))-1]== currentNum && game){
                id = '#'+$(this).attr('id');
                num = id + '>p';
                $(num).html(currentNum);
                $(id).css('background-color','#FFBC00');
                soundSuccess.play();
                $(num).playKeyframe({
                    name: 'text-anim', // name of the keyframe you want to bind to the selected element
                    duration: '500ms', // [optional, default: 0, in ms] how long you want it to last in milliseconds
                    timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
                    delay: '0s' //[optional, default: 0s]  how long you want to wait before the animation starts

                });
                if((level+2)== currentNum){
                    setTimeout(function(){
                        newLevel();
                    },1000);
                }
                $(id).removeClass('active');
                currentNum++;

            }
            else{
                countEnd++;
                if(countEnd==1){
                    soundGameOver.play();
                    $('.result').html('Level '+level);
                    game= false;
                    exploreAll();
                    $('.appvui_share').css('display','block');
                    // fsGame.setResultHtml($('.share').html());
                    fsGame.gameOver({score:level*2000});
                    var des;
                    if(fsGame.isBattle){
                        des = fsGame.user.displayName + " đã thử thách với " + $('#name-opponent').html();
                        if($('#des-opponent').html()) des += $('#des-opponent').html();
                    } else {
                        if(level<7){
                            des = "Trí nhớ của bạn hơi kém, cần rèn luyện thêm"
                        } else if (level<12) {
                            des = "Trí nhớ của bạn khá tuyệt. Nhưng vẫn còn có thể phát triển thêm nữa"
                        } else {
                            des = "Không còn gì để nói! Trí nhớ của bạn quá siêu việt"
                        }
                    }
                    var obj = {
                        title: 'Level: ' + level,
                        des: des,
                        image: fsGame.user.avatar
                    }
                    fsGame.setResultObj(obj);
                    fsGame.createShare({
                        share: false,
                        htmlTag: "#canvan",
                        name: fsGame.user.displayName + " đã đạt level " + level,
                        des: des
                    },function (res) {
                        console.log('res:',res);
                    });



                }

            }
        }

    });

});


