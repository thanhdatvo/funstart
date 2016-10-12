<?php session_start(); ?>
<?php
    include('SimpleImage.php');
    $user_id =time();  

        $id=$_GET['id'];
        $callfriend=$_GET['callfriend'];
        
        $mang=explode(",",$callfriend);
   
    $image_name = "images/background/nen.jpg";
    $image=imagecreatefromjpeg($image_name);
    
    //chèn ảnh cau hoi
    
    $im_name = 'images/test/'.$id.'.jpg';
    $im_name = imagecreatefromjpeg($im_name);
    imagecopy($image, $im_name, 157, 88, 0, 0, imagesx($im_name), imagesy($im_name));
    
    $im_name = 'images/icon/start.png';
    $im_name = imagecreatefrompng($im_name);
    imagecopy($image, $im_name, 20, 370, 0, 0, imagesx($im_name), imagesy($im_name));
    
        $im_name = 'images/skill/foreknowledge.png';
    $im_name = imagecreatefrompng($im_name);
    imagecopy($image, $im_name, 25, 170, 0, 0, imagesx($im_name), imagesy($im_name));
    
        $im_name = 'images/skill/share.png';
    $im_name = imagecreatefrompng($im_name);
    imagecopy($image, $im_name, 25, 270, 0, 0, imagesx($im_name), imagesy($im_name));
    
    $left_q=(500-(count($mang)-1)*31)/2;
    for($i=0;$i<count($mang)-1;$i++)
    {
        $im_name = 'images/icon/ochu.png';
        $im_name = imagecreatefrompng($im_name);
        imagecopy($image, $im_name, $left_q+105+$i*30, 426, 0, 0, imagesx($im_name), imagesy($im_name));
    }
    
    
    //chèn text
    $black = imagecolorallocate($image,0,0,0);
    
        
    $strNameFont='font/ARIAL.TTF';
    for($i=0;$i<count($mang)-1;$i++)
    {
            imagettftext($image, 14, 0, $left_q+110+$i*30, 445, $black, $strNameFont,$mang[$i]);
    }
    imagettftext($image, 20, 0, 40, 42, $black, $strNameFont,"Guide");
    imagettftext($image, 16, 0, 560, 42, $black, $strNameFont,"0");
    imagettftext($image, 16, 0, 660, 42, $black, $strNameFont,"0:0:0");
    
    imagejpeg($image, "images/personage/$user_id.jpg",100);
    imagedestroy($image);
    echo "$user_id.jpg";
?>