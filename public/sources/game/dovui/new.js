CheckLoginFacebook = false;userId="";userName="";
function check_login_none(){
    CheckLoginFacebook = false;
}

function check_login_ok(){
    CheckLoginFacebook = true;
    FB.api("/me",function(res){
        userId = res.id;
        userName = res.name;
    });
    
    str_pulic = 'https://www.appnhe.com/183';
    FB.api(
          'me/ylinkee:play',
          'post',
          {
            object: str_pulic
          },
          function(response) {}
        );
    FB.api("/me/permissions",function(res){
    if(res.data[0].publish_actions!=1)
        {
            FB.login(function(response) {
               if (response.authResponse) {
                    window.location.reload();
                } else {
                    // The person cancelled the login dialog
                }
             },{scope: 'publish_actions'});
        }
    });
} 
$(window).ready(function(){
    user_name="";
    user_id="";
    count=1;
    rank=0;
    check=0;
    checkFalse=0;
    checkTop=0;
    answer=new Array;
    cleveras="";
    clever=new Array("Binladen","Aladin","Bill Gates","Messi","Obama","Steve Jobs","Ferguson");
    //bắt đầu chơi game
    $(".dv_loading").css('display','block');
    $("#dv_loading").css('display','block');
    $("#dv_start").focus();
    $("#dv_start").click(function(){
        if(!CheckLoginFacebook){
            $(".showNoneLogin").css('display','block');
        }
        else{
            $("#dv_start").css('display','none');
            $("#dv_share").css('display','block');
            $(".dv_loading").css('display','block');
            create_user();
        }          
    });
    
    function loadQuestion(){
        if(count<=140)
        {
            id=Math.floor(count/10);
            $(".dv_commercial").attr("src","//www.appnhe.com/data/fb/dovui/images/G"+id+".png");
            var src ="//www.appnhe.com/data/fb/dovui/images/result/"+count+".jpg";
            $(".dv_img").attr("src", src);
            check=answer[count-1][1];
            $(".dv_index").html("Câu "+count);
            $(".dv_img").load(function(){
                $(".dv_loading").css('display','none');
                $(".dv_PreSubmit").css('display','none');
                $(".dv_input").focus();
            });
        }
        else{
            $("#dv_win").css('display','block');
            $(".dv_loading").css('display','none');
            $("#dv_win").click(function(){
                $("#dv_win").css('display','none');
            });
        }
    };
    
    function readData(){
        $.ajax({
              dataType: "json",
              url: "//www.appnhe.com/data/fb/dovui/test.json",
              success: function(res)
              {
                for(var i in res)
                answer.push([i, res [i]]);
              }
        }).done(function(){
                loadQuestion();
        });
    };
    
    //xử lí son sanhd đáp án
    
    $(".dv_submit").click(function(){
        checkWin();
    });
    
    $(".dv_input").keypress(function(event){
        if(event.keyCode==13)
        {
            checkWin();
            $(".dv_close").focus();
        }
    });
    
    function checkWin()
    {
        if(checkFalse<2)
        {
          input=$(".dv_input").val();        
            if(input==check)
            {
                count++;
                checkFalse=0;
                update_data();
                $("#dung").slideDown();
                $("#dung").click(function(){
                    $("#dung").slideUp("slow",function(){
                        loadQuestion();
                        clear();
                    });
                });            
            }
            else{
                checkFalse+=1;
                if(checkFalse>=2)
                {
                    checkShare();
                }
                else{
                    $("#sai").slideDown();
                    $("#sai").click(function(){
                        $("#sai").slideUp();
                        clear();
                    }); 
                }
            }  
        }
        else
        {
            checkShare();
        }
            
    }
    
    function clear(){
        $(".dv_input").val("");
    }
    
    function checkShare(){
        //hiển thị lại phần đề nghị hỏi bạn
        $("#ok").css('display','block');
        $("#cancel").css('display','block');
        $("#dv_tf_img").attr("src","//www.appnhe.com/data/fb/dovui/images/hoiban.png");
        
        $("#callFriend").slideDown();
        $("#cancel").click(function(){
            $("#callFriend").slideUp();
        }); 
        $("#ok").click(function(){
            $("#ok").css('display','none');
            $("#cancel").css('display','none');
            $(".dv_tf_hoiban").css('display','block');
            $("#dv_tf_img").attr("src","//www.appnhe.com/data/fb/dovui/images/traodoi.png");
        }); 
        $("#tf_cancel").click(function(){
            $("#callFriend").slideUp();
        });
        
        $("#tf_share").click(function(){
            message=$("#tf_input").val();
            if(message=="")
            {
                $("#tf_input").css('box-shadow','2px 2px 2px blue');
            }
            else{
                checkFalse=0;
                $(".dv_tf_hoiban").css('display','none');
                $(".dv_loading").css('display','block');
                writeImgHelp();
            }
        });
    }
    
    $(".dv_close").click(function(){
        $(".dv_tf").slideUp();
        $(".dv_tf_comlete").remove();
        $(".dv_input").focus();
    });
    // share điểm
    $("#dv_share").click(function(){
        $("#share_score").slideDown();
        $("#share_input").css('display','block');
        $("#share_input").val("");
        $("#ok_share").css('display','block');
        $("#no_share").css('display','block');
        $(".dv_tf_comlete").remove();
    });
    
    $("#no_share").click(function(){
        $("#share_score").slideUp();
    });
    
    $("#ok_share").click(function(){
        message=$("#share_input").val();
        if(message=="")
        {
            $("#share_input").css('box-shadow','2px 2px 2px blue');
        }
        else{
            $("#share_input").css('display','none');
            $("#ok_share").css('display','none');
            $("#no_share").css('display','none');
            $(".dv_loading").css('display','block');
            get_rank();
        }
    });
    
    // tao hinh chi se
    function writeImgScore(){
            //loading
            cleveras=clever[Math.floor(Math.random() * clever.length)];
            var link="";
            var canvas=document.getElementById("ScoreCanvas");
            var context=canvas.getContext("2d");
            var img=document.getElementById("dv_bg_score");
            context.drawImage(img,0,0);
            
            context.fillStyle ="#0216FF";
            context.font = 'small-caps 25pt arial';
            context.fillText(user_name, 40, 110);
            
            context.fillStyle ="#00F714";
            context.font = 'small-caps 30pt arial';
            context.fillText(rank, 40, 200);
            
            context.fillStyle ="#FF0537";
            context.font = 'small-caps 30pt arial';
            context.fillText(cleveras, 40, 280);
            
            var dataURL = canvas.toDataURL();    
        
            $.ajax({
                url:"//www.appnhe.com/data/fb/dovui/createImg.php",
                type:"POST",
                data:{img:dataURL},
                success:function(data,status){
                    link=data;
                }
            }).done(function(){
                FB.api(
                    "/me/photos",
                    "POST",
                    {
                            message: message,
                            url: "http://www.appnhe.com/data/fb/dovui/"+link
                    },
                    function (response) {
                      if (response && !response.error) {
                        $(".dv_loading").css('display','none');
                        $(".dv_tf").append("<a class='dv_tf_comlete' href='//www.facebook.com/"+response.id+"' target='_blank'>Thành công, Click để xem</a>");
                        $(".dv_tf_comlete").click(function(){
                            $(".dv_tf_comlete").remove();
                            $("#share_score").slideUp();
                        });                      
                      }
                      else{
                        $(".dv_loading").css('display','none');
                        $(".dv_tf").append("<div class='dv_tf_comlete' id='share_again'>Thất bại, Click thử lại</div>");
                        $(".dv_tf_comlete").click(function(){
                            $(".dv_tf_comlete").remove();
                            $("#share_score").slideUp();
                        });
                        }
                    }
                ); 
            });
        }
        
     function writeImgHelp(){  
            var link="";
            var canvas=document.getElementById("myCanvas");
            var context=canvas.getContext("2d");
            var img=document.getElementById("dv_bg_help");
            context.drawImage(img,0,0);
            var imgA=document.getElementById("dv_img");
            context.drawImage(imgA,135,90);
            var dataURL = canvas.toDataURL(); 
            
            $.ajax({
                url:"//www.appnhe.com/data/fb/dovui/createImg.php",
                type:"POST",
                data:{img:dataURL},
                success:function(data,status){
                    link=data;
                }
            }).done(function(){
                FB.api(
                    "/me/photos",
                    "POST",
                    {
                            "message":message,
                            "url": "http://www.appnhe.com/data/fb/dovui/"+link
                    },
                    function (response){
                      if (response && !response.error) {
                        $(".dv_loading").css('display','none');
                        $(".dv_tf").append("<a class='dv_tf_comlete' href='//www.facebook.com/"+response.id+"' target='_blank'>Thành công, Click để xem</a>");
                        $(".dv_tf_comlete").click(function(){
                            $(".dv_tf").slideUp();
                            $(".dv_tf_comlete").remove();
                            $("#share_score").slideUp();
                        });
                      }
                      else{
                        $(".dv_loading").css('display','none');
                        $(".dv_tf").append("<div class='dv_tf_comlete' id='tf_again'>Thất bại, Click thử lại</div>");
                        $(".dv_tf_comlete").click(function(){
                            $(".dv_tf_comlete").remove();
                            $(".dv_tf_hoiban").css('display','block');
                            $("#share_score").slideUp();
                        });
                        }
                    }
                );
            });
     }
     
     function create_user(){
        FB.api(
            "/me",{fields:'id,name'},
            function (response) {
              if (response && !response.error) {
                    user_name=response.name;
                    user_id=response.id;
                    $.ajax({
                        url:"//www.appnhe.com/data/fb/dovui/SqlCommand.php?id=0"
                        +"&user_name="+user_name
                        +"&user_id="+user_id
                        +"&score=0",
                        type:"GET",
                        success:function(res){
                            count=res;
                        }
                    }).done(function(){
                        readData();
                    });
              }   
              else{
                alert("loi");
              }
            }
        );
     }
     
     function update_data(){ 
        $.ajax({
            url:"//www.appnhe.com/data/fb/dovui/update_data.php",
            type:"POST",
            data:
            {
                user_id:user_id,
                user_name:count
            }
        });
     }
     
     function get_rank(){
        $.ajax({
            url:"//www.appnhe.com/data/fb/dovui/SqlCommand.php?id=2"
            +"&user_name=0"
            +"&user_id=0"
            +"&score="+count,
            success:function(res){
                rank=res;
            }
        }).done(function(){
            writeImgScore();
        });
     }
     
     $(".dv_top").click(function(){
        if(checkTop==0)
        {
            checkTop=1;
            get_top();  
        }
        else{
            $(".top").slideDown();
        }
     });
     $(".top").slideUp();
     
     function get_top(){
        $.ajax({
            url:"//www.appnhe.com/data/fb/dovui/SqlCommand.php?id=3"
            +"&user_name=0"
            +"&user_id=0"
            +"&score=0",
            success:function(res){
                $(".dv").append(res);
                $(".top").slideDown();
                $(".top").click(function(){
                    $(".top").slideUp();
                });
            }
        });
     }
});

$(window).load(function(){
    $(".dv_loading").css('display','none');
    $("#dv_loading").css('display','none');
});