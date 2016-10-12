<!--<!DOCTYPE HTML>
<head>
    <meta http-equiv="content-type" content ="text/html" charset="utf-8"/> 
    <link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"/>
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
            
    
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/game/css/chung.css"/>
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/css/total.css"/>
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/css/photo.css"/>
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/game/css/chat.css"/>    
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/css/feed.css"/>
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/game/css/play.css"/>
    <link href="//www.appnhe.com/js_plugin/src_scrollbar/perfect-scrollbar.css" rel="stylesheet"/>    
</head>-->
<head>
    <meta http-equiv="content-type" content ="text/html" charset="utf-8"/> 
</head>
<body>
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/data/fb/dhbc/index.css"/>
    <!--script src="//www.appnhe.com/data/fb/dhbc/loginFB.js"></script-->
    <script src="//www.appnhe.com/data/fb/dhbc/new.js"></script>
    
    <script>
        CheckLoginFacebook = true;
        function check_login_none(){
            CheckLoginFacebook = false;
        }
    </script>
    
    <div class="dhbc">
        <div class="dhbc_loading">
            <img class="loading_game" src="//www.appnhe.com/data/fb/dhbc/images/icon/loading.gif"/>
        </div>
        <span>
            <img src="//www.appnhe.com/data/fb/dhbc/images/background/nen.jpg"/>
        </span>
        
        <div class="header">            
            <div class="mark">
            0
            </div>
            
            <div class="time">
            0 : 0 : 0
            </div>
        </div>
        
        <div class="dhbc_content">
            <div class="avatar" >
            </div>
            
            <div class="list">
                <img src="//www.appnhe.com/data/fb/dhbc/images/icon/list.png"/>
            </div>
            
            <div class="content_picture"> 
                <img class="picture" src="" id="pic"/>
                <div id="dung" class="truefalse">
                    <img class="picture" src="//www.appnhe.com/data/fb/dhbc/images/icon/dung.png"/>
                    <button class="ok" id="continue">Continue</button>
                </div>
                
                <div id="sai" class="truefalse">
                    <img class="picture" src="//www.appnhe.com/data/fb/dhbc/images/icon/sai.png"/>
                    <button class="ok" id="again">Again</button>
                </div>
            </div>
            
            <input class="answer" type="text" placeholder="Nhập đáp án có dấu và enter"/>
            <button class="answer_sm">OK</button>
            
            <div class="start">
                <img style="width: 90px; height: 90px;" src="//www.appnhe.com/data/fb/dhbc/images/icon/start.png"/>
            </div>
            
            <div class="call_friend" title=" Hỏi bạn bè trên facebook"><img style="width: 90px; height: 90px;" src="//www.appnhe.com/data/fb/dhbc/images/skill/share.png"/></div>
            
            <div class="result">
            </div>
            
            <!--
            <div class="commercial">
                <img src="//www.appnhe.com/data/fb/dhbc/images/skill/commercial.png"/>
            </div>
            -->
            
        </div>
        
        <div class="dhbc_footer">
            <div class="foreknowledge" title="Mở gợi ý">
                <img src="//www.appnhe.com/data/fb/dhbc/images/skill/foreknowledge.png"/>
            </div>
            
            <div class="share_score" title="Chia sẽ điểm lên facebook">
                <img style="width:64px;height:64px;" src="//www.appnhe.com/data/fb/dhbc/images/icon/khoediem.png"/>
            </div>
            
        </div> 
    </div>
<!--/body>
</html-->