function check_login_none(){
    $(".showNoneLogin").css('display','block');
};

$(window).ready(function(){
    $(".dhbc_loading").css('display','block');
    // khai bao cac bien xuat cau hoi va caau tra loi cua tro choi
    count=0;    //dem so cau hoi da tra loi
    var data=[]; //mang chua du lieu lay ra tu file excel
    var known=[]; // mang chua cac cau goi y
    check_sh=0;
    
    // bien thoi gian cua tro choi
    hour=0;
    min=0;
    sec=0;
    
    var inter;
    // bien hien thi diem nguoi choi
    user_name="";
    user_id="";
    rank=0;
    
    //cac bien cua call friend;
    callFriend="";
    friendLink="";
    
    // xu li phan tro choi-----------------------------------
        
    $(".start").click(function(){
        if(CheckLoginFacebook ){
            $(".dhbc_loading").css('display','block');
            //public action
            FB.api(
              'me/ylinkee:play',
              'post',
              {
                object: "https://www.appnhe.com/game/play.php?g=161"
              },
              function(response) {
                $.ajax({
                        url: "//www.appnhe.com/Model/photo/add_history.php?id=161&type=game&action_id="+response.id,
                    })
              }
            );
            readData();
            Create_user();
            inter=setInterval(timer, 1000);
            $(".start").css('display','none');
            $(".call_friend").css('display','block');
        }else{
            $(".showNoneLogin").css('display','block');
        }
    });
    
    function readData()
    {
        file="//www.appnhe.com/data/fb/dhbc/Book1.txt";
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    var tam=allText.split('=');
                    for(i=0;i<tam.length;i++)
                    {
                        data[i]=tam[i].split('/')[1];
                        known[i]=tam[i].split('/')[2];
                    }
                }
            }
        }
        rawFile.send(null);	
    }
    
    function getAnswer(id){
        answers=data[id].toLowerCase();
    }
    
    function getQuestion(id)
    {
        callFriend="";
        question=$.trim(data[id].replace(" ",""));
        rss="";
        var rd = "abcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < 20/question.length+1; i++ )
        question += rd.charAt(Math.floor(Math.random() * rd.length));
        tmp=[];
        cn=0;
        while(cn<question.length) {
            flag = false;
            value = Math.floor(Math.random() * question.length);
            for(i=0; i<tmp.length; i++){
                if(tmp[i]==value){
                    flag = true;
                    break;
                    }
            }
            if(!flag){
                tmp[cn]=value;
                callFriend+=question.charAt(value).toUpperCase()+",";
                rss+="<div class='array_result' id='rs"+question.charAt(value)+value+"'>"+question.charAt(value)+"</div>"; 
                cn++;
            }
        }
        margin_left=Math.floor((500-question.length*31)/2);
        $(".result").html("<div class='aline_result' style='left:"+margin_left+"px;'>"+rss+"</div>");
    }
    
        
    function start_game(){
        //alert(count+","+number);
        if(count<301)
        {    
            $("#pic").attr("src","//www.appnhe.com/data/fb/dhbc/images/test/"+count+".jpg");
            getAnswer(count);
            getQuestion(count);
            $("#pic").load(function(){
                $(".dhbc_loading").css('display','none');
            });
        }
        else{
            $(".dhbc_loading").css('display','none');
            alert("Bạn đã vượt qua toàn bộ câu hỏi của chúng tôi! chúng tôi sẽ cập nhật thêm câu hỏi sau! mời bạn quay lại vào lần sau!");
        }
    }   
    
    $(".answer").keypress(function(event){
        if(event.keyCode==13)
        {
            if(check_sh==0)
            {
                checkWin();
            } 
        }
    });
    
    $(".answer_sm").click(function(){
        checkWin();
    });
    
    function checkWin(){
        ans=$.trim($(".answer").val().toLowerCase());
            if(ans==answers)
            {
                check_sh=1;
                $("#dung").css('display','block');
                count++; // kiem tra xem da het cau hoi hay chua
                $("#continue").focus();   
            }
            else{
                check_sh=1;
                $("#sai").css('display','block');
                $("#again").focus();
            }
    }
    
    $("#continue").click(function(){ 
        check_sh=0;
        $(".answer").val("");
        $("#dung").css('display','none'); 
        $(".dhbc_loading").css('display','block');
        $(".answer").focus();                                                       
        update();
    });
    
    $("#again").click(function(){
        check_sh=0;
        $(".answer").val("");
        $("#sai").css('display','none');
        $(".answer").focus(); 
        start_game();
    });
    
    //update diem so-----------------
     function update(){
        $.ajax({
            url: "//www.appnhe.com/data/fb/dhbc/update.php?user_name="+user_name+" &user_id="+user_id+" &score="+count+"&answer="+count,
            success: function(res){
                $(".mark").html(count);
            }
        }).done(function(){
            check_sh=0;
            start_game();
        });
     }
    // xu li thoi gian tro choi------------
    
    function timer(){
        sec+=1;
        if(sec==60)
            {
                min+=1;
                sec=0;
            }
        if(min==60){
            hour+=1;
            min=0;
        }
        $(".time").html(hour+" : "+min+" : "+sec);
    }    
    
    // mo cau goi y cua chuong trinh
    $(".foreknowledge").click(function(){
        alert(known[count]);
    });
    
    $(".share_score").click(function(){
        if(check_sh==0)
        {
          check_sh=1;
          $(".complete").remove();
          $.ajax({
            url: "//www.appnhe.com/data/fb/dhbc/connect_sql.php?user_id="+user_id+" &score="+count,
            success: function(res){
                rank=res;
                upload();
            }
            });
        }
    });
    
    //chia se cho ban be
    $(".call_friend").click(function(){
        if(check_sh==0)
        {
            check_sh=1;
            $(".complete").remove();
            $.ajax({
                    url: "//www.appnhe.com/data/fb/dhbc/makeImg.php?id="+count
                    +"&callfriend="+callFriend,
                    success: function(res){
                        friendLink="http://www.appnhe.com/data/fb/dhbc/images/personage/"+res;
                        $(".content_picture").append("<div id='massage'><img class='picture' src='//www.appnhe.com/data/fb/dhbc/images/icon/comment.png'/>  <textarea id='share_question' rows='2' cols='20' class='share_content'></textarea> <span id='submit'>Submit</span><span id='cancle'>Cancel</span></div>");                        
                        $("#submit").click(function(){
                                message=$("#share_question").val();
                                if(message==""){
                                    $("#share_question").focus();
                                }
                                else
                                {
                                    $("#submit,#cancle").remove();
                                    $("#share_question").remove();
                                    $("#massage").append("<img class='loading' src='//www.appnhe.com/data/fb/dhbc/images/icon/loading.gif'/>")
                                    FB.api(
                                        "/me/photos",
                                        "POST",
                                        {
                                                message: message,
                                                url: friendLink
                                        },
                                        function (response) {
                                          if (response && !response.error) {
                                            $("#massage").remove();
                                            check_sh=0;
                                            $(".content_picture").append("<a class='complete' href='//www.facebook.com/"+response.id+"' target='_blank'>Thành công, Click để xem</a>");
                                            $(".complete").click(function(){
                                                $(".complete").remove();
                                            });
                                          }
                                          else{
                                            alert("Chia sẽ thất bại! vui lòng thử lại!");
                                          }
                                        }
                                    );
                                }
                    });
                    
                    $("#cancle").click(function(){
                        $("#massage").remove();
                        check_sh=0;
                    });
                }
            });
        }
    });
    
    function upload()
    {
        clearInterval(inter);
         $(".content_picture").append("<div id='massage1'><img class='picture' src='//www.appnhe.com/data/fb/dhbc/images/icon/chiase.png'/><textarea id='share_score' rows='2' cols='20' class='share_content'></textarea><span id='submit1'>Submit</span><span id='cancle1'>Cancel</span></div>")
            $("#submit1").click(function(){
            message=$("#share_score").val();
            if(message==""){
                $("#share_score").focus();
            }
            else
            {
                $("#submit1").remove();
                $("#cancle1").remove();
                $("#share_score").remove();
                $("#massage1").append("<img class='loading' src='//www.appnhe.com/data/fb/dhbc/images/icon/loading.gif'/>")
                $.ajax({
                    url: "//www.appnhe.com/data/fb/dhbc/createImg.php?name="+user_name+"&score="+count+"&rank="+rank,
                    success: function(res){
                            FB.api(
                                "/me/photos",
                                "POST",
                                {
                                        "message": message +" https://www.appnhe.com/game/161",
                                        "url": "http://www.appnhe.com/data/fb/dhbc/images/pic/"+res
                                },
                                function (response) {
                                  if (response && !response.error) {
                                    clearScreen();
                                    $(".content_picture").append("<a class='complete' href='//www.facebook.com/"+response.id+"' target='_blank'>Thành công, Click để xem</a>");
                                    $(".complete").click(function(){
                                        $(".complete").remove();
                                    });
                                  }
                                  else{alert("Chia sẽ thất bại! vui lòng thử lại!");}
                                }
                            );
                    }
                });
            }
        });
        $("#cancle1").click(function(){
            $("#massage1").remove();
            check_sh=0;
            inter=setInterval(timer, 1000);
        });
    }
    
    function clearScreen()
    {
        $(".answer").val("");
        $("#massage1").remove();
        check_sh=0;
    }
    
    function Create_user()
    {
        FB.api('/me', {fields:'id,name'}, function(response) {
          user_name=response.name;
          user_id=response.id;
            $.ajax({
                url: "//www.appnhe.com/data/fb/dhbc/create.php?user_id="+user_id+"&user_name="+user_name,
                success:function(res){
                    count=parseInt(res.split(',')[1]);
                    start_game();
                }
            }).done(function(){
                $(".mark").html(count);
            });
        });
    }
    
    $(".list").click(function(){
        $.ajax({
            url: "//www.appnhe.com/data/fb/dhbc/list.php?",
            success:function(res){
                $(".dhbc").append(res);
                $(".top").slideToggle();
                $(".top").click(function(){
                    $(".top").remove();
                });
            }
        });
    });
});

$(window).load(function(){
    $(".dhbc_loading").css('display','none');
});