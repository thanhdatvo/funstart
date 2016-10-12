<?php header('Access-Control-Allow-Origin: *'); date_default_timezone_set('UTC');?>
<link rel="stylesheet" type="text/css" href="//www.appnhe.com/data/fb/dhbc/index.css"/>
<?php
    include('../../temp/mysql_connect.php');
    $rs="";
    $query = "SELECT * FROM dhbc ORDER BY answer DESC LIMIT 10 ";
    $result = mysql_query($query);
    if($result){
        while($row = mysql_fetch_array($result)){
                $score=$row['answer'];
                $user_id=$row['user_id'];
                $user_name=$row['user_name'];
                $rs.="<div class='row'><img class='top_img' src='http://graph.facebook.com/".$user_id."/picture'/><div class='top_name'>".$user_name."</div><div class='top_score'>".$score."</div></div>";
        }
        $rs="<div class='top' style='background: rgba(0,0,0,0.6);'><div class='top_view'><div class='top_header'>Tuần</div>".$rs."</div></div>";
        echo($rs);
    }

?>

