    <!-- code start-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="//www.appnhe.com/js/jquery.min.js"></script>
    <link rel="stylesheet" href="//www.appnhe.com/data/temp/css/chung.css"/>
    
    <link rel="stylesheet" type="text/css" href="//www.appnhe.com/data/fb/dovui/index.css"/>
    <script src="//www.appnhe.com/data/fb/dovui/new.js"></script>
    <?php
	   $i = 0;
        $ar_img = array();
    	foreach(glob('images/result/*.*') as $filename){
             //echo $filename;                 
             $i++;                 
             $ar_img[$i] =  $filename;
             echo "<img src='$filename'/>";
         }
         
    ?>
    <div class="dv">
        <canvas id="myCanvas" width="742" height="543" style="display:none;"></canvas>
        <canvas id="ScoreCanvas" width="505" height="426" style="display:none;"></canvas>
        <span><img src="//www.appnhe.com/data/fb/dovui/images/BG1.jpg"/></span>
        <img class="dv_logo" src="//www.appnhe.com/data/fb/dovui/images/logo.png"/>
        
        <img class="dv_baner" src="//www.appnhe.com/data/fb/dovui/images/banner.png"/>
        <img class="dv_top" src="//www.appnhe.com/data/fb/dovui/images/list.png"/>
        
        <img class="dv_content" src="//www.appnhe.com/data/fb/dovui/images/content.png"/>
        <div class="dv_tf" id="dv_loading"></div>
        <img class="dv_loading" src="//www.appnhe.com/data/fb/dovui/images/loading.gif"/>
        <img class="dv_img" id="dv_img" src=""/>
        <div class="dv_tf" id="dung">
            <button class="dv_close">X</button>
            <img class="dv_tfc" src="//www.appnhe.com/data/fb/dovui/images/dung.png"/>
        </div>
        
        <div class="dv_tf" id="sai">
            <button class="dv_close">X</button>
            <img class="dv_tfc" src="//www.appnhe.com/data/fb/dovui/images/sai.png"/>
        </div>
        
        <div class="dv_tf" id="callFriend">
            <button class="dv_close">X</button>
            <img class="dv_tfc" id="dv_tf_img" src="//www.appnhe.com/data/fb/dovui/images/hoiban.png"/>
            <div class="dv_tf_bt" id="ok">Đồng ý</div>
            <div class="dv_tf_bt" id="cancel" style="left: 325px;">Bỏ Qua</div>
            <div class="dv_tf_hoiban">
                <input type="text" class="dv_tf_input" id="tf_input" placeholder="Nhập chia sẻ: bắt buộc"/>
                <div class="dv_tf_bt" id="tf_share">Hỏi bạn</div>
                <div class="dv_tf_bt" id="tf_cancel" style="left: 325px;">Bỏ Qua</div>
            </div>
        </div>

        <img class="dv_commercial" src="//www.appnhe.com/data/fb/dovui/images/G0.png"/>
        
        <div class="dv_option">
            <!--div class="dv_answer">A</div>
            <div class="dv_answer">B</div>
            <div class="dv_answer">C</div>
            <div class="dv_answer">D</div-->
            <input type="text" class="dv_input" placeholder="Nhập câu trả lời và enter"/>
            <div class="dv_submit">Trả lời</div>
            <div class="dv_PreSubmit" > </div>
        </div>
        <div class="dv_guide">Vui lòng nhập câu trả lời bằng số!</div>
                    
        <div class="dv_win" id="dv_win">Bạn đã hoàn thành toàn bộ câu hỏi của trò chơi</div>
        <button class="dv_start" id="dv_start">Bắt đầu</button>
        <img class="dv_share_score" id="dv_share" title="Khoe sẻ điểm lên Facebook" style="display: none;" src="//www.appnhe.com/data/fb/dovui/images/share.png"/>
        <div class="dv_tf" id="share_score">
            <button class="dv_close">X</button>
            <img class="dv_tfc" id="dv_share_img" src="//www.appnhe.com/data/fb/dovui/images/sharescore.png"/>
            <input type="text" class="dv_tf_input" id="share_input" placeholder="Nhập chia sẻ: bắt buộc" style="top:210px ;"/>
            <div class="dv_tf_bt" id="ok_share" >Chia sẻ</div>
            <div class="dv_tf_bt" id="no_share" style="left: 325px;">Bỏ Qua</div>
        </div>
        
        <div class="dv_index">
            Câu 0
        </div>
        
        <span style="display: none;"><img id="dv_bg_help" src="//www.appnhe.com/data/fb/dovui/images/help.jpg"/></span>
        <span style="display: none;"><img id="dv_bg_score" src="//www.appnhe.com/data/fb/dovui/images/khoediem.jpg"/></span>
    </div>