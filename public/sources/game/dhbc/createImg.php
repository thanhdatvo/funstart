<?php session_start(); ?>
<?php
    include('SimpleImage.php');
    if(isset($_SESSION['user_id'])) $user_id = $_SESSION['user_id'].time(); else $user_id = "images".time();  

    $user_name = $_GET['name'];
    $score = $_GET['score'];
    $rank = $_GET['rank'];
   
    $image_name = "images/icon/victory.jpg";
    $image=imagecreatefromjpeg($image_name);
    //chèn ảnh rank - vị trí: left: 10px - right: 10px;

    
    //chèn text
    $color_white=imagecolorallocate($image,255,255,255); // tạo màu sắc r - g -b
    $color_blue = imagecolorallocate($image,51,187,85);
    $color_red = imagecolorallocate($image,255,0,0);
    $AliceBlue = imagecolorallocate($image,240,248,255);
    $Aqua = imagecolorallocate($image,250,235,215);
    $Bisque = imagecolorallocate($image,255,228,196);
    $Blue = imagecolorallocate($image,0,0,255);
    $Brown = imagecolorallocate($image,165,42,42);
    $BlueViolet = imagecolorallocate($image,138,43,226);
    $Chartreuse = imagecolorallocate($image,127,255,0);
    $Chocolate = imagecolorallocate($image,210,105,30);
    $Cornsilk = imagecolorallocate($image,100,149,237);
    $Green = imagecolorallocate($image,0,128,0);
    $Navy = imagecolorallocate($image,0,0,128);
    
    $array_color = array();
    $array_color[0] = $color_white;
    $array_color[1] = $color_red;
    $array_color[2] = $AliceBlue;
    $array_color[3] = $Aqua;
    $array_color[4] = $Bisque;
    $array_color[5] = $Blue;
    $array_color[6] = $Brown;
    $array_color[7] = $BlueViolet;
    $array_color[8] = $Chartreuse;
    $array_color[9] = $Chocolate;
    $array_color[10] = $Cornsilk;
    $array_color[11] = $Green;
    $array_color[12] = $Navy;
        
    $strNameFont='font/ARIAL.TTF';
    
        imagettftext($image, 12, 0, 210, 90, $array_color[1], $strNameFont, $user_name);
        imagettftext($image, 14, 0, 200, 125, $array_color[11], $strNameFont, $score); 
        imagettftext($image, 14, 0, 190, 162, $array_color[11], $strNameFont, $rank); 
    
    /*header('Content-type: image/png');
    imagepng($image,"image01.png");*/
    imagejpeg($image, "images/pic/$user_id.jpg",100);
    imagedestroy($image);
    
    echo "$user_id.jpg";
?>