<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="//www.appnhe.com/js/jquery.min.js"></script>
<link rel="stylesheet" href="//www.appnhe.com/data/temp/css/chung.css"/>
<style type="text/css">
    .total{
        width: 750px;
        text-align: center;
        position: relative;
    }
    .help{
        background-color: rgba(0, 0, 0, 0.55);
color: #FFF;
padding: 1px;
    }
    .partResult{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        display: none;
    }
    .sv_box {
width: 100%;
padding: 10px 0;
border-bottom: 1px solid #CCC;
}
.sv_tite{
display: inline-block;
vertical-align: middle;
font-weight: bold;
width: 100px;
text-align: right;
margin-right: 10px;
        }
        .chart{
            display: inline-block;
            vertical-align: middle;
            position: relative;
            width: 350px;
            
        }
        .ch_child{
            width: 0%;
            height: 35px;
            background-color: #3b5;            
        }
            .ch_hide_child{
                width: 0%;
background-color: #fff;
position: absolute;
top: -2px;
right: -2px;
font-size: 20px;
font-weight: bold;
padding-top: 7px;
bottom: -2px;
text-align: right;
color: #333;
            }
        .c_red{
            background-color: red;
        }
        .c_yellow{
            background-color: yellow;                    
        }
</style>
<script>
    var answer=new Array;
    var countQues = 1;
    ar_noti = ['Bạn đang có mức IQ thấp, hãy rèn luyện thêm',
        'Bạn đang có mức IQ trung bình, tiếp tục cố gắn nhé',
        'Bạn đang có mức IQ cao, rất tuyệt rồi những hay tiếp tục rèn luyện nhé',
        'Bạn đang có mức IQ của vĩ nhân, tỷ người có một',
        ]
    var ar_data = ["Võ Tắc Thiên","Tào Thào","Triệu Tử Long","Maria Ozawa", "Obama", "BinlaDen", "PuTin", "Albert Einstein", "Pythagoras","Acsimet","Victor Hugo",'Bicasso',"Napoleon Bonaparte"];
    $(window).ready(function(){
        load_ques(countQues)
        $.ajax({
              dataType: "json",
              url: "//www.appnhe.com/data/fb/dovui/test.json",
              success: function(res){
                for(var i in res)
                answer.push([i, res [i]]);                
              }
        })
        $(".btAns").click(function(){
            b = $('.inAns').val();
            if(b === answer[countQues-1][1]){
                countQues++;
                load_ques(countQues)
            }else{
                alert('sai');
                $('.inAns').focus();
            }
        })
        function load_ques(a){
            $(".showQuesNow").html(a);
            $('.inAns').val('').focus();
            $(".imgQues").attr('src','//www.appnhe.com/data/fb/dovui/images/result/'+a+'.jpg');
            $(".getUrlImg").attr('href','//www.appnhe.com/r/iq.php?id='+a);
        }
        
        $(".viewIQ").click(function(){
            ques = countQues;
            if(ques < 15){
                alert('Bạn phải trả lời ít nhất 15 câu hỏi để xem kết quả');
            }else{
                $(".partResult").css('display','block');
                index = 0;
                if(ques > 15 && ques < 35){
                    score = get_rand(80,50);
                    index = 0;
                }else if(ques > 35 && ques < 85){
                    score = get_rand(135,80);
                    index = 1;
                }else if(ques > 85 && ques < 110){
                    score = get_rand(160,135);
                    index = 2;
                }else{
                    score = get_rand(200,160);
                    index = 3;
                }
                $(".title_01").html('Mức IQ trung bình');
                animate_chart(".c_red",100);
                                        
                $(".title_02").html('IQ của bạn');
                animate_chart(".c_yellow",score);
                
                $(".showResult").html(ar_noti[index]);
                $(".rs_ques").html(ques);
                var x = Math.floor((Math.random() * ar_data.length));
                $(".res_result").html(ar_data[x]);
            }            
        });
        $(".btNext").click(function(){
            $(".partResult").css('display','none');
        })
        function get_rand(a,b){ // a max - b min
            return Math.floor(Math.random() * (a - b)) + b;
        }        
        function animate_chart(a,b){
                c = 140 - b;
                $(a).next().css('width',c+"%");
                $(a).animate({'width':'100%'},4000,function(res){
                    $(a).next().html(b);
                });                
            }
    })
</script>
<div class="total">
    <h1>Thử Thách IQ - Câu số <span class="showQuesNow"></span></h1>
    <img class="imgQues" src="" />
    <div class="partUser">
        
    </div>
    <p>
        <input type="text" class="input inAns" placeholder="Nhập câu trả lời" /> 
        <button class="button buttonYlk btAns">Trả lời</button>
    </p>
    <div class="help">
        <h3>Các sự cứu trợ</h3>
        <button class="button buttonYlk viewIQ">Xem IQ của bạn</button>        
        <button class="button btShare">Hỏi ý kiến bạn bè</button>
        <a href="#" class="getUrlImg" target="_blank"><button class="button btLink">Lấy Link câu hỏi</button></a>
    </div>
    <div class="partResult">
        <h1>Bạn trả lời được <span class="rs_ques"></span> câu hỏi</h1>
        <div class="cv_container">
            <div class="sv_box">
                <div class="sv_tite title_01"></div>
                <div class="chart">
                    <div class="ch_child c_red"></div>
                    <div class="ch_hide_child"></div>
                </div>
            </div>
            <div class="sv_box">
                <div class="sv_tite title_02"></div>
                <div class="chart">
                    <div class="ch_child c_yellow"></div>
                    <div class="ch_hide_child"></div>
                </div>
            </div>
            <p class="showResult"></p>
            <h1>Vĩ nhân giống bạn "<span class="res_result"></span>"</h1>
        </div>
        <button class="button buttonYlk shareFb">Khoe lên Facebook</button>
        <button class="button btNext">Chơi tiếp</button>
    </div>
</div>