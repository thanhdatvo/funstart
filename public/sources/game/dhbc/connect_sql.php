<?php header('Access-Control-Allow-Origin: *'); date_default_timezone_set('UTC');?>
<?php
    session_start(); 
    include('../../temp/mysql_connect.php');
    $user_id = $_GET['user_id'];
    $score =$_GET['score'];
    
    $date_range = 7;
    $date_start=date_create();
    date_add($date_start,date_interval_create_from_date_string("-".$date_range." days"));
    $date_start = date_format($date_start,"Y-m-d");
    
    $query = "SELECT COUNT(id) FROM dhbc WHERE answer >= $score AND date > '$date_start'";
    $result = mysql_query($query);
    if($result){
        while($row = mysql_fetch_array($result)){
            echo $row['COUNT(id)'];
        }
        //echo($cn);
    }
?>