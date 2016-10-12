<?php header('Access-Control-Allow-Origin: *'); date_default_timezone_set('UTC');?>
<?php
    session_start(); 
    include('../../temp/mysql_connect.php');
    
    $user_id = $_GET['user_id'];
    $_SESSION['score']+=1;
    $_SESSION['answer']+=1;
    $score =$_SESSION['score'];
    $answer =$_SESSION['answer'];
    if($score>=300)$score=300;
    if($answer>=300)$answer=300;

    $query = "UPDATE dhbc SET score=$score,date=NOW(),answer=$answer WHERE user_id='$user_id'";
    mysql_query($query);
?>