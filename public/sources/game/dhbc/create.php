<?php header('Access-Control-Allow-Origin: *'); date_default_timezone_set('UTC');?>
<?php
    session_start();
    include('../../temp/mysql_connect.php');
    
    $user_id = $_GET['user_id'];
    $user_name = $_GET['user_name'];
    
    $query = "SELECT COUNT(id),score,answer FROM dhbc WHERE user_id='$user_id'";
    $result = mysql_query($query);
    if($result){
        while($row = mysql_fetch_array($result)){

            if($row['COUNT(id)']!=0) 
            {
                $score=$row['score'];
                $answer=$row['answer'];
                $_SESSION['score']=$score;
                $_SESSION['answer']=$answer;
                echo($score.",".$answer); 
            }
            else
            {
                $query = "INSERT INTO dhbc(user_name,user_id,score,date,answer) VALUES ('$user_name','$user_id',0,NOW(),0)";
                mysql_query($query);
                $_SESSION['score']=0;
                $_SESSION['answer']=0;
                echo("0,0");
            }
        }
    }

?>